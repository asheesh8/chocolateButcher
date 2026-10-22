const {chromium}=require('playwright');
const v=['home','shop','shop-chop-shop','rough-cuts','truffles','board','holiday','gifting','reviews','visit','story','faq','checkout','near-you','near-burlington','near-boston','cut-belgian-54-dark-chocolate','cut-dark-mint-truffles','nope'];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const errs=[];
for(const w of [390,820,1024,1280,1440]){const p=await b.newPage({viewport:{width:w,height:900}});p.on('pageerror',e=>errs.push(w+' '+e.message));
const out=[];for(const x of v){await p.goto('http://localhost:4173/#'+x);await p.waitForTimeout(250);const [sw,h,h1]=await p.evaluate(()=>[document.documentElement.scrollWidth,document.body.scrollHeight,document.querySelector('h1')?.textContent?.slice(0,30)]);out.push(`${x}:${h}${sw>w?' OVERFLOW '+sw:''}${h1?'':' NOH1'}`);}
console.log(w,out.join(' | '));}
console.log('errors',errs);await b.close()})();
