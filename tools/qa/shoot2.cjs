const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const [w,h,views]=[+process.argv[2],+process.argv[3],process.argv[4].split(',')];
const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
for(const v of views){await p.goto('http://localhost:4173/#'+v);await p.waitForTimeout(1500);
const H=await p.evaluate(()=>document.body.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60);}
await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(500);await p.screenshot({path:`../w-${w}-${v}.png`,fullPage:true});}
console.log(errs);await b.close()})();
