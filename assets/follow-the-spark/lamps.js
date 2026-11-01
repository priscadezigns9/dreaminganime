(()=>{'use strict';
const scenes=[
 {key:'one',id:1,points:[[.058,.22,.06],[.54,.87,.06]]},
 {key:'two',id:2,points:[[.055,.30,.045],[.15,.36,.045],[.23,.48,.045],[.38,.56,.045],[.55,.55,.045],[.70,.56,.045],[.93,.57,.05]]},
 {key:'three',id:3,points:[[.03,.45,.05],[.22,.48,.045],[.32,.52,.045],[.70,.55,.045],[.90,.56,.05]]},
 {key:'four',id:4,points:[[.04,.53,.045],[.18,.54,.045],[.31,.56,.045],[.45,.61,.045],[.60,.62,.045],[.76,.57,.045],[.91,.56,.05]]},
 {key:'five',id:5,points:[[.10,.31,.045],[.18,.48,.045],[.55,.83,.055],[.84,.88,.05],[.97,.69,.045]]}
];
const style=document.createElement('style');style.textContent=`
.lamp-light-layer{position:absolute;z-index:2;inset:0;pointer-events:none;overflow:hidden}
.lamp-breathe{position:absolute;width:clamp(38px,5.2vw,72px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,255,224,1) 0 8%,rgba(255,229,153,.96) 15%,rgba(255,175,83,.68) 32%,rgba(255,132,46,.3) 56%,transparent 77%);filter:drop-shadow(0 0 12px rgba(255,184,92,.95));animation:lamp-breath 1.55s ease-in-out infinite alternate}
.lamp-breathe::after{content:"";position:absolute;inset:28%;border-radius:50%;background:rgba(255,255,235,1);box-shadow:0 0 12px 4px rgba(255,202,126,.95)}
@keyframes lamp-breath{from{opacity:.55;scale:.78}to{opacity:1;scale:1.42}}
@media(max-width:650px){.lamp-breathe{width:clamp(32px,9vw,56px)}}
@media(prefers-reduced-motion:reduce){.lamp-breathe{animation:none;opacity:.78;scale:1}}
`;document.head.append(style);
const images=new Map();
function getImage(id){if(!images.has(id)){const im=new Image();im.src=`/assets/follow-the-spark/anime-scene-0${id}.webp`;images.set(id,im)}return images.get(id)}
for(const s of scenes){
 const art=document.querySelector('.art-'+s.key);if(!art)continue;
 const layer=document.createElement('div');layer.className='lamp-light-layer';layer.setAttribute('aria-hidden','true');art.insertAdjacentElement('afterend',layer);
 const img=getImage(s.id);
 function layout(){const rect=art.getBoundingClientRect();if(!rect.width||!rect.height||!img.naturalWidth)return;const iw=img.naturalWidth,ih=img.naturalHeight,ratio=rect.width/rect.height;let sx=0,sy=0,sw=iw,sh=ih;if(iw/ih>ratio){sw=ih*ratio;sx=(iw-sw)*.5}else{sh=iw/ratio;sy=(ih-sh)*.5}layer.replaceChildren();s.points.forEach(([x,y,size],n)=>{const px=(x*iw-sx)/sw*100,py=(y*ih-sy)/sh*100;if(px<0||px>100||py<0||py>100)return;const dot=document.createElement('i');dot.className='lamp-breathe';dot.style.left=px+'%';dot.style.top=py+'%';dot.style.animationDelay=(-n*.37)+'s';layer.append(dot)})}
 if(img.complete)layout();else img.addEventListener('load',layout,{once:true});new ResizeObserver(layout).observe(art);window.addEventListener('resize',layout,{passive:true});
}
})();
