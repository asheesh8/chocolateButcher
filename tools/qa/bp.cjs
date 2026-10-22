const {chromium}=require('playwright');
const views=process.argv[2].split(',');const widths=process.argv[3].split(',').map(Number);const full=process.argv[4]==='full';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const errs=[];
for(const w of widths){const h=w<500?844:w<1100?1100:900;const p=await b.newPage({viewport:{width:w,height:h},reducedMotion:'reduce'});p.on('pageerror',e=>errs.push(e.message));
for(const v of views){await p.goto('http://localhost:4173/#'+v);await p.waitForTimeout(500);
if(full)await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}scrollTo(0,0);});
await p.waitForTimeout(300);await p.screenshot({path:`shots/bp-${w}-${v}.png`,fullPage:full});
const r=await p.evaluate(()=>[document.documentElement.scrollWidth,document.body.scrollHeight]);console.log(w,v,r.join(' '));}}
console.log('errors',errs);await b.close()})();
