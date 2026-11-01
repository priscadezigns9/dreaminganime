(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');if(reduced.matches)return;
const items=[
 {name:'one',id:1,lamps:[[.055,.18,.07],[.95,.32,.05],[.93,.57,.05],[.48,.93,.07],[.84,.63,.04],[.70,.35,.03]]},
 {name:'two',id:2,lamps:[[.08,.30,.05],[.20,.47,.045],[.36,.69,.045],[.56,.62,.045],[.70,.67,.045],[.89,.62,.055],[.95,.76,.04]]},
 {name:'three',id:3,lamps:[[.02,.44,.06],[.11,.50,.05],[.30,.61,.05],[.40,.54,.04],[.69,.70,.055],[.95,.59,.06]]},
 {name:'four',id:4,lamps:[[.23,.59,.05],[.38,.78,.05],[.53,.70,.05],[.60,.72,.05],[.81,.92,.06],[.88,.29,.045]]},
 {name:'five',id:5,lamps:[[.22,.63,.06],[.42,.33,.05],[.62,.82,.06],[.98,.72,.05],[.94,.65,.05],[.10,.36,.05]]}
];
let active=false,visible=!document.hidden;
for(const item of items){
 const art=document.querySelector('.art-'+item.name);if(!art)continue;
 const canvas=document.createElement('canvas');canvas.className='painted-water-flow';canvas.setAttribute('aria-hidden','true');canvas.width=384;canvas.height=216;art.insertAdjacentElement('afterend',canvas);
 const ctx=canvas.getContext('2d',{alpha:true}),frame=document.createElement('canvas');frame.width=384;frame.height=216;const fc=frame.getContext('2d');
 const mask=new Image();mask.src=`/assets/follow-the-spark/water-mask-0${item.id}.png`;
 let maskCanvas=document.createElement('canvas');maskCanvas.width=384;maskCanvas.height=216;const mc=maskCanvas.getContext('2d',{willReadFrequently:true});let ready=false,shown=false,raf=0,last=0,phase=Math.random()*6.28;
 function onMask(){if(ready||!mask.complete||!mask.naturalWidth)return;mc.drawImage(mask,0,0,384,216);const im=mc.getImageData(0,0,384,216),d=im.data;for(let i=0;i<d.length;i+=4){const a=d[i];d[i]=d[i+1]=d[i+2]=255;d[i+3]=a}mc.putImageData(im,0,0);ready=true;if(shown)start()}
 mask.addEventListener('load',onMask);onMask();
 const sectionObserver=new IntersectionObserver(entries=>{shown=entries[0].isIntersecting;if(shown)start();else if(raf){cancelAnimationFrame(raf);raf=0}},{rootMargin:'100px'});sectionObserver.observe(art);
 function paint(t){raf=0;if(!shown||!visible||reduced.matches)return;onMask();if(!ready){raf=requestAnimationFrame(paint);return}
  if(t-last>=110){last=t;ctx.clearRect(0,0,384,216);fc.clearRect(0,0,384,216);
   // Shift two low-resolution image tiles; the once-converted gray map clips the flow.
   const shift=(t*.009+item.id*23)%216;
   const image=document.querySelector('.art-'+item.name);
   const style=getComputedStyle(image).backgroundImage;const match=style.match(/url\(["']?(.*?)["']?\)/);if(match){
    const source=window.__daSceneImages||(window.__daSceneImages=[]);let img=source[item.id];if(!img){img=new Image();img.src=`/assets/follow-the-spark/anime-scene-0${item.id}.webp`;source[item.id]=img}
    if(img.complete&&img.naturalWidth){
     const W=img.naturalWidth,H=img.naturalHeight,box=image.getBoundingClientRect(),ratio=box.width/box.height;let sx=0,sy=0,sw=W,sh=H;
     if(W/H>ratio){sw=H*ratio;sx=(W-sw)*.5}else{sh=W/ratio;sy=(H-sh)*.5}
     fc.drawImage(img,sx,sy,sw,sh,0,shift,384,216);fc.drawImage(img,sx,sy,sw,sh,0,shift-216,384,216);
     fc.globalCompositeOperation='destination-in';fc.drawImage(maskCanvas,0,0);fc.globalCompositeOperation='source-over';ctx.drawImage(frame,0,0);
    }
   }
   // A gentle, low-cost breathing glow at warm points in the illustration.
   ctx.save();ctx.globalCompositeOperation='screen';const pulse=.5+.5*Math.sin(t*.001+phase);
   for(const [x,y,r] of item.lamps){const px=x*384,py=y*216,rad=Math.max(10,r*384*(1.6+.25*pulse)),g=ctx.createRadialGradient(px,py,0,px,py,rad);g.addColorStop(0,`rgba(255,245,210,${.72+.18*pulse})`);g.addColorStop(.18,`rgba(255,205,130,${.58+.18*pulse})`);g.addColorStop(.48,`rgba(255,150,65,${.38+.14*pulse})`);g.addColorStop(1,'rgba(255,112,28,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,rad,0,Math.PI*2);ctx.fill()}
   ctx.restore();
  }raf=requestAnimationFrame(paint)
 }
 function start(){if(shown&&visible&&!raf&&!reduced.matches)raf=requestAnimationFrame(paint)}
}
document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible){for(const item of items){const art=document.querySelector('.art-'+item.name);if(art&&art.isConnected)art.dispatchEvent(new Event('lamp-resume'))}}});
reduced.addEventListener?.('change',()=>{if(reduced.matches)document.querySelectorAll('.painted-water-flow').forEach(x=>x.remove())});
})();
