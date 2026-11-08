// 공식 정보 기반 데이터 (확인일 2026-11-08). 출처: research/merchants.md, research/usage_methods.md
// 실제 제휴 정보 = 이 파일. 가상 시연 데이터(잔액·충전)는 index.html 의 DEMO 객체에만 있음.
var CHECKED = '2026-11-08';

var SOURCES = {
  S1: { title: '컬쳐랜드 상품권 사용처', url: 'https://m.cultureland.co.kr/vchr/culturevoucherUse.do' },
  MOBILE: { title: '컬쳐랜드상품권(모바일문화상품권) 안내', url: 'https://www.cultureland.co.kr/voucher/mobile.do' },
  CASH: { title: '컬쳐캐쉬 사용 방법', url: 'https://www.cultureland.co.kr/usecash/getCashHow.do' },
  FAQ: { title: '고객센터 FAQ', url: 'https://www.cultureland.co.kr/customer/customerMain.do' },
  CONV: { title: '캐쉬 전환', url: 'https://m.cultureland.co.kr/convs/convsMain.do' },
  CPN: { title: '컬쳐랜드 쿠폰 메뉴', url: 'https://m.cultureland.co.kr/cpn/cpnMain.do' }
};

// 공식 카테고리 5종 (S1 기재 명칭 그대로)
var CATEGORIES = {
  direct: {
    name: '쇼핑몰 바로사용', channel: '온라인', needsCash: true,
    summary: '제휴 쇼핑몰 결제창에서 컬쳐캐쉬로 결제',
    steps: [
      '컬쳐랜드 앱 메인화면에서 [바로사용] 메뉴 클릭',
      '쇼핑몰 선택: {m}',
      '[컬쳐캐쉬 사용하기] 클릭',
      '{m} 결제창에서 \'컬쳐랜드 컬쳐캐쉬\' 선택',
      '컬쳐랜드 계정으로 로그인',
      '컬쳐캐쉬 사용 후 결제'
    ],
    notes: ['지금은 안심금고에 보관 중인 금액이 아닌 \'사용 가능\' 컬쳐캐쉬만 결제에 쓸 수 있어요.'],
    notice: 'safe',
    unverified: ['결제 수수료', '1회·일 결제 한도'],
    sources: ['S1', 'CASH']
  },
  barcode: {
    name: '오프라인 바코드 결제', channel: '오프라인', needsCash: false,
    summary: '매장에서 컬쳐랜드상품권 바코드(MMS) 제시',
    steps: [
      '컬쳐랜드상품권(모바일문화상품권) 잔액과 결제 가능 사용처 확인',
      '{m} 매장 계산대에서 상품권(MMS/바코드)을 제시하여 결제'
    ],
    notes: ['잔액 관리형 상품권이라 남은 금액은 이후에도 자유롭게 사용할 수 있어요.'],
    unverified: ['앱 컬쳐캐쉬 바코드 결제의 세부 절차', '매장별 제외 품목', '결제 한도'],
    sources: ['S1', 'MOBILE']
  },
  coupon: {
    name: '모바일 쿠폰 구매', channel: '온라인 (모바일 쿠폰)', needsCash: false,
    summary: '{m} 모바일 쿠폰을 구매해 사용',
    steps: [
      '컬쳐랜드 앱 메인화면에서 [쿠폰] 메뉴 클릭',
      '{m} 쿠폰에서 구매할 권종 선택',
      '수신번호 및 결제수단 선택',
      '수신자 정보 확인',
      '구매 완료'
    ],
    notes: [],
    unverified: ['수수료', '구매 한도'],
    sources: ['S1']
  },
  gplay: {
    name: '구글플레이 기프트 코드 구매', channel: '온라인', needsCash: false,
    summary: '컬쳐랜드에서 구글플레이 기프트 코드 구매',
    steps: [
      '안드로이드 앱 / 모바일웹에서 [구글플레이 기프트코드] 메뉴 클릭',
      '구매할 권종 선택',
      '수신번호 및 결제수단 선택',
      '수신자 정보 확인',
      '구매 완료'
    ],
    notes: [],
    unverified: ['수수료', '구매 한도'],
    sources: ['S1']
  },
  convert: {
    name: '포인트 전환', channel: '온라인', needsCash: true,
    summary: '컬쳐캐쉬를 {m}(으)로 전환',
    steps: [
      '컬쳐랜드 앱 메인화면에서 [캐쉬 전환] 메뉴 클릭',
      '전환 제휴사 선택: {m}',
      '최초 1회 정보제공 동의',
      '전환 금액 입력',
      '전환 완료'
    ],
    notice: 'safe',
    notes: [
      '휴대폰 본인인증 회원만 이용 가능해요.',
      '제휴사 아이디와 컬쳐랜드 아이디의 명의자가 같아야 해요.',
      '정보제공에 동의하지 않으면 전환할 수 없어요.'
    ],
    unverified: ['전환 수수료', '일·월 전환 한도'],
    sources: ['S1', 'CASH', 'CONV']
  }
};

// [표시명, 별칭, 카테고리 키워드, 이용 방식]
var MERCHANTS = [
  ['CGV', ['씨지브이'], ['영화'], ['direct', 'coupon', 'barcode']],
  ['롯데시네마', [], ['영화'], ['direct', 'barcode']],
  ['메가박스', [], ['영화'], ['direct', 'barcode']],
  ['교보문고', ['교보'], ['서점'], ['direct', 'barcode']],
  ['알라딘', [], ['서점'], ['direct', 'barcode']],
  ['YES24', ['예스24'], ['서점'], ['direct']],
  ['RIDI', ['리디'], ['서점'], ['direct']],
  ['핫트랙스', [], ['서점'], ['barcode']],
  ['아트박스', [], ['쇼핑'], ['barcode']],
  ['번개장터', [], ['쇼핑'], ['direct']],
  ['다이소', [], ['쇼핑'], ['direct']],
  ['GS SHOP', ['지에스샵'], ['쇼핑'], ['direct']],
  ['롯데홈쇼핑', [], ['쇼핑'], ['direct']],
  ['CU', ['씨유'], ['편의점'], ['barcode']],
  ['GS25', ['지에스25'], ['편의점'], ['barcode']],
  ['세븐일레븐', ['7-eleven', '7eleven', '세븐'], ['편의점'], ['barcode']],
  ['emart24', ['이마트24'], ['편의점'], ['barcode']],
  ['스타벅스', ['스벅', 'starbucks'], ['카페'], ['coupon']],
  ['올리브영', ['oliveyoung'], ['쇼핑'], ['coupon']],
  ['신세계백화점', [], ['쇼핑'], ['coupon']],
  ['롯데백화점', [], ['쇼핑'], ['coupon']],
  ['SOOP', ['숲'], ['게임'], ['coupon']],
  ['PlayStation Store', ['플레이스테이션', 'ps스토어', 'psstore', 'gta'], ['게임'], ['coupon'], 'gta'],
  ['네이버웹툰', ['웹툰'], ['OTT'], ['coupon'], 'webtoon', ['CPN']],
  ['디즈니+', ['디즈니플러스', '디즈니'], ['OTT'], ['coupon']],
  ['한게임', [], ['게임'], ['coupon']],
  ['이마티콘', [], ['쇼핑'], ['coupon']],
  ['CJ', ['씨제이'], ['쇼핑'], ['coupon']],
  ['구글플레이', ['구글', 'google', 'googleplay', '플레이스토어'], ['게임', '포인트'], ['gplay', 'convert']],
  ['네이버페이', ['네이버', 'npay', 'naverpay'], ['포인트'], ['convert']],
  ['쿠팡캐시', ['쿠팡', 'coupang'], ['포인트'], ['convert']],
  ['PAYCO 포인트', ['페이코', 'payco'], ['포인트'], ['convert']],
  ['SSG페이', ['ssg', '쓱'], ['포인트'], ['convert']],
  ['스마일머니', ['스마일페이'], ['포인트'], ['convert']],
  ['해피포인트', [], ['포인트'], ['convert']],
  ['SK페이', [], ['포인트'], ['convert']],
  ['L.POINT', ['l포인트', '엘포인트'], ['포인트'], ['convert']],
  ['H.Point', ['h포인트', '에이치포인트'], ['포인트'], ['convert']],
  ['11pay 포인트', ['11pay', '11페이', '11번가'], ['포인트'], ['convert']]
].map(function (r) { return { name: r[0], aliases: r[1], tags: r[2], cats: r[3], notice: r[4], src: r[5] || ['S1'] }; });

// 자연어 → 카테고리 키워드
var TAG_WORDS = {
  '편의점': ['편의점'], '영화': ['영화', '극장', '영화관'], '서점': ['서점', '책', '도서'],
  '카페': ['카페', '커피'], '게임': ['게임'], '포인트': ['포인트', '페이 전환', '전환'], 'OTT': ['ott']
};
var OFFLINE_WORDS = ['매장', '오프라인', '가게', '현장', '바코드'];
var ONLINE_WORDS = ['온라인', '인터넷', '예매', '사이트'];

function norm(s) { return String(s).toLowerCase().replace(/\s+/g, ''); }

// 반환: { merchants: [...], intent: 'offline'|'online'|null, matchedBy: 'name'|'tag'|null }
function search(query) {
  var q = norm(query);
  var intent = OFFLINE_WORDS.some(function (w) { return q.indexOf(w) >= 0; }) ? 'offline'
    : ONLINE_WORDS.some(function (w) { return q.indexOf(w) >= 0; }) ? 'online' : null;
  if (!q) return { merchants: [], intent: intent, matchedBy: null };

  // 일치한 가장 긴 별칭을 기록하고, 다른 일치에 포함되는 짧은 일치는 제외 (예: '네이버웹툰' ⊃ '네이버')
  var hits = MERCHANTS.map(function (m) {
    var k = [m.name].concat(m.aliases).map(norm).filter(function (a) { return q.indexOf(a) >= 0; })
      .sort(function (x, y) { return y.length - x.length; })[0];
    return { m: m, k: k };
  }).filter(function (h) { return h.k; });
  var byName = hits.filter(function (h) {
    return !hits.some(function (o) { return o !== h && o.k.length > h.k.length && o.k.indexOf(h.k) >= 0; });
  }).map(function (h) { return h.m; });
  if (byName.length) return { merchants: byName, intent: intent, matchedBy: 'name' };

  var tags = Object.keys(TAG_WORDS).filter(function (t) {
    return TAG_WORDS[t].some(function (w) { return q.indexOf(norm(w)) >= 0; });
  });
  var byTag = MERCHANTS.filter(function (m) { return m.tags.some(function (t) { return tags.indexOf(t) >= 0; }); });
  if (intent === 'offline') byTag = byTag.filter(function (m) { return m.cats.indexOf('barcode') >= 0; });
  return { merchants: byTag, intent: intent, matchedBy: byTag.length ? 'tag' : null };
}

// 공지·서비스 소개 (m.cultureland.co.kr 공지사항/홈, 확인일 2026-11-08). body 없는 항목은 제목만 확인(본문 이미지)
var NB = 'https://m.cultureland.co.kr/tgl/noticeBoard.do?NoteID=';
var NOTICES = [
  { id: 'safe', kind: '중요 공지', date: '2026-11-05', title: '안심금고 정책 변경 안내', url: NB + '2387',
    lead: '11월 23일(월)부터 모든 회원의 컬쳐캐쉬가 안심금고에 보관되고, 본인 확인 후 찾아서 사용해요.',
    steps: ['컬쳐랜드 로그인 › 마이페이지 이동', '안심금고 [찾기] 선택', '본인 확인 완료 후 사용할 금액 찾기', '결제 진행'],
    body: ['안심금고 해지는 11월 23일부터 불가해요.', '외부 가맹점 결제창에서 결제가 안 되면 마이페이지에서 안심금고 컬쳐캐쉬를 먼저 찾은 뒤 다시 결제해 주세요.',
      '컬쳐랜드 앱에서는 본인 확인 절차 없이 빠르게 찾을 수 있어요.', '보유 금액과 이용 내역은 그대로 유지돼요.',
      '이메일·외국인·재외국민 인증 회원은 11월 23일 전에 최신 회원인증을 완료해 주세요.'],
    words: ['안심금고', '보관중', '본인확인'] },
  { id: 'paper', kind: '중요 공지', date: '2026-01-09', title: '지류상품권 충전 서비스 종료 안내', url: NB + '2350',
    lead: '(주)문화상품권 제휴 종료로 온라인문화상품권·지류상품권 충전이 종료됐어요.',
    body: ['온라인문화상품권: 2025.08.11 충전 종료', '지류상품권(2022.12.31 이전 발행 포함): 2026.02.05까지 충전, 2026.02.06 종료',
      '(주)한국문화진흥 발행 컬쳐랜드상품권은 계속 충전할 수 있어요.', '문화상품권 사용처 문의: (주)문화상품권 고객센터 1577-3111'],
    words: ['지류', '종이', '온라인문화상품권', '문화상품권충전', '문화상품권도', '문화상품권으로'] },
  { id: 'webtoon', kind: '서비스 오픈', date: '2026-10-27', title: '네이버웹툰 서비스 오픈 안내', url: NB + '2383', words: [] },
  { id: 'gta', kind: '새 상품', date: '2026-10-30', title: 'PS Store 기프트카드 GTA6 권종 판매', url: NB + '2385', words: [] },
  { id: 'refund', kind: '서비스 오픈', date: '', title: '환불 서비스 모바일 OPEN!', url: 'https://m.cultureland.co.kr/cstm/refundInfo.do', words: ['환불'] },
  { id: 'expire', kind: '중요 공지', date: '2025-10-31', title: '컬쳐캐쉬 소멸 시행 안내', url: NB + '2336', words: ['소멸', '유효기간'] },
  { id: 'member', kind: '공지', date: '2026-11-05', title: '회원유형 통합 안내', url: NB + '2388', words: ['회원유형'] }
];
function noticeById(id) { return NOTICES.filter(function (n) { return n.id === id; })[0]; }

// 대화 의도 분류 (규칙 기반 시뮬레이션 — LLM 미사용). last = 직전 대화의 사용처명 (후속 질문용)
function classify(query, last) {
  var r = search(query), q = norm(query);
  var hit = NOTICES.filter(function (n) {
    if (n.id === 'paper' && /모바일문화|컬쳐랜드상품권/.test(q)) return false; // 컬쳐랜드상품권(=모바일문화상품권)은 충전 가능
    return n.words.some(function (w) { return q.indexOf(norm(w)) >= 0; });
  })[0];
  if (hit) return { type: 'notice', id: hit.id };
  if (/공지|소식|새로운|뉴스|이벤트/.test(q)) return { type: 'notices' };
  if (r.merchants.length) return { type: 'search', r: r };
  if (/충전/.test(q)) return { type: 'charge' };
  if (/잔액|얼마|남은/.test(q)) return { type: 'balance' };
  if (last && r.intent) return { type: 'search', r: { merchants: MERCHANTS.filter(function (m) { return m.name === last; }), intent: r.intent, matchedBy: 'context' } };
  if (r.intent === 'offline') return { type: 'search', r: { merchants: MERCHANTS.filter(function (m) { return m.cats.indexOf('barcode') >= 0; }), intent: 'offline', matchedBy: 'tag' } };
  return { type: 'none', r: r };
}

if (typeof module === 'object') module.exports = { search: search, classify: classify, MERCHANTS: MERCHANTS, CATEGORIES: CATEGORIES, NOTICES: NOTICES };
