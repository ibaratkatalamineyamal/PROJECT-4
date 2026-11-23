const stars=[];
function initStars(n=90){for(let i=0;i<n;i++)stars.push({x:Math.random(),y:Math.random(),s:.5+Math.random()*1.5,ph:Math.random()*6.28,sp:.3+Math.random()*.7});}
function drawStars(ctx,w,h,now){
 stars.forEach(s=>{ctx.globalAlpha=.2+.6*Math.abs(Math.sin(now/1000*s.sp+s.ph));
  ctx.fillStyle='#fff';ctx.fillRect(s.x*w,s.y*h,s.s,s.s);});ctx.globalAlpha=1;}

