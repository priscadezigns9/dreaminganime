(()=>{'use strict';
const scenes=[
 {key:'one',id:1,points:[[.055,.19,.045],[.54,.88,.055]]},
 {key:'two',id:2,points:[[.055,.33,.04],[.16,.37,.04],[.25,.50,.045],[.41,.56,.04],[.56,.56,.04],[.72,.56,.04],[.92,.57,.045]]},
 {key:'three',id:3,points:[[.035,.45,.045],[.22,.48,.04],[.32,.52,.04],[.70,.55,.035],[.90,.56,.04]]},
 {key:'four',id:4,points:[[.04,.54,.04],[.18,.55,.04],[.31,.57,.04],[.45,.61,.04],[.60,.63,.04],[.76,.58,.04],[.91,.57,.04]]},
 {key:'five',id:5,points:[[.10,.31,.04],[.18,.48,.04],[.55,.83,.05],[.84,.88,.045],[.97,.69,.04]]}
];
const style=document.createElement('style');style.textContent=`
.lamp-light-layer{position:absolute;z-index:2;inset:0;pointer-events:none;overflow:hidden}
.lamp-breathe{position:absolute;width:clamp(26px,3.7vw,54px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,249,222,.92) 0 7%,rgba(255,219,146,.78) 13%,rgba(255,165,78,.4) 31%,rgba(255,128,42,.16) 52%,transparent 74%);filter:drop-shadow(0 0 7px rgba(255,172,81,.55));animation:lamp-breath 2.8s ease-in-out infinite alternate}
.lamp-breathe::after{content:"";position:absolute;inset:28%;border-radius:50%;background:rgba(255,244,204,.85);box-shadow:0 0 7px 2px rgba(255,197,112,.65)}
@keyframes lamp-breath{from{opacity:.58;scale:.72}to{opacity:1;scale:1.32}}
@media(max-width:650px){.lamp-breathe{width:clamp(22px,6vw,38px)}}
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
