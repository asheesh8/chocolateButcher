const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const errs=[];
for(const [w,h,tag] of [[1366,900,'d'],[390,844,'m']]){const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:4173/#visit');await p.waitForTimeout(1500);
const el=await p.$('.seasons');await el.scrollIntoViewIfNeeded();await p.waitForTimeout(800);
await el.screenshot({path:`../sea-${tag}-1.png`});await p.waitForTimeout(3600);await el.screenshot({path:`../sea-${tag}-2.png`});
const sw=await p.evaluate(()=>document.documentElement.scrollWidth);console.log(tag,'scrollWidth',sw);}
console.log('errors',errs);await b.close()})();
