(()=>{'use strict';
const scenes=[
 {key:'one',id:1,points:[[.058,.17],[.54,.88]]},
 {key:'two',id:2,points:[[.08,.43],[.18,.49],[.29,.53],[.65,.57],[.94,.57]]},
 {key:'three',id:3,points:[[.035,.45],[.22,.47],[.35,.46],[.57,.48],[.76,.53],[.95,.55]]},
 {key:'four',id:4,points:[[.015,.48],[.24,.56],[.37,.59],[.51,.62],[.66,.64],[.81,.62],[.94,.60]]},
 {key:'five',id:5,points:[[.03,.42],[.20,.68],[.43,.84],[.60,.80],[.76,.75],[.95,.60]]}
];
const style=document.createElement('style');style.textContent=`
.world{position:relative}
.world-art{z-index:0!important}
.lamp-light-layer{position:absolute;z-index:3;left:0;right:0;top:0;height:100%;pointer-events:none;overflow:hidden}
.lamp-breathe{position:absolute;width:clamp(22px,2.4vw,34px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,249,221,.48) 0 8%,rgba(255,218,148,.32) 18%,rgba(255,157,74,.12) 42%,transparent 72%);filter:drop-shadow(0 0 4px rgba(255,183,99,.27));animation:lamp-breath 3.8s ease-in-out infinite alternate}
.lamp-breathe::after{content:"";position:absolute;inset:37%;border-radius:50%;background:rgba(255,240,202,.6);box-shadow:0 0 4px 1px rgba(255,196,113,.34)}
@keyframes lamp-breath{from{opacity:.68;scale:.94}to{opacity:.92;scale:1.07}}
@media(max-width:650px){.lamp-breathe{width:clamp(20px,5.5vw,30px)}}
@media(prefers-reduced-motion:reduce){.lamp-breathe{animation:none;opacity:.78;scale:1}}
`;document.head.append(style);
const images=new Map();
function getImage(id){if(!images.has(id)){const im=new Image();im.src=`/assets/follow-the-spark/anime-scene-0${id}.webp`;images.set(id,im)}return images.get(id)}
function positionX(style){const val=style.backgroundPositionX||style.backgroundPosition.split(/\s+/)[0]||'50%';if(val==='left')return 0;if(val==='right')return 1;if(val==='center')return .5;const match=val.match(/-?\d+(?:\.\d+)?%/);return match?parseFloat(match[0])/100:.5}
for(const s of scenes){const art=document.querySelector('.art-'+s.key);if(!art)continue;const layer=document.createElement('div');layer.className='lamp-light-layer';layer.setAttribute('aria-hidden','true');art.insertAdjacentElement('afterend',layer);const img=getImage(s.id);function layout(){const rect=art.getBoundingClientRect();if(!rect.width||!rect.height||!img.naturalWidth)return;const iw=img.naturalWidth,ih=img.naturalHeight,ratio=rect.width/rect.height;let sx=0,sy=0,sw=iw,sh=ih;if(iw/ih>ratio){sw=ih*ratio;sx=(iw-sw)*positionX(getComputedStyle(art))}else{sh=iw/ratio;sy=(ih-sh)*.5}layer.replaceChildren();s.points.forEach(([x,y],n)=>{const px=(x*iw-sx)/sw*100,py=(y*ih-sy)/sh*100;if(px<0||px>100||py<0||py>100)return;const dot=document.createElement('i');dot.className='lamp-breathe';dot.style.left=px+'%';dot.style.top=py+'%';dot.style.animationDelay=(-n*.47)+'s';layer.append(dot)})}if(img.complete)layout();else img.addEventListener('load',layout,{once:true});new ResizeObserver(layout).observe(art);window.addEventListener('resize',layout,{passive:true})}
})();
