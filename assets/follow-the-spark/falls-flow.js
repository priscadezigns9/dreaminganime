(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');if(reduced.matches)return;
const items=[
 {name:'one',id:1},
 {name:'two',id:2},
 {name:'three',id:3},
 {name:'four',id:4},
 {name:'five',id:5}
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
    }raf=requestAnimationFrame(paint)
 }
 function start(){if(shown&&visible&&!raf&&!reduced.matches)raf=requestAnimationFrame(paint)}
}
document.addEventListener('visibilitychange',()=>{visible=!document.hidden});
reduced.addEventListener?.('change',()=>{if(reduced.matches)document.querySelectorAll('.painted-water-flow').forEach(x=>x.remove())});
})();
