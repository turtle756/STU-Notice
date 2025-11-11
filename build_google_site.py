#!/usr/bin/env python3
"""
Build script for Google Site single-file HTML

This script:
1. Reads docs/index.html (source of truth)
2. Inlines CSS from docs/css/style.css
3. Inlines JavaScript from docs/js/script.js
4. Rewrites image paths to GitHub Pages absolute URLs
5. Outputs html/google-site.html
"""

import re

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    print("🔨 Building google-site.html...")
    
    html = read_file('docs/index.html')
    css = read_file('docs/css/style.css')
    js = read_file('docs/js/script.js')
    
    print("  ✓ Read source files")
    
    html = re.sub(
        r'<link rel="stylesheet" href="css/style\.css" />',
        f'<style>\n{css}\n    </style>',
        html
    )
    print("  ✓ Inlined CSS")
    
    html = re.sub(
        r'<script src="js/script\.js"></script>',
        f'<script>\n{js}\n    </script>',
        html
    )
    print("  ✓ Inlined JavaScript")
    
    html = re.sub(
        r'src="images/([^"]+)"',
        r'src="https://turtle756.github.io/STU-Notice/images/\1"',
        html
    )
    print("  ✓ Rewrote image paths to GitHub Pages URLs")
    
    write_file('html/google-site.html', html)
    print("✅ Successfully built html/google-site.html")
    print("\n📋 Usage: Copy this file and paste into Google Sites HTML embed")

if __name__ == '__main__':
    main()
