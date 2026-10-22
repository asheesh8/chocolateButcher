const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const base='http://localhost:4173/';const errs=[];
const p=await b.newPage({viewport:{width:1366,height:900}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
await p.goto(base);await p.waitForTimeout(2200);await p.screenshot({path:'../s-home.png',fullPage:true});
for(const v of (process.argv[2]||'').split(',').filter(Boolean)){await p.goto(base+'#'+v);await p.waitForTimeout(900);await p.screenshot({path:`../s-${v}.png`,fullPage:true});}
const m=await b.newPage({viewport:{width:390,height:844}});
for(const v of ['home','shop','board','cut-dark-mint-truffles','gifts','visit','story','faq']){await m.goto(base+'#'+v);await m.waitForTimeout(700);const w=await m.evaluate(()=>document.documentElement.scrollWidth);if(w>390)console.log('overflow',v,w);}
await m.goto(base);await m.waitForTimeout(2000);await m.screenshot({path:'../s-mob.png',fullPage:false});
console.log('errors',errs);await b.close()})();
