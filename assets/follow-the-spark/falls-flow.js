(()=>{'use strict';
const world=document.querySelector('.world'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const previous=document.querySelector('.world-fx');if(previous)previous.remove();
if(!world||reduced.matches)return;
const layers=['one','two','three','four','five'];
for(let index=0;index<layers.length;index++){
 const scene=document.querySelector('.art-'+layers[index]);if(!scene)continue;
 const source=new Image();source.src='/assets/follow-the-spark/anime-scene-0'+(index+1)+'.webp';
 const mask=new Image();mask.src='/assets/follow-the-spark/water-mask-0'+(index+1)+'.png';
 const w=1024,h=576,frame=document.createElement('canvas');frame.width=w;frame.height=h;
 const fc=frame.getContext('2d');const overlay=document.createElement('canvas');overlay.width=w;overlay.height=h;overlay.className='painted-water-flow';overlay.setAttribute('aria-hidden','true');scene.insertAdjacentElement('afterend',overlay);const oc=overlay.getContext('2d');
 let inView=false,frameNo=0,raf=0,last=0,visible=true;
 function render(now){raf=0;if(!visible||!inView||reduced.matches)return;if(!source.complete||!source.naturalWidth||!mask.complete||!mask.naturalWidth){return}
  if(now-last>40){last=now;fc.clearRect(0,0,w,h);const t=now*.001;
   // Shift the original water texture down in small, overlapping strips. This is
   // clipped by the artwork-derived mask rather than floating over the scene.
   for(let y=0;y<h;y+=3){let sy=(y-(t*12+(index*7))%20+h)%h;fc.drawImage(source,0,sy*2,w*2,6,0,y,w,3)}
   fc.globalCompositeOperation='destination-in';fc.drawImage(mask,0,0);fc.globalCompositeOperation='source-over';
   oc.clearRect(0,0,w,h);oc.drawImage(fc,0,0);
  }
  raf=requestAnimationFrame(render);
 }
 function start(){if(!raf&&inView&&visible&&!reduced.matches)raf=requestAnimationFrame(render)}
 source.addEventListener('load',start);mask.addEventListener('load',start);
 new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)start();else if(raf){cancelAnimationFrame(raf);raf=0}},{rootMargin:'100px'}).observe(scene);
 document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible)start();else if(raf){cancelAnimationFrame(raf);raf=0}});
 reduced.addEventListener?.('change',()=>{overlay.hidden=reduced.matches;if(!reduced.matches)start()});
}
})();
