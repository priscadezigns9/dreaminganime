(()=>{'use strict';
const world=document.querySelector('.world'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.painted-water-flow').forEach(el=>el.remove());
if(!world||reduced.matches)return;
const scenes=[
 {key:'one',id:1,pos:.5,lamps:[[.055,.18,.075],[.47,.86,.060],[.18,.43,.025],[.29,.55,.022],[.68,.71,.018],[.79,.69,.018]]},
 {key:'two',id:2,pos:.5,lamps:[[.095,.54,.035],[.17,.61,.028],[.28,.66,.025],[.42,.68,.023],[.53,.73,.023],[.70,.63,.025],[.89,.61,.030]]},
 {key:'three',id:3,pos:.5,lamps:[[.025,.55,.035],[.14,.60,.03],[.23,.67,.03],[.39,.70,.025],[.54,.68,.025],[.73,.63,.025],[.91,.69,.03]]},
 {key:'four',id:4,pos:.5,lamps:[[.04,.57,.035],[.12,.58,.03],[.24,.60,.03],[.36,.68,.025],[.50,.68,.025],[.65,.63,.025],[.80,.53,.025],[.93,.49,.03]]},
 {key:'five',id:5,pos:.5,lamps:[[.035,.45,.035],[.13,.54,.025],[.24,.62,.025],[.34,.65,.025],[.45,.68,.025],[.58,.72,.025],[.72,.75,.03],[.88,.72,.035]]}
];
const cache=new Map();function image(src){if(!cache.has(src)){const x=new Image();x.src=src;cache.set(src,x)}return cache.get(src)}
for(const spec of scenes){
 const scene=document.querySelector('.art-'+spec.key);if(!scene)continue;
 const source=image(`/assets/follow-the-spark/anime-scene-0${spec.id}.webp`),mask=image(`/assets/follow-the-spark/water-mask-0${spec.id}.png`);
 const canvas=document.createElement('canvas');canvas.className='painted-water-flow';canvas.setAttribute('aria-hidden','true');scene.insertAdjacentElement('afterend',canvas);
 let ctx=canvas.getContext('2d',{alpha:true}),frame=document.createElement('canvas'),fc=frame.getContext('2d',{willReadFrequently:true}),maskCanvas=document.createElement('canvas'),mc=maskCanvas.getContext('2d',{willReadFrequently:true});
 let sx=0,sy=0,sw=0,sh=0,W=0,H=0,maskReady=false,inView=false,raf=0,last=0,seenVisible=!document.hidden, lampData=[];
 const measure=()=>{
  const rect=scene.getBoundingClientRect(),ratio=source.naturalWidth/source.naturalHeight;
  if(!rect.width||!rect.height||!source.naturalWidth)return;
  const scale=Math.min(1.25,1200/rect.width);W=Math.max(2,Math.round(rect.width*scale));H=Math.max(2,Math.round(rect.height*scale));
  for(const c of [canvas,frame,maskCanvas]){c.width=W;c.height=H}
  const boxRatio=rect.width/rect.height,iw=source.naturalWidth,ih=source.naturalHeight;
  if(boxRatio>ratio){sw=iw;sh=iw/boxRatio;sx=0;sy=(ih-sh)*spec.pos}
  else{sh=ih;sw=ih*boxRatio;sx=(iw-sw)*spec.pos;sy=0}
  mc.clearRect(0,0,W,H);mc.drawImage(mask,sx,sy,sw,sh,0,0,W,H);
  const im=mc.getImageData(0,0,W,H),d=im.data;for(let p=0;p<d.length;p+=4){const gray=d[p];d[p]=255;d[p+1]=255;d[p+2]=255;d[p+3]=Math.round(Math.min(1,gray/215)*255)}mc.putImageData(im,0,0);maskReady=true;
  lampData=spec.lamps.map(([x,y,r])=>({x:(x*iw-sx)/sw*W,y:(y*ih-sy)/sh*H,r:r*iw/sw*W,phase:Math.random()*6.28})).filter(p=>p.x>=0&&p.x<=W&&p.y>=0&&p.y<=H);
 };
 const resize=new ResizeObserver(()=>{maskReady=false;measure();if(inView)start()});resize.observe(scene);
 function measureIfReady(){if(source.complete&&source.naturalWidth&&mask.complete&&mask.naturalWidth){if(!maskReady)measure();if(inView)start()}}
 source.addEventListener('load',measureIfReady);mask.addEventListener('load',measureIfReady);measureIfReady();
 function draw(now){raf=0;if(!seenVisible||!inView||reduced.matches)return;measureIfReady();if(!maskReady){raf=requestAnimationFrame(draw);return}
  if(now-last>45){last=now;const t=now*.001,dy=(t*12+spec.id*17)%H;fc.clearRect(0,0,W,H);
   // Scroll the matching scene texture down inside the crop used by background-size:cover.
   fc.drawImage(source,sx,sy,sw,sh,0,dy,W,H);fc.drawImage(source,sx,sy,sw,sh,0,dy-H,W,H);
   fc.globalCompositeOperation='destination-in';fc.drawImage(maskCanvas,0,0,W,H);fc.globalCompositeOperation='source-over';ctx.clearRect(0,0,W,H);ctx.drawImage(frame,0,0);
   // Moving, water-coloured caustic ribbons stay clipped to the waterfall mask.
   ctx.save();ctx.globalCompositeOperation='source-atop';
   for(let y=-100+dy%108;y<H+100;y+=108){const grad=ctx.createLinearGradient(0,y-8,0,y+9);grad.addColorStop(0,'rgba(168,235,255,0)');grad.addColorStop(.48,'rgba(184,238,255,.36)');grad.addColorStop(.55,'rgba(255,255,255,.25)');grad.addColorStop(1,'rgba(168,235,255,0)');ctx.fillStyle=grad;ctx.fillRect(0,y-9,W,18)}
   ctx.restore();
   // Soft local amber breathing around the lamps already painted into each scene.
   ctx.save();ctx.globalCompositeOperation='screen';
   for(const l of lampData){const pulse=.5+.5*Math.sin(t*.9+l.phase),r=l.r*(.72+.22*pulse);const g=ctx.createRadialGradient(l.x,l.y,0,l.x,l.y,r);g.addColorStop(0,`rgba(255,203,125,${.28+.12*pulse})`);g.addColorStop(.25,`rgba(255,153,68,${.15+.08*pulse})`);g.addColorStop(1,'rgba(255,130,35,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(l.x,l.y,r,0,Math.PI*2);ctx.fill()}
   ctx.restore();
  }
  raf=requestAnimationFrame(draw)
 }
 function start(){if(!raf&&inView&&seenVisible&&!reduced.matches)raf=requestAnimationFrame(draw)}
 const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)start();else if(raf){cancelAnimationFrame(raf);raf=0}},{rootMargin:'120px'});observer.observe(scene);
 document.addEventListener('visibilitychange',()=>{seenVisible=!document.hidden;if(seenVisible)start();else if(raf){cancelAnimationFrame(raf);raf=0}});
 reduced.addEventListener?.('change',()=>{if(reduced.matches){observer.disconnect();resize.disconnect();if(raf)cancelAnimationFrame(raf);canvas.remove()}});
}
})();
