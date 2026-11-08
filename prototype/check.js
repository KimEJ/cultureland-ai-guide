// node check.js — 검색 로직 자가 점검
const assert = require('assert');
const { search } = require('./data.js');
const names = q => search(q).merchants.map(m => m.name);
assert.deepStrictEqual(names('CGV에서 쓸 수 있어?'), ['CGV']);
assert.deepStrictEqual(names('씨지브이'), ['CGV']);
assert.strictEqual(search('CGV 매장에서 바코드 돼?').intent, 'offline');
assert.deepStrictEqual(names('편의점에서 쓰려면?'), ['CU', 'GS25', '세븐일레븐', 'emart24']);
assert.deepStrictEqual(names('올리브영 매장에서 돼?'), ['올리브영']);
assert.deepStrictEqual(names('네이버페이로 전환'), ['네이버페이']);
assert.deepStrictEqual(names('넥슨'), []);
assert.deepStrictEqual(names('GS SHOP'), ['GS SHOP']);
assert.ok(names('영화 보러 가는데 매장에서').every(n => ['CGV', '롯데시네마', '메가박스'].includes(n)));
console.log('ok');
// 대화 의도 분류
const { classify } = require('./data.js');
assert.strictEqual(classify('충전하는 방법 알려줘').type, 'charge');
assert.strictEqual(classify('잔액 얼마야?').type, 'balance');
assert.strictEqual(classify('넥슨').type, 'none');
const f = classify('매장에서도 돼?', 'CGV');
assert.deepStrictEqual([f.type, f.r.merchants[0].name, f.r.intent], ['search', 'CGV', 'offline']);
assert.strictEqual(classify('매장 바코드 결제 어디서 돼?').r.merchants.length, 11);
console.log('ok classify');
// 공지 연동 + 최장 일치
assert.deepStrictEqual(names('네이버웹툰 어떻게 써?'), ['네이버웹툰']);
assert.deepStrictEqual(names('네이버페이로 전환'), ['네이버페이']);
assert.strictEqual(classify('안심금고가 뭐야').id, 'safe');
assert.strictEqual(classify('지류상품권 충전돼?').id, 'paper');
assert.strictEqual(classify('모바일문화상품권 충전').type, 'charge');
assert.strictEqual(classify('공지 뭐 있어?').type, 'notices');
assert.strictEqual(classify('환불하고 싶어').id, 'refund');
console.log('ok notices');
