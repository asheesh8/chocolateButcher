const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('http://localhost:4173/#home');await p.waitForTimeout(2500);
const hero=await p.$('.hero .row');await hero.screenshot({path:'shots/btn-rest.png'});
await p.hover('.hero .row .btn--primary');await p.waitForTimeout(500);await hero.screenshot({path:'shots/btn-hov1.png'});
await p.hover('.hero .row .btn:not(.btn--primary)');await p.waitForTimeout(600);await hero.screenshot({path:'shots/btn-hov2.png'});
await p.goto('http://localhost:4173/#shop');await p.waitForTimeout(1500);const c=await p.$('.card');await c.scrollIntoViewIfNeeded();await c.screenshot({path:'shots/btn-card.png'});
await p.hover('.card .btn--add');await p.waitForTimeout(500);await c.screenshot({path:'shots/btn-card-h.png'});
await b.close()})();
