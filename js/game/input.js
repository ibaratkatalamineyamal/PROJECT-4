cv.addEventListener('pointermove',e=>{
 if(!G.run)return;const rc=cv.getBoundingClientRect(),k=cv.width/rc.width;
 const c=Math.floor((e.clientX-rc.left)*k/G.s),r=Math.floor((e.clientY-rc.top)*k/G.s);
 if(r>=1&&c>=1&&r<=G.n&&c<=G.n&&G.grid[r][c])G.hover={r,c};else G.hover=null;
});
cv.addEventListener('pointerleave',()=>{G.hover=null;});
cv.addEventListener('pointerdown',e=>{
 if(!G.run)return;SFX.init();
 const rc=cv.getBoundingClientRect(),k=cv.width/rc.width;
 const c=Math.floor((e.clientX-rc.left)*k/G.s),r=Math.floor((e.clientY-rc.top)*k/G.s);
 if(r<1||c<1||r>G.n||c>G.n||!G.grid[r][c])return;
 G.hint=null;SFX.click();
 if(!G.sel){G.sel={r,c};return;}
 if(G.sel.r===r&&G.sel.c===c){G.sel=null;return;}
 const a=G.sel,b={r,c};
 if(G.grid[a.r][a.c]===G.grid[r][c]){const p=findPath(G.grid,a,b);if(p){doMatch(a,b,p);return;}say('❌ Jalur terhalang!');SFX.fail();}
 G.sel=b;
});
document.addEventListener('keydown',e=>{
 if(!G.run&&e.key.toLowerCase()!=='m')return;
 switch(e.key.toLowerCase()){
  case'h':$('hint').click();break;case's':$('shuf').click();break;case'r':$('rst').click();break;
  case'f':$('freeze').click();break;case'b':$('bomb').click();break;
  case'm':toggleSound();break;
 }
});
$('hint').onclick=()=>{if(!G.run)return;const m=findMove(G.grid);if(m){G.hint=[m.a,m.b];G.sel=null;SFX.click();}};
$('shuf').onclick=()=>{if(G.run)reshuffle(false);};
$('rst').onclick=()=>newGame();
$('go').onclick=()=>newGame();
$('freeze').onclick=()=>{
 if(!G.run||G.pwrFreeze<=0||G.frozen)return;G.pwrFreeze--;G.frozen=true;G.freezeTime=10;
 SFX.freeze();say('❄️ Waktu dibekukan 10 detik!');updPwr();};
$('bomb').onclick=()=>{
 if(!G.run||G.pwrBomb<=0)return;G.pwrBomb--;
 const m=findMove(G.grid);if(m){doMatch(m.a,m.b,m.p,true);say('💣 Boom! Sepasang ubin dihapus!');}
 else say('Tidak ada pasangan tersisa.');SFX.bomb();updPwr();};
function toggleSound(){SFX.on=!SFX.on;$('snd').textContent=SFX.on?'🔊':'🔇';}
$('snd').onclick=toggleSound;

function doMatch(a,b,p,isBomb){
 const s=G.s,ctr=q=>({x:q.c*s+s/2,y:q.r*s+s/2});
 G.fx.push({pts:p.map(ctr),t:0});
 [a,b].forEach(q=>{G.ghosts.push({...q,v:G.grid[q.r][q.c],t:0});burst(ctr(q),COL[(G.grid[q.r][q.c]-1)%COL.length]);G.grid[q.r][q.c]=0;});
 G.sel=null;G.left-=2;
 const now=performance.now();
 if(!isBomb){
  if(now-G.lastMatch<2500&&G.combo>0)G.combo++;else G.combo=1;
  G.lastMatch=now;G.comboTimer=1.5;
  const mult=Math.min(G.combo,5),pts=100*mult;G.score+=pts;
  const mid={x:(ctr(a).x+ctr(b).x)/2,y:(ctr(a).y+ctr(b).y)/2};
  if(G.combo>1){
   G.popups.push({x:mid.x,y:mid.y-10,text:'COMBO x'+G.combo+'! +'+pts,c:'#ffe600',t:0});
   showCombo(G.combo);screenShake();SFX.match(G.combo);
  }else{G.popups.push({x:mid.x,y:mid.y-10,text:'+'+pts,c:'#7cff3a',t:0});SFX.match(0);}
 }else{G.score+=50;G.popups.push({x:ctr(a).x,y:ctr(a).y-10,text:'+50',c:'#00e5ff',t:0});}
 hud();
 if(G.left===0){finish(true);return;}
 if(!findMove(G.grid)){say('Tidak ada langkah. Mengacak otomatis...');reshuffle(true);}
}
function burst(o,col){
 for(let i=0;i<24;i++){const an=Math.random()*6.283,sp=1.5+Math.random()*4;
  G.parts.push({x:o.x,y:o.y,vx:Math.cos(an)*sp,vy:Math.sin(an)*sp,l:1,c:i%3?col:'#fff',sz:2+Math.random()*3});}}
function screenShake(){const w=$('wrap');w.classList.remove('shake');void w.offsetWidth;w.classList.add('shake');
 setTimeout(()=>w.classList.remove('shake'),160);}
function showCombo(n){const el=$('combo-disp');el.textContent='🔥 COMBO x'+n+'!';el.classList.remove('show');
 void el.offsetWidth;el.classList.add('show');clearTimeout(showCombo.h);showCombo.h=setTimeout(()=>el.classList.remove('show'),1200);}
function spawnConfetti(){
 for(let i=0;i<120;i++)G.confetti.push({x:cv.width/2+(Math.random()-.5)*cv.width*.7,y:-10-Math.random()*80,
  vx:(Math.random()-.5)*4,vy:1+Math.random()*3,rot:Math.random()*6.28,rv:(Math.random()-.5)*.3,
  w:3+Math.random()*6,h:2+Math.random()*4,c:COL[Math.random()*COL.length|0],l:3+Math.random()*2});}

