(()=>{'use strict';
const scenes=[
 {key:'one',id:1,points:[[.058,.205],[.49,.90]]},
 {key:'two',id:2,points:[[.085,.43],[.20,.43],[.35,.46],[.84,.39],[.93,.57]]},
 {key:'three',id:3,points:[[.035,.49],[.19,.47],[.31,.46],[.48,.47],[.72,.53]]},
 {key:'four',id:4,points:[[.035,.50],[.15,.51],[.29,.54],[.43,.57],[.58,.58],[.73,.57],[.89,.55]]},
 {key:'five',id:5,points:[[.025,.34],[.13,.44],[.30,.70],[.45,.83],[.61,.80],[.95,.60]]}
];
const style=document.createElement('style');style.textContent=`
.lamp-light-layer{position:absolute;z-index:3;pointer-events:none;overflow:hidden}
.lamp-breathe{position:absolute;width:clamp(20px,2.3vw,32px);height:clamp(20px,2.3vw,32px);transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,247,216,.42) 0 8%,rgba(255,215,141,.28) 18%,rgba(255,157,74,.10) 42%,transparent 72%);filter:drop-shadow(0 0 3px rgba(255,178,92,.22));animation:lamp-breath 3.8s ease-in-out infinite alternate}
.lamp-breathe::after{content:"";position:absolute;inset:38%;border-radius:50%;background:rgba(255,239,197,.5);box-shadow:0 0 3px 1px rgba(255,192,105,.28)}
@keyframes lamp-breath{from{opacity:.66;scale:.94}to{opacity:.88;scale:1.06}}
@media(max-width:650px){.lamp-breathe{width:22px;height:22px}}
@media(prefers-reduced-motion:reduce){.lamp-breathe{animation:none;opacity:.78;scale:1}}
`;document.head.append(style);
const images=new Map();
function imageFor(id){if(!images.has(id)){const image=new Image();image.src=`/assets/follow-the-spark/anime-scene-0${id}.webp`;images.set(id,image)}return images.get(id)}
function positionFraction(value,fallback){if(!value)return fallback;if(value==='left'||value==='top')return 0;if(value==='center')return .5;if(value==='right'||value==='bottom')return 1;const m=value.match(/-?\d+(?:\.\d+)?%/);return m?parseFloat(m[0])/100:fallback}
for(const scene of scenes){const art=document.querySelector('.art-'+scene.key);if(!art)continue;const world=art.parentElement;if(!world)continue;const layer=document.createElement('div');layer.className='lamp-light-layer';layer.setAttribute('aria-hidden','true');art.insertAdjacentElement('afterend',layer);const image=imageFor(scene.id);
 function layout(){const a=art.getBoundingClientRect(),w=world.getBoundingClientRect();if(!a.width||!a.height||!image.naturalWidth)return;layer.style.left=(a.left-w.left+world.scrollLeft)+'px';layer.style.top=(a.top-w.top+world.scrollTop)+'px';layer.style.width=a.width+'px';layer.style.height=a.height+'px';const style=getComputedStyle(art),iw=image.naturalWidth,ih=image.naturalHeight,ss=style.backgroundSize.split(',')[0].trim(),parts=ss.split(/\s+/);let bw,bh;if(ss==='cover'){const scale=Math.max(a.width/iw,a.height/ih);bw=iw*scale;bh=ih*scale}else if(ss==='contain'){const scale=Math.min(a.width/iw,a.height/ih);bw=iw*scale;bh=ih*scale}else if(parts.length>1&&parts[1].endsWith('%')){bh=a.height*parseFloat(parts[1])/100;bw=iw*bh/ih}else if(parts[0]==='auto'||parts.length===1&&parts[0].endsWith('%')){bh=a.height;bw=iw*bh/ih}else{bw=a.width;bh=bw*ih/iw}const bg=style.backgroundPosition.split(',')[0].trim().split(/\s+/);const px=positionFraction(style.backgroundPositionX||bg[0],.5),py=positionFraction(style.backgroundPositionY||bg[1],0);const ox=(a.width-bw)*px,oy=(a.height-bh)*py;layer.replaceChildren();for(const [x,y] of scene.points){const sx=x*bw+ox,sy=y*bh+oy;if(sx<0||sx>a.width||sy<0||sy>a.height)continue;const dot=document.createElement('i');dot.className='lamp-breathe';dot.style.left=sx+'px';dot.style.top=sy+'px';layer.append(dot)}}
 if(image.complete)layout();else image.addEventListener('load',layout,{once:true});new ResizeObserver(layout).observe(art);new ResizeObserver(layout).observe(world);window.addEventListener('resize',layout,{passive:true});
}
})();
