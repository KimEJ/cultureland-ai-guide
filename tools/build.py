import json
durs = json.load(open("durs.json"))
HELPERS = r"""
window.__sleep=ms=>new Promise(r=>setTimeout(r,ms));
(function(){const c=document.createElement('div');c.id='__cur';c.style.cssText='position:fixed;z-index:9999;width:28px;height:28px;border-radius:50%;background:rgba(48,48,48,.35);border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.3);pointer-events:none;transition:left .55s ease,top .55s ease,transform .15s,opacity .3s;left:720px;top:700px;transform:translate(-50%,-50%);opacity:0';document.body.appendChild(c);})();
window.__move=async el=>{el.scrollIntoView({block:'center',behavior:'smooth'});await __sleep(550);const r=el.getBoundingClientRect();const c=__cur;c.style.opacity=1;c.style.left=(r.left+r.width/2)+'px';c.style.top=(r.top+r.height/2)+'px';await __sleep(700);};
window.__tap=async el=>{await __move(el);__cur.style.transform='translate(-50%,-50%) scale(.7)';await __sleep(170);__cur.style.transform='translate(-50%,-50%)';el.click();};
window.__lastBot=()=>[...document.querySelectorAll('.msg:not(.me) .bub')].pop();
window.__find=(scope,sel,txt)=>[...scope.querySelectorAll(sel)].find(e=>e.textContent.includes(txt));
window.__type=async t=>{const i=document.getElementById('q');await __move(i);i.focus();for(const ch of t){i.value+=ch;await __sleep(110);}await __sleep(400);await __tap(document.querySelector('form.composer button'));};
window.__chat=()=>document.getElementById('chat');
""".strip()

P1 = "ask('CGV에서 쓸 수 있어?')"
P2 = P1 + "; showMethod('CGV','direct'); ask('충전하는 방법 알려줘'); pickAmt(__find(__lastBot(),'.amounts button','30,000'),30000)"
P3 = P2 + "; doCharge(); await __sleep(200)"
P4 = P3 + "; ask('매장에서도 돼?')"
P5 = P4 + "; ask('올리브영 매장에서 돼?'); ask('넥슨')"
P6 = P5 + "; openNotice('safe')"
S = [
 ("", "", "await __sleep(800);"),
 ("", "", "await __move(__find(document,'.chip','CGV에서')); await __sleep(1500); await __move(__find(document,'.rail .news','안심금고')); await __sleep(1800); await __move(__find(document,'.menu button','충전')); await __sleep(1200);"),
 ("", "", "await __type('CGV에서 쓸 수 있어?'); await __sleep(3500); await __move(__find(__lastBot(),'.badge','공식')); await __sleep(2500); await __move(__lastBot().querySelector('.src')); await __sleep(800);"),
 (P1, "__lastBot().querySelector('.src').scrollIntoView({block:'center'})",
  "const card=__find(__lastBot(),'.card','쇼핑몰 바로사용'); await __tap(__find(card,'button','순서 보기')); await __sleep(2200); __chat().scrollTop+=0; await __move(__find(__lastBot(),'.bal','컬쳐캐쉬')); await __sleep(3500); await __tap(__find(__lastBot(),'.btn','충전하기')); await __sleep(2600); await __move(__lastBot().querySelector('.steps')); await __sleep(2500); await __tap(__find(__lastBot(),'.amounts button','30,000')); await __sleep(1500);"),
 (P2, "__find(__lastBot(),'.btn','충전하기').scrollIntoView({block:'center'})",
  "await __tap(__find(__lastBot(),'.btn','충전하기')); await __sleep(3200); await __move(__find(__lastBot(),'.bal','컬쳐캐쉬')); await __sleep(2000); await __move(__find(__lastBot(),'.btn','바로가기')); await __sleep(1500); await __move(__lastBot().querySelector('.news.rel')); await __sleep(2500); await __tap(__find(__lastBot(),'.btn','바로가기')); await __sleep(1500);"),
 (P3, "__chat().scrollTop=__chat().scrollHeight",
  "await __type('매장에서도 돼?'); await __sleep(3500);"),
 (P4, "__chat().scrollTop=__chat().scrollHeight",
  "await __type('올리브영 매장에서 돼?'); await __sleep(3800); await __type('넥슨'); await __sleep(3200);"),
 (P5, "__chat().scrollTop=__chat().scrollHeight",
  "__chat().scrollTop=0; await __sleep(1200); await __tap(__find(document,'.rail .news','안심금고')); await __sleep(3500);"),
 (P6, "", "__chat().scrollTop=0; await __sleep(1500);"),
]
TPL = open("tpl.js").read()
for i, (prep, post, act) in enumerate(S, 1):
    mn = int((durs[i-1] + 1.4) * 1000)
    js = TPL.replace("%HELPERS%", json.dumps(HELPERS)).replace("%PREP%", json.dumps("(async()=>{DELAY=0;" + prep + "; window.__prepped=true;})(); 0")) \
            .replace("%POST%", json.dumps(post or "0")).replace("%ACT%", json.dumps("(async()=>{" + act + " window.__done=true;})(); 0")).replace("%MIN%", str(mn))
    open(f"scene{i}.js", "w").write(js)
print("ok", len(S))
