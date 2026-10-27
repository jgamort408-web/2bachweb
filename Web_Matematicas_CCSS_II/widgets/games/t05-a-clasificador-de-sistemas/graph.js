/** Clip ax+by=c to a square without assuming y can be isolated. */
export function lineSegment([a,b,c],limit=6){
 const points=[],add=(x,y)=>{
  if(!Number.isFinite(x)||!Number.isFinite(y)||Math.abs(x)>limit+1e-9||Math.abs(y)>limit+1e-9)return;
  if(!points.some(p=>Math.hypot(p[0]-x,p[1]-y)<1e-8))points.push([x,y]);
 };
 if(b)for(const x of [-limit,limit])add(x,(c-a*x)/b);
 if(a)for(const y of [-limit,limit])add((c-b*y)/a,y);
 return points.length>=2?[points[0],points[1]]:[];
}
export function classifierGraph(rows){
 const xy=([x,y])=>[32+(x+6)*28,32+(6-y)*28],parts=[];
 for(let k=-6;k<=6;k+=2){const p=xy([k,k]);parts.push(`<line x1="${p[0]}" y1="32" x2="${p[0]}" y2="368" class="grid"/><line x1="32" y1="${p[1]}" x2="368" y2="${p[1]}" class="grid"/>`);
  if(k)parts.push(`<text x="${p[0]}" y="218" text-anchor="middle">${k}</text><text x="192" y="${p[1]-4}" text-anchor="end">${k}</text>`);
 }
 parts.push('<line x1="32" y1="200" x2="378" y2="200" class="axis"/><line x1="200" y1="378" x2="200" y2="22" class="axis"/><text x="381" y="197">x</text><text x="210" y="23">y</text><text x="205" y="218">0</text>');
 rows.forEach((row,i)=>{
  const points=lineSegment(row);if(points.length!==2)return;
  const [p,q]=points.map(xy);
  parts.push(`<line data-graph-line="${i}" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="recta recta-${i}"/>`);
 });
 return `<svg viewBox="0 0 400 400" role="img" aria-labelledby="classifier-graph-title classifier-graph-desc"><title id="classifier-graph-title">Dos rectas en el plano</title><desc id="classifier-graph-desc">Ventana de menos seis a seis en ambos ejes. Primera recta continua gruesa; segunda discontinua fina. Las ecuaciones exactas y la leyenda se ofrecen junto al gráfico.</desc>${parts.join('')}</svg>`;
}
