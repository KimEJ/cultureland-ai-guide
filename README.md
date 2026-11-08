# 컬쳐캐쉬 AI 안내 — 시제품

Y-AI 메이커톤 2026 컬쳐랜드 사전 미션: 사용처 확인 → 상품권 사용 안내를 하나의 대화 흐름으로 연결.

- 데모: https://kimej.github.io/cultureland-ai-guide/
- `prototype/` — 클릭형 시제품 (정적 HTML, 외부 라이브러리 없음)
  - `data.js` — 공식 사용처·이용 순서·공지 데이터 (출처 URL, 확인일 2026-11-08)
  - `check.js` — 검색/의도 분류 점검: `node prototype/check.js`
- `research/` — 공식 출처 조사 노트

AI 응답은 공식 데이터 기반 규칙 응답(시뮬레이션)이며 LLM을 호출하지 않습니다.
잔액·충전 금액·상품권 번호는 시연용 가상 데이터입니다.
