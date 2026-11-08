#!/bin/bash
# 배포된 시제품을 Aside로 장면별 녹화 + TTS 내레이션 → docs/demo.mp4 (약 5분 소요)
set -e
T=$(cd "$(dirname "$0")" && pwd); W=$(mktemp -d); cp "$T"/{narr.py,build.py,tpl.js,assemble.py} "$W"; cd "$W"
python3 narr.py && python3 build.py
for i in 1 2 3 4 5 6 7 8 9; do aside repl "$(cat scene$i.js)" > scene$i.txt 2>&1; echo "scene$i frames=$(/usr/bin/grep -ac '^F:' scene$i.txt)"; done
python3 assemble.py "$T/../docs/demo.mp4"; echo "work dir: $W"
