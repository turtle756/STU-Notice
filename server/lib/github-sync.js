const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_REPO = process.env.GITHUB_REPO || 'turtle756/STU-Notice';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

function isEnabled() {
  return !!GITHUB_TOKEN;
}

function githubRequest(method, apiPath, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: apiPath,
      method,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'STU-Notice',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          if (res.statusCode >= 400) {
            reject(new Error(`GitHub API ${res.statusCode}: ${parsed.message || data}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function gitBlobSha(content) {
  const header = `blob ${content.length}\0`;
  const store = Buffer.concat([Buffer.from(header), content]);
  return crypto.createHash('sha1').update(store).digest('hex');
}

// Sync edit files from liveEditDir to GitHub (docs/edit/)
async function syncToGithub(liveEditDir) {
  if (!isEnabled()) return null;

  const [owner, repo] = GITHUB_REPO.split('/');
  const branch = GITHUB_BRANCH;

  const ref = await githubRequest('GET', `/repos/${owner}/${repo}/git/ref/heads/${branch}`);
  const latestCommitSha = ref.object.sha;
  const latestCommit = await githubRequest('GET', `/repos/${owner}/${repo}/git/commits/${latestCommitSha}`);
  const baseTreeSha = latestCommit.tree.sha;

  // Get existing tree to compare SHAs
  const existingTree = await githubRequest('GET', `/repos/${owner}/${repo}/git/trees/${baseTreeSha}?recursive=1`);
  const existingShas = {};
  for (const item of existingTree.tree) {
    if (item.type === 'blob') existingShas[item.path] = item.sha;
  }

  // Collect edit files
  const editFiles = fs.readdirSync(liveEditDir).filter(f => f.endsWith('.js'));
  const treeItems = [];

  for (const file of editFiles) {
    const content = fs.readFileSync(path.join(liveEditDir, file));
    const localSha = gitBlobSha(content);
    const ghPath = `docs/edit/${file}`;

    if (existingShas[ghPath] === localSha) continue; // unchanged

    const blob = await githubRequest('POST', `/repos/${owner}/${repo}/git/blobs`, {
      content: content.toString('base64'),
      encoding: 'base64',
    });
    treeItems.push({ path: ghPath, mode: '100644', type: 'blob', sha: blob.sha });
  }

  if (treeItems.length === 0) return { filessynced: 0 };

  const newTree = await githubRequest('POST', `/repos/${owner}/${repo}/git/trees`, {
    base_tree: baseTreeSha,
    tree: treeItems,
  });

  const newCommit = await githubRequest('POST', `/repos/${owner}/${repo}/git/commits`, {
    message: `[관리자] 콘텐츠 업데이트 - ${new Date().toLocaleString('ko-KR')}`,
    tree: newTree.sha,
    parents: [latestCommitSha],
  });

  await githubRequest('PATCH', `/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    sha: newCommit.sha,
  });

  return { filessynced: treeItems.length, commitSha: newCommit.sha };
}

module.exports = { syncToGithub, isEnabled };
