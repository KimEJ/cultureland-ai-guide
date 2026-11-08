const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const dir = require('path').join(__dirname, '../prototype');
const html = fs.readFileSync(dir + '/index.html', 'utf8')
  .replace('<script src="data.js"></script>', '<script>' + fs.readFileSync(dir + '/data.js', 'utf8') + '</script>')
  .replace('var DELAY = 450;', 'var DELAY = 0;');
const errors = []; const vc = new VirtualConsole(); vc.on('jsdomError', e => errors.push(e.message));
const w = new JSDOM(html, { runScripts: 'dangerously', virtualConsole: vc }).window, d = w.document;
const last = () => [...d.querySelectorAll('.msg:not(.me) .bub')].pop().textContent;
const lastEl = () => [...d.querySelectorAll('.msg:not(.me) .bub')].pop();
const ok = (c, m) => { if (!c) throw new Error('FAIL: ' + m); console.log('✓', m); };
const clickIn = (el, sel, has) => { const b = [...el.querySelectorAll(sel)].find(e => e.textContent.includes(has)); if (!b) throw new Error('missing ' + has); b.click(); };

ok(last().includes('컬쳐캐쉬 AI 안내'), 'welcome message');
clickIn(lastEl(), '.chip', 'CGV에서 쓸 수 있어?'); ok(last().includes('3가지') && last().includes('확인일'), 'CGV answer 3 methods + source');
const cgv = lastEl();
clickIn([...cgv.querySelectorAll('.card')].find(c => c.textContent.includes('쇼핑몰 바로사용')), 'button', '순서 보기');
ok(last().includes('충전 필요') && last().includes("'컬쳐랜드 컬쳐캐쉬' 선택") && last().includes('안심금고 정책 변경'), 'method: needs charge + steps + safe notice');
clickIn(lastEl(), '.btn', '충전하기'); ok(last().includes('공식 순서') && last().includes('대기 컬쳐캐쉬'), 'inline charge card');
const ch = lastEl(); clickIn(ch, '.amounts button', '30,000'); clickIn(ch, '.btn', '충전하기');
ok(d.getElementById('bal').textContent === '30,000원', 'balance strip updated');
(async () => { await new Promise(r => setTimeout(r, 120));
ok(last().includes('결제 가능') && last().includes('바로사용 바로가기'), 'auto-resumed method after charge');
clickIn(lastEl(), '.btn', '바로가기'); ok(d.getElementById('toast').textContent.includes('시연'), 'final CTA');
clickIn(cgv, '.chip', '매장에서도 돼?'); ok(last().includes('매장에서 쓸 수 있어요'), 'follow-up uses context');
w.ask('올리브영 매장에서 돼?'); ok(last().includes('매장 바코드 결제 목록에는 없어요'), 'oliveyoung offline notice');
w.ask('편의점에서 쓰려면?'); ok(lastEl().querySelectorAll('.chip').length === 4, 'convenience list 4');
clickIn(lastEl(), '.chip', 'GS25'); ok(last().includes('GS25') && last().includes('바코드'), 'list -> merchant');
w.ask('넥슨'); ok(last().includes('찾지 못했어요') && last().includes('1577-2111'), 'not found');
w.ask('잔액 얼마야?'); ok(last().includes('30,000원'), 'balance intent');
w.ask('<img src=x onerror=alert(1)>'); ok(!d.querySelector('#chat img'), 'escaped input');
w.ask('네이버페이로 전환하고 싶어'); clickIn(lastEl(), 'button', '순서 보기'); ok(last().includes('명의자'), 'convert guide');

ok(d.querySelectorAll('.rail .news').length === 5, 'welcome news rail (4 + 전체보기)');
clickIn(d.querySelector('.rail'), '.news', '안심금고'); ok(last().includes('11월 23일') && last().includes('안심금고 [찾기] 선택'), 'rail -> safe notice detail');
w.ask('네이버웹툰'); ok(last().includes('관련 소식') && last().includes('네이버웹툰 서비스 오픈'), 'merchant + related notice');
clickIn(lastEl(), '.chip', '자세히'); ok(last().includes('요약 미확인') && last().includes('NoteID=2383') === false, 'title-only notice detail');
ok(lastEl().innerHTML.includes('NoteID=2383'), 'notice link present');
w.ask('충전하는 방법 알려줘'); ok(last().includes('지류상품권 충전 서비스 종료'), 'charge + paper notice');
w.ask('공지 뭐 있어?'); ok(lastEl().querySelectorAll('.news').length === 7, 'notice list');
w.ask('지류상품권 충전돼?'); ok(last().includes('2026.02.06') && last().includes('1577-3111'), 'paper notice detail');
ok(errors.length === 0, 'no JS errors ' + errors.join(';'));
})().catch(e => { console.error(e.message); process.exit(1); });
