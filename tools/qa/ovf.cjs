const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const errs=[];
const p=await b.newPage({viewport:{width:360,height:780}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const v=['home','shop','rough-cuts','chop-shop','truffles','board','gifts','visit','story','faq','checkout','near-you','near-williston','near-south-burlington','near-burlington','near-essex','near-colchester','near-shelburne','near-winooski','near-jericho-underhill','near-richmond','near-hinesburg','near-boston','near-nowhere','cut-belgian-54-dark-chocolate','cut-milk-chocolate-roughly-chopped','cut-xyz','garbage'];
for(const x of v){await p.goto('http://localhost:4173/#'+x);await p.waitForTimeout(350);const r=await p.evaluate(()=>{const w=document.documentElement.clientWidth;const bad=[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>w+1&&getComputedStyle(e).position!=='absolute').slice(0,2).map(e=>e.className);return [document.title,bad]});if(r[1].length)console.log(x,r);else console.log(x,'ok',r[0]);}
console.log('errors',errs);await b.close()})();
