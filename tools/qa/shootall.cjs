const {chromium}=require('playwright');
const views=(process.argv[2]||'home,rough-cuts,truffles,board,holiday,gifting,reviews,visit,story,near-burlington,shop').split(',');
const sizes=(process.argv[3]||'d,m').split(',');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const errs=[];
for(const s of sizes){const [w,h]=s==='d'?[1366,900]:[390,844];
const p=await b.newPage({viewport:{width:w,height:h},reducedMotion:'reduce'});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
for(const v of views){await p.goto('http://localhost:4173/#'+v);await p.waitForTimeout(600);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);});await p.waitForTimeout(500);
await p.screenshot({path:`shots/${s}-${v}.png`,fullPage:true});
const sw=await p.evaluate(()=>document.documentElement.scrollWidth);if(sw>w)console.log('overflow',s,v,sw);}}
console.log('errors',errs);await b.close()})();
