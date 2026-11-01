(()=>{'use strict';
const scenes=[
 {key:'one',id:1,points:[[.038,.218,1],[.488,.938,.9]]},
 {key:'two',id:2,points:[[.91,.395,.8],[.11,.405,.75],[.19,.485,.68],[.43,.605,.62],[.56,.61,.62],[.70,.61,.62]]},
 {key:'three',id:3,points:[[.035,.445,.8],[.205,.505,.72],[.375,.535,.65],[.62,.57,.62],[.84,.58,.6]]},
 {key:'four',id:4,points:[[.018,.495,.75],[.20,.54,.72],[.34,.555,.72],[.48,.58,.72],[.62,.605,.72],[.77,.61,.72],[.92,.585,.72]]},
 {key:'five',id:5,points:[[.027,.225,.9],[.145,.267,.82],[.30,.46,.7],[.49,.63,.65],[.64,.70,.68],[.96,.64,.86]]}
];
const style=document.createElement('style');style.textContent=`
.da-lantern-layer{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden}
.da-lantern-glow{position:absolute;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(255,204,122,.34) 0,rgba(255,161,57,.32) 19%,rgba(255,127,37,.14) 43%,rgba(255,100,35,0) 72%);mix-blend-mode:screen;animation:daLanternFlicker 2.7s ease-in-out infinite alternate}
@keyframes daLanternFlicker{0%,100%{opacity:.46;transform:translate(-50%,-50%) scale(.95)}38%{opacity:.66}52%{opacity:.52}75%{opacity:.74}to{opacity:.62;transform:translate(-50%,-50%) scale(1.04)}}
@media(prefers-reduced-motion:reduce){.da-lantern-glow{animation:none;opacity:.56}}
`;
document.head.append(style);
const imageCache=new Map();function sceneImage(id){if(!imageCache.has(id)){const image=new Image();image.src=`/assets/follow-the-spark/anime-scene-0${id}.webp`;imageCache.set(id,image)}return image}
function percent(v,fallback){if(!v)return fallback;if(v==='left'||v==='top')return 0;if(v==='center')return .5;if(v==='right'||v==='bottom')return 1;const m=v.match(/-?\d+(?:\.\d+)?%/);return m?parseFloat(m[0])/100:fallback}
for(const scene of scenes){const art=document.querySelector('.art-'+scene.key);if(!art)continue;const world=art.parentElement;if(!world)continue;let layer=world.querySelector(':scope > .da-lantern-layer');if(!layer){layer=document.createElement('div');layer.className='da-lantern-layer';layer.setAttribute('aria-hidden','true');const flow=world.querySelector('.painted-water-flow');if(flow)flow.insertAdjacentElement('afterend',layer);else art.insertAdjacentElement('afterend',layer)}const image=sceneImage(scene.id);
 function layout(){const a=art.getBoundingClientRect(),w=world.getBoundingClientRect();if(!a.width||!a.height||!image.naturalWidth)return;const css=getComputedStyle(art),iw=image.naturalWidth,ih=image.naturalHeight,parts=css.backgroundSize.split(',')[0].trim().split(/\s+/);let bw,bh;if(parts.length>1&&parts[1].endsWith('%')){bh=a.height*parseFloat(parts[1])/100;bw=iw*bh/ih}else if(parts[0]==='cover'){const z=Math.max(a.width/iw,a.height/ih);bw=iw*z;bh=ih*z}else if(parts[0]==='contain'){const z=Math.min(a.width/iw,a.height/ih);bw=iw*z;bh=ih*z}else{bh=a.height;bw=iw*bh/ih}const bg=css.backgroundPosition.split(',')[0].trim().split(/\s+/),px=percent(css.backgroundPositionX||bg[0],.5),py=percent(css.backgroundPositionY||bg[1],.5),ox=(a.width-bw)*px,oy=(a.height-bh)*py,originX=a.left-w.left,originY=a.top-w.top;for(const [sx,sy,size] of scene.points){const x=sx*bw+ox,y=sy*bh+oy;if(x<0||x>a.width||y<0||y>a.height)continue;const glow=document.createElement('i');glow.className='da-lantern-glow';glow.style.left=(originX+x)+'px';glow.style.top=(originY+y)+'px';glow.style.width=`clamp(22px,${3.3*size}vw,${46*size}px)`;glow.style.animationDelay=(-Math.random()*2.7)+'s';layer.append(glow)}}
 if(image.complete)layout();else image.addEventListener('load',layout,{once:true});new ResizeObserver(layout).observe(art);new ResizeObserver(layout).observe(world);window.addEventListener('resize',layout,{passive:true});
}
})();
