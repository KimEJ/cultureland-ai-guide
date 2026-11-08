// docs/설명자료.md → docs/print.html (인쇄용). make-pdf.sh 에서 호출
const fs = require('fs'), path = require('path');
const { marked } = require('marked');
const docs = path.join(__dirname, '../docs');
let body = marked.parse(fs.readFileSync(path.join(docs, '설명자료.md'), 'utf8'));
body = body.split(/(?=<h2)/).map((s, i) => i === 0 ? `<header class="cover">${s}</header>` : `<section>${s}</section>`).join('\n');
fs.writeFileSync(path.join(docs, 'print.html'),
  `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>컬쳐캐쉬 AI 안내 - 설명 자료</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css">
<style>${fs.readFileSync(path.join(__dirname, 'print.css'), 'utf8')}</style></head><body>${body}</body></html>`);
