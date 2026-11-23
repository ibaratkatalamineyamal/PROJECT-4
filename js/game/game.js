const cv=$('cv'),ctx=cv.getContext('2d');
const COL=['#00e5ff','#ff2bd6','#ffe600','#7cff3a','#ff7a1a','#9b6bff','#ff4d4d','#2b8cff','#00ffa3','#ff9ecb','#c8ff00','#ffb300','#b45cff','#00c2a8','#ff5fa2','#5cf2ff'];
const G={n:10,grid:[],left:0,score:0,time:240,run:false,sel:null,hint:null,s:48,
 fx:[],ghosts:[],parts:[],best:0,hover:null,
 combo:0,lastMatch:0,comboTimer:0,popups:[],confetti:[],
 frozen:false,freezeTime:0,pwrFreeze:1,pwrBomb:3,
 entTime:0,shaking:false,
 elapsed:0,bestTime:Infinity,matchCount:0,totalPairs:0};

function say(t){$('msg').textContent=t;clearTimeout(say.h);say.h=setTimeout(()=>$('msg').textContent='',2500);}
function updPwr(){$('freeze').textContent='❄️ BEKUKAN ('+G.pwrFreeze+')';$('bomb').textContent='💣 BOM ('+G.pwrBomb+')';
 $('freeze').disabled=G.pwrFreeze<=0||!G.run;$('bomb').disabled=G.pwrBomb<=0||!G.run;}
function shuffleArr(a){for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}}
function newGame(){
 G.n=+$('sz').value;const n=G.n,cnt=n*n;
 const nt=Math.min(ANIMALS.length,{6:8,8:14,10:20}[n]||14),pool=ANIMALS.map((_,i)=>i+1);shuffleArr(pool);pool.length=nt;
 const types=[];for(let i=0;i<cnt/2;i++){const t=pool[i%nt];types.push(t,t);}
 shuffleArr(types);
 G.grid=Array.from({length:n+2},()=>Array(n+2).fill(0));
 let k=0;for(let r=1;r<=n;r++)for(let c=1;c<=n;c++)G.grid[r][c]=types[k++];
 G.left=cnt;G.score=0;G.time=240;G.sel=null;G.hint=null;G.fx=[];G.ghosts=[];G.parts=[];G.popups=[];G.confetti=[];
 G.combo=0;G.comboTimer=0;G.lastMatch=0;G.hover=null;
 G.frozen=false;G.freezeTime=0;G.pwrFreeze=1;G.pwrBomb=3;
 G.run=true;G.entTime=0;
 resize();$('ov').classList.add('hid');updPwr();
 if(!findMove(G.grid))reshuffle(true);
 hud();SFX.click();
}
function reshuffle(free){
 const pos=[],vals=[];
 for(let r=1;r<=G.n;r++)for(let c=1;c<=G.n;c++)if(G.grid[r][c]){pos.push([r,c]);vals.push(G.grid[r][c]);}
 for(let i=0;i<60;i++){shuffleArr(vals);pos.forEach(([r,c],k)=>G.grid[r][c]=vals[k]);if(findMove(G.grid))break;}
 G.sel=null;G.hint=null;G.entTime=0;
 if(!free){G.score=Math.max(0,G.score-50);say('🔀 Papan diacak! -50 poin');SFX.fail();}
 hud();
}
function hud(){
 $('sc').textContent=G.score;
 const m=Math.max(0,Math.ceil(G.time));$('tm').textContent=(m/60|0)+':'+String(m%60).padStart(2,'0');
 $('cb').textContent=G.combo>1?'x'+G.combo:'-';
 const tb=$('tmbox');
 if(G.frozen){tb.className='box frozen-ind';$('tm').style.color='var(--cy)';}
 else if(m<=30){tb.className='box time-warn';$('tm').style.color='';}
 else{tb.className='box';$('tm').style.color='';}
}
function finish(win){
 G.run=false;
 if(win){G.score+=Math.ceil(G.time)*5;spawnConfetti();}
 if(G.score>G.best)G.best=G.score;
 hud();$('bs').textContent=G.best;recordGame(win);
 if(win)SFX.win();else SFX.lose();
 $('ot').textContent=win?'🎉 KAMU MENANG!':'⏰ WAKTU HABIS!';
 $('od').textContent=(win?'Semua ubin habis! Bonus waktu dihitung. ':'Masih ada ubin tersisa. ')+'Skor akhir: '+G.score;
 $('go').textContent='MAIN LAGI';$('ov').classList.remove('hid');updPwr();
}

