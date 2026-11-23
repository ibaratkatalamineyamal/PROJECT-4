function resize(){
 const cells=G.n+2,avail=Math.min(window.innerWidth-40,640);
 G.s=Math.max(20,Math.floor(avail/cells));
 cv.width=cv.height=G.s*cells;cv.style.width=cv.width+'px';cv.style.height=cv.height+'px';
}
function tile(r,c,v,sc,pulse,sel,hov,entSc){
 const s=G.s,x=c*s,y=r*s,col=COL[(v-1)%COL.length];
 const finalSc=sc*(entSc!=null?entSc:1);
 const m=Math.round(s*(1-finalSc)/2),w=s-m*2;
 if(w<=2)return;
 if(sel){ctx.shadowColor='#ffe600';ctx.shadowBlur=18;}
 else if(hov){ctx.shadowColor='#00e5ff';ctx.shadowBlur=10;}
 ctx.fillStyle=col;ctx.fillRect(x+m+1,y+m+1,w-2,w-2);
 ctx.fillStyle='#1a1245';ctx.fillRect(x+m+4,y+m+4,w-8,w-8);
 ctx.fillStyle=col+'28';ctx.fillRect(x+m+4,y+m+4,w-8,w-8);
 ctx.fillStyle='#ffffff55';ctx.fillRect(x+m+1,y+m+1,w-2,3);
 ctx.fillStyle='#ffffff22';ctx.fillRect(x+m+1,y+m+4,2,w-8);
 ctx.fillStyle='#00000066';ctx.fillRect(x+m+1,y+m+w-4,w-2,3);
 ctx.fillStyle='#00000033';ctx.fillRect(x+m+w-3,y+m+4,2,w-8);
 ctx.shadowColor='transparent';ctx.shadowBlur=0;
 ctx.imageSmoothingEnabled=false;
 const sp=sprites[v-1],pad=Math.round(w*.09);
 if(sp)ctx.drawImage(sp,x+m+pad,y+m+pad,w-pad*2,w-pad*2);
 if(sel){
  const cl=Math.max(6,w/3.5),now=performance.now(),p2=1+Math.sin(now/150)*.15;
  ctx.strokeStyle='#ffe600';ctx.lineWidth=2*p2;ctx.lineCap='square';
  const x1=x+m+1,y1=y+m+1,x2=x+m+w-2,y2=y+m+w-2;
  ctx.beginPath();ctx.moveTo(x1,y1+cl);ctx.lineTo(x1,y1);ctx.lineTo(x1+cl,y1);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x2-cl,y1);ctx.lineTo(x2,y1);ctx.lineTo(x2,y1+cl);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x1,y2-cl);ctx.lineTo(x1,y2);ctx.lineTo(x1+cl,y2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x2-cl,y2);ctx.lineTo(x2,y2);ctx.lineTo(x2,y2-cl);ctx.stroke();
 }
 if(pulse){ctx.lineWidth=2;ctx.strokeStyle='#fff';ctx.strokeRect(x+m+1.5,y+m+1.5,w-3,w-3);}
 if(hov&&!sel){ctx.lineWidth=1;ctx.strokeStyle='#00e5ff88';ctx.strokeRect(x+m+1.5,y+m+1.5,w-3,w-3);}
}
function drawVignette(){
 const g=ctx.createRadialGradient(cv.width/2,cv.height/2,cv.width*.25,cv.width/2,cv.height/2,cv.width*.72);
 g.addColorStop(0,'transparent');g.addColorStop(1,'rgba(0,0,0,0.35)');ctx.fillStyle=g;ctx.fillRect(0,0,cv.width,cv.height);}
let last=performance.now();
function loop(now){
 const dt=Math.min(.05,(now-last)/1000);last=now;
 if(G.run){
  if(G.frozen){G.freezeTime-=dt;if(G.freezeTime<=0){G.frozen=false;G.freezeTime=0;say('⏱️ Waktu berjalan lagi!');}}
  else{G.time-=dt;if(G.time<=0){G.time=0;hud();finish(false);}else{if(G.time<=10&&G.time>0&&Math.floor(G.time)!==Math.floor(G.time+dt))SFX.tick();}}
  hud();
 }
 G.entTime+=dt;if(G.comboTimer>0)G.comboTimer-=dt;
 ctx.clearRect(0,0,cv.width,cv.height);
 drawStars(ctx,cv.width,cv.height,now);
 ctx.fillStyle='#ffffff08';
 for(let i=0;i<=G.n+1;i++)for(let j=0;j<=G.n+1;j++)if((i+j)%2===0)ctx.fillRect(j*G.s,i*G.s,G.s,G.s);
 ctx.strokeStyle='#ffffff06';ctx.lineWidth=1;
 for(let i=0;i<=G.n+2;i++){ctx.beginPath();ctx.moveTo(i*G.s,0);ctx.lineTo(i*G.s,cv.height);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,i*G.s);ctx.lineTo(cv.width,i*G.s);ctx.stroke();}
 if(G.grid.length){
  const blink=Math.floor(now/250)%2===0;
  for(let r=1;r<=G.n;r++)for(let c=1;c<=G.n;c++){
   const v=G.grid[r][c];if(!v)continue;
   const sel=G.sel&&G.sel.r===r&&G.sel.c===c;
   const hn=G.hint&&G.hint.some(q=>q.r===r&&q.c===c)&&blink;
   const hov=G.hover&&G.hover.r===r&&G.hover.c===c&&!sel;
   const delay=(r+c-2)*.035;
   let entSc=Math.min(1,Math.max(0,(G.entTime-delay)/.2));
   entSc=entSc<1?1-(1-entSc)*(1-entSc):1;
   tile(r,c,v,1,hn,sel,hov,entSc);
  }
  G.ghosts=G.ghosts.filter(g=>(g.t+=dt)<.25);
  G.ghosts.forEach(g=>tile(g.r,g.c,g.v,1-g.t/.25,false,false,false,1));
  G.fx=G.fx.filter(f=>(f.t+=dt)<.5);
  G.fx.forEach(f=>{
   ctx.globalAlpha=1-f.t/.5;
   [['#ff2bd6',10,8],['#ffe600',5,4],['#fff',2,0]].forEach(([cl,w,bl])=>{
    ctx.strokeStyle=cl;ctx.lineWidth=w;ctx.shadowColor=cl;ctx.shadowBlur=bl;
    ctx.lineCap='square';ctx.lineJoin='miter';ctx.beginPath();
    f.pts.forEach((p,i)=>i?ctx.lineTo(Math.round(p.x/4)*4,Math.round(p.y/4)*4):ctx.moveTo(Math.round(p.x/4)*4,Math.round(p.y/4)*4));
    ctx.stroke();});
   ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.globalAlpha=1;
  });
  G.parts=G.parts.filter(p=>(p.l-=dt*1.6)>0);
  G.parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.15;
   ctx.globalAlpha=p.l;ctx.shadowColor=p.c;ctx.shadowBlur=4;
   ctx.fillStyle=p.c;ctx.fillRect(Math.round(p.x/4)*4,Math.round(p.y/4)*4,p.sz||4,p.sz||4);});
  ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.globalAlpha=1;
  G.popups=G.popups.filter(p=>{p.t+=dt;p.y-=dt*60;
   const a=Math.max(0,1-p.t/1.5);if(a<=0)return false;
   ctx.globalAlpha=a;ctx.font='bold '+Math.round(G.s*.28)+'px "Press Start 2P"';ctx.textAlign='center';
   ctx.shadowColor=p.c;ctx.shadowBlur=6;ctx.fillStyle=p.c;ctx.fillText(p.text,p.x,p.y);
   ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.globalAlpha=1;return true;});
  G.confetti=G.confetti.filter(p=>{p.l-=dt;if(p.l<=0)return false;
   p.x+=p.vx;p.y+=p.vy;p.vy+=dt*40;p.rot+=p.rv;
   ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
   ctx.globalAlpha=Math.min(1,p.l);ctx.fillStyle=p.c;
   ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();return true;});
  ctx.globalAlpha=1;
 }
 drawVignette();
 requestAnimationFrame(loop);
}
window.addEventListener('resize',()=>{if(G.grid.length)resize();});

