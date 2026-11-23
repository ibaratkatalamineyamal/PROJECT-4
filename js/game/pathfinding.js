function findPath(g,a,b){
 const R=g.length,C=g[0].length,D=[[1,0],[-1,0],[0,1],[0,-1]];
 let level=[{r:a.r,c:a.c,p:[{r:a.r,c:a.c}]}];const seen=new Set([a.r+','+a.c]);
 for(let t=0;t<3;t++){const next=[];
  for(const n of level)for(const [dr,dc] of D){let r=n.r+dr,c=n.c+dc;
   while(r>=0&&c>=0&&r<R&&c<C){if(r===b.r&&c===b.c)return [...n.p,{r,c}];
    if(g[r][c]!==0)break;const k=r+','+c;
    if(!seen.has(k)){seen.add(k);next.push({r,c,p:[...n.p,{r,c}]});}r+=dr;c+=dc;}}
  level=next;}return null;}
function findMove(g){const by={};
 for(let r=1;r<g.length-1;r++)for(let c=1;c<g[0].length-1;c++){const v=g[r][c];if(v)(by[v]=by[v]||[]).push({r,c});}
 for(const k in by){const L=by[k];for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const p=findPath(g,L[i],L[j]);if(p)return{a:L[i],b:L[j],p};}}return null;}

