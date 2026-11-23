const SFX={ctx:null,on:true,
 init(){if(this.ctx)return;try{this.ctx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){this.on=false;}},
 tone(freq,dur,type='square',vol=.12){
  if(!this.ctx||!this.on)return;const t=this.ctx.currentTime,o=this.ctx.createOscillator(),g=this.ctx.createGain();
  o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
  o.connect(g).connect(this.ctx.destination);o.start(t);o.stop(t+dur);},
 match(combo){const b=440*Math.pow(2,Math.min(combo,8)/12);
  this.tone(b,.08);setTimeout(()=>this.tone(b*1.25,.08),50);setTimeout(()=>this.tone(b*1.5,.12),100);},
 fail(){this.tone(200,.2,'sawtooth',.08);},
 tick(){this.tone(800,.04,'sine',.04);},
 win(){[0,4,7,12,16].forEach((n,i)=>setTimeout(()=>this.tone(440*Math.pow(2,n/12),.25,'square',.1),i*110));},
 lose(){[12,10,7,3,0].forEach((n,i)=>setTimeout(()=>this.tone(220*Math.pow(2,n/12),.25,'sawtooth',.07),i*140));},
 freeze(){this.tone(1200,.15,'sine',.1);setTimeout(()=>this.tone(1600,.2,'sine',.08),80);},
 bomb(){this.tone(80,.3,'sawtooth',.15);setTimeout(()=>this.tone(60,.4,'sawtooth',.1),100);},
 click(){this.tone(660,.05,'square',.06);}
};
document.addEventListener('pointerdown',()=>SFX.init(),{once:true});

