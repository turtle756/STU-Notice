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
  
  // Inline CSS
  html = html.replace(
    /<link rel="stylesheet" href="css\/style\.css" \/>/,
    `<style>\n${css}\n    </style>`
  );
  console.log('  ✓ Inlined CSS');
  
  // Inline JavaScript
  html = html.replace(
    /<script src="js\/script\.js"><\/script>/,
    `<script>\n${js}\n    </script>`
  );
  console.log('  ✓ Inlined JavaScript');
  
  // Rewrite image paths to GitHub Pages absolute URLs
  html = html.replace(
    /src="images\/([^"]+)"/g,
    'src="https://turtle756.github.io/STU-Notice/images/$1"'
  );
  console.log('  ✓ Rewrote image paths to GitHub Pages URLs');
  
  // Write output
  writeFile('html/google-site.html', html);
  console.log('✅ Successfully built html/google-site.html');
  console.log('\n📋 Usage: Copy this file and paste into Google Sites HTML embed');
}

main();
