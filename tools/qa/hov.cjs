const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,h,t] of [[1366,900,'d'],[390,844,'m']]){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto('http://localhost:4173/');await p.waitForTimeout(2200);
const bags=await p.$$('.hero__counter .bag');await bags[3].hover({force:true});await p.waitForTimeout(600);
const c=await p.$('.hero__counter');await c.screenshot({path:`shots/hov-${t}.png`});}
await b.close()})();
