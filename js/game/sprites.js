// Urutan = nomor sprite. Ganti dengan gambar sendiri lewat CUSTOM_SPRITES, mis. CUSTOM_SPRITES[0]='assets/sprites/kucing.png'
const ANIMALS=['🐱','🐶','🐰','🦉','🦊','🐼','🐧','🐲','🦄','🦚','🦅','🐴','🦑',
 '🦁','🐯','🐸','🐵','🐨','🐘','🦒','🐙','🦋','🐢','🦈','🐬','🦖','🐻',
 '🧚','🧜','🧞','👻','🐉','🦇','🐍'];
// Nama file di assets/sprites/ (urutan sama dengan ANIMALS). Kalau file tidak ada, dipakai sprite dari emoji.
const SPRITE_NAMES=['kucing','anjing','kelinci','burung-hantu','rubah','panda','penguin','naga','unicorn','phoenix','griffin','pegasus','kraken','singa','harimau','kodok','monyet','koala','gajah','jerapah','gurita','kupu-kupu','penyu','hiu','lumba-lumba','dino','beruang','peri','putri-duyung','jin','hantu','naga-timur','kelelawar','ular'];
const CUSTOM_SPRITES={};SPRITE_NAMES.forEach((n,i)=>CUSTOM_SPRITES[i]='assets/sprites/'+String(i+1).padStart(2,'0')+'-'+n+'.png');
const sprites=[];
function buildSprites(){
 ANIMALS.forEach((e,i)=>{
  const t=document.createElement('canvas');t.width=t.height=32;const tx=t.getContext('2d');
  tx.font='26px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';tx.textAlign='center';tx.textBaseline='middle';tx.fillText(e,16,17);
  const c=document.createElement('canvas');c.width=c.height=16;const x=c.getContext('2d');
  x.imageSmoothingEnabled=true;x.drawImage(t,0,0,16,16);
  const d=x.getImageData(0,0,16,16),q=d.data,o=new Uint8ClampedArray(q);
  const pz=v=>Math.min(255,Math.round(Math.max(0,v)/51)*51);
  for(let p=0;p<q.length;p+=4){
   if(q[p+3]>90){const l=(q[p]+q[p+1]+q[p+2])/3;
    for(let k=0;k<3;k++)q[p+k]=pz(l+(q[p+k]-l)*1.6+10);q[p+3]=255;}else q[p+3]=0;}
  const A=(px,py)=>px>=0&&py>=0&&px<16&&py<16&&q[(py*16+px)*4+3]===255;
  for(let py=0;py<16;py++)for(let px=0;px<16;px++){const p=(py*16+px)*4;
   if(q[p+3]===0&&(A(px+1,py)||A(px-1,py)||A(px,py+1)||A(px,py-1))){o[p]=26;o[p+1]=10;o[p+2]=58;o[p+3]=255;}}
  for(let p=0;p<q.length;p++)if(o[p]!==q[p]&&q[(p|3)]===0)q[p]=o[p];
  x.putImageData(d,0,0);sprites[i]=c;
  if(CUSTOM_SPRITES[i]){const im=new Image();im.onload=()=>sprites[i]=im;im.src=CUSTOM_SPRITES[i];}
 });
}

