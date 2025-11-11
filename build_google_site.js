#!/usr/bin/env node
/**
 * Build script for Google Site single-file HTML
 *
 * This script:
 * 1. Reads docs/index.html (source of truth)
 * 2. Inlines CSS from docs/css/style.css
 * 3. Inlines JavaScript from docs/js/script.js
 * 4. Rewrites image paths to GitHub Pages absolute URLs
 * 5. Outputs html/google-site.html
 */

const fs = require('fs');

const GITHUB_PAGES_BASE_URL = 'https://turtle756.github.io/STU-Notice';

function readFile(path) {
  return fs.readFileSync(path, 'utf8');
}

function writeFile(path, content) {
  fs.writeFileSync(path, content, 'utf8');
}

function main() {
  console.log('🔨 Building google-site.html...');
  
  let html = readFile('docs/index.html');
  const css = readFile('docs/css/style.css');
  const js = readFile('docs/js/script.js');
  
  console.log('  ✓ Read source files');
  
  const cssLinkPattern = /<link rel="stylesheet" href="css\/style\.css" \/>/;
  if (!cssLinkPattern.test(html)) {
    console.error('❌ ERROR: Could not find <link rel="stylesheet" href="css/style.css" /> in docs/index.html');
    process.exit(1);
  }
  
  html = html.replace(cssLinkPattern, `<style>\n${css}\n    </style>`);
  console.log('  ✓ Inlined CSS');
  
  const jsScriptPattern = /<script src="js\/script\.js"><\/script>/;
  if (!jsScriptPattern.test(html)) {
    console.error('❌ ERROR: Could not find <script src="js/script.js"></script> in docs/index.html');
    process.exit(1);
  }
  
  html = html.replace(jsScriptPattern, `<script>\n${js}\n    </script>`);
  console.log('  ✓ Inlined JavaScript');
  
  html = html.replace(
    /src="images\/([^"]+)"/g,
    `src="${GITHUB_PAGES_BASE_URL}/images/$1"`
  );
  console.log(`  ✓ Rewrote image paths to ${GITHUB_PAGES_BASE_URL}/images/`);
  
  writeFile('html/google-site.html', html);
  console.log('✅ Successfully built html/google-site.html');
  console.log('\n📋 Usage: Copy this file and paste into Google Sites HTML embed');
}

main();
