#!/bin/bash
# 설명자료.md → 설명자료.pdf (Aside 브라우저로 인쇄). 페이지 미리보기는 /tmp/cl-pdf/p*.png
set -e
T=$(cd "$(dirname "$0")" && pwd); D="$T/../docs"; W=/tmp/cl-pdf; mkdir -p $W
node "$T/print-html.js"
(cd "$D" && python3 -m http.server 8766 --bind 127.0.0.1 >/dev/null 2>&1 &) ; sleep 1
aside repl "const p = await openTab('http://127.0.0.1:8766/print.html'); await sleep(3000); const b = await p.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true }); console.log('PDF:' + Buffer.from(b).toString('base64'));" > $W/out.txt 2>&1 || true
pkill -f "http.server 8766" || true
/usr/bin/grep -a '^PDF:' $W/out.txt | cut -d: -f2 | base64 -d > "$D/설명자료.pdf"
rm -f $W/p*.png; echo "pages: $(swift "$T/render.swift" "$D/설명자료.pdf" $W)"
