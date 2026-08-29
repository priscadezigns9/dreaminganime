/* Mimi's Anime Mascot — Dreaming Anime
   Self-contained chatbot widget. Reuses the site's existing brand tokens
   (da-style.css: --black #0A0A0A, --white, --orange #FF6B00, Bangers/Inter/
   Space Mono) and the existing Dreamer's Collection localStorage format
   (key: dreamers-collection-v1). Does not duplicate nav, logo, footer, or
   the existing float-stack (translate/back-to-top) — coexists with it.
*/
(function(){
'use strict';
if (document.getElementById('mimi-launcher')) return; // never double-init

var COLLECTION_KEY = 'dreamers-collection-v1';

/* ---------- Recommendation catalogue -------------------------------
   Every title here has a real review on the site (review/<slug>/) --
   confirmed against review/index.html before building this. Mood/genre
   tags are used only for matching within the quiz; they are not shown
   as unverified claims. Never add a title here that isn't a real,
   reviewed title on the site. */
var CATALOG = [
  { title:"Frieren: Beyond Journey's End", slug:"Frieren-Beyond-Journeys-End", moods:["emotional","fantasy"], world:["fantasy"], character:["quiet","group"], length:["long","complete"], values:["story","atmosphere","world"], warn:null },
  { title:"One Piece: Last Five Episodes", slug:"one-piece", moods:["action","fantasy"], world:["fantasy"], character:["fighter","group"], length:["long"], values:["story","characters","fight"], warn:null },
  { title:"Demon Slayer: Infinity Castle I", slug:"Demon-Slayer-Infinity-Castle", moods:["action","dark"], world:["fantasy","supernatural"], character:["fighter"], length:["series"], values:["animation","fight"], warn:"Frequent depicted violence." },
  { title:"Sword Art Online", slug:"Sword-Art-Online", moods:["action"], world:["scifi"], character:["fighter"], length:["series"], values:["world","romance"], warn:null },
  { title:"Re:Zero -Starting Life in Another World-", slug:"Re-Zero", moods:["dark","mystery"], world:["fantasy"], character:["antihero","quiet"], length:["long"], values:["story","characters"], warn:"Psychological distress, repeated character death." },
  { title:"Mushoku Tensei: Jobless Reincarnation", slug:"mushoku-tensei", moods:["fantasy","emotional"], world:["fantasy"], character:["antihero"], length:["long"], values:["story","world"], warn:"Mature themes; audience discretion advised." },
  { title:"No Game No Life", slug:"no-game-no-life", moods:["comedy","fantasy"], world:["fantasy"], character:["strategist","group"], length:["series"], values:["characters","story"], warn:null },
  { title:"Delicious in Dungeon", slug:"Delicious-in-Dungeon", moods:["comedy","fantasy"], world:["fantasy"], character:["group"], length:["series"], values:["characters","world"], warn:null },
  { title:"Blue Lock", slug:"Blue-Lock", moods:["intense"], world:["modern"], character:["antihero"], length:["long"], values:["characters","atmosphere"], warn:"Intense psychological rivalry." },
  { title:"Your Lie in April", slug:"Your-Lie-in-April", moods:["emotional","romantic"], world:["school","modern"], character:["quiet"], length:["series"], values:["music","story","characters"], warn:"Grief and loss themes." },
  { title:"A Silent Voice", slug:"A-Silent-Voice", moods:["emotional"], world:["school","modern"], character:["quiet"], length:["movie"], values:["story","characters"], warn:"Bullying, mental health themes." },
  { title:"Saga of Tanya the Evil", slug:"Saga-of-Tanya-the-Evil", moods:["dark","mystery"], world:["historical"], character:["antihero","strategist"], length:["series"], values:["story","world"], warn:"War violence." },
  { title:"My Deer Friend Nokotan", slug:"My-Deer-Friend-Nokotan", moods:["comedy"], world:["school"], character:["chaotic"], length:["series"], values:["characters"], warn:null },
  { title:"Kaiju Girl Caramelise", slug:"kaiju-girl-caramelise", moods:["comedy","romantic"], world:["school"], character:["quiet"], length:["series"], values:["characters","romance"], warn:null },
  { title:"From Old Country Bumpkin to Master Swordsman", slug:"from-old-country-bumpkin-to-master-swordsman", moods:["comedy","fantasy"], world:["fantasy"], character:["fighter"], length:["series"], values:["characters"], warn:null },
  { title:"Horizon in the Middle of Nowhere", slug:"Horizon-in-the-Middle-of-Nowhere", moods:["action","fantasy"], world:["postapoc","fantasy"], character:["fighter","group"], length:["series"], values:["world","fight"], warn:"Series-typical action violence." },
  { title:"Black Torch", slug:"Black-Torch", moods:["action"], world:["supernatural"], character:["fighter"], length:["series"], values:["fight","animation"], warn:null },
  { title:"Sentenced to Be a Hero", slug:"Sentenced-to-Be-a-Hero", moods:["dark","comedy"], world:["fantasy"], character:["antihero"], length:["series"], values:["story","characters"], warn:"Dark themes played for irony." },
  { title:"I Want to Love You Till Your Dying Day", slug:"I-Want-to-Love-You-Till-Your-Dying-Day", moods:["romantic","emotional"], world:["modern"], character:["quiet"], length:["series"], values:["romance","story"], warn:null }
];

var GENRE_PAGES = {
  "Action":"/genres/action.html","Classic":"/genres/classic.html","Comedy":"/genres/comedy.html",
  "Fantasy":"/genres/fantasy.html","Horror":"/genres/horror.html","Isekai":"/genres/isekai.html",
  "Mecha":"/genres/mecha.html","Romance":"/genres/romance.html","Sci-Fi":"/genres/sci-fi.html",
  "Shonen":"/genres/shonen.html","Slice of Life":"/genres/slice-of-life.html","Sports":"/genres/sports.html",
  "Thriller":"/genres/thriller.html"
};

var SITE_LINKS = {
  music:"/music/", shop:"/shop/", cinema:"/cinema/", manga:"/manga/",
  collection:"/dreamers-collection/", whereToWatch:"/where-to-watch/", reviews:"/review/",
  merch:"https://www.redbubble.com/people/dreaminganime/shop"
};

var SOCIALS = [
  { label:"Facebook", url:"https://www.facebook.com/dreaminganime9/" },
  { label:"Instagram", url:"https://instagram.com/dreaminganime2026" },
  { label:"Threads", url:"https://threads.net/@dreaminganime2026" },
  { label:"TikTok", url:"https://www.tiktok.com/@dreaminganime9" },
  { label:"YouTube", url:"https://www.youtube.com/@DreamingAnime9" }
];

window.__mimiCatalog = CATALOG; // exposed for debugging/testing only

/* ---------- Styles ---------------------------------------------------
   Colors/fonts pulled directly from da-style.css root tokens, not
   reinvented. Hard 3px black border + offset shadow matches .float-btn
   and .card treatment already used across the site. */
var css = ''
+ '#mimi-launcher{position:fixed;bottom:150px;right:24px;width:60px;height:60px;min-width:60px;min-height:60px;box-sizing:border-box;white-space:nowrap;border-radius:50%;'
+ 'background:var(--white,#FFF);border:3px solid var(--black,#0A0A0A);cursor:pointer;z-index:901;'
+ 'display:flex;align-items:center;justify-content:center;padding:0;'
+ 'box-shadow:3px 3px 0 var(--black,#0A0A0A);transition:transform .2s,box-shadow .2s;overflow:hidden;}'
+ '#mimi-launcher:hover,#mimi-launcher:focus-visible{transform:translateY(-3px);box-shadow:5px 5px 0 var(--black,#0A0A0A);}'
+ '#mimi-launcher img{width:100%;height:100%;object-fit:cover;}'
+ '#mimi-launcher .mimi-badge{position:absolute;top:-4px;right:-4px;background:var(--orange,#FF6B00);color:#fff;'
+ 'font:800 .62rem "Space Mono",monospace;width:20px;height:20px;border-radius:50%;border:2px solid var(--black,#0A0A0A);'
+ 'display:flex;align-items:center;justify-content:center;}'
+ '@media(max-width:600px){#mimi-launcher{bottom:206px;right:14px;width:52px;height:52px;min-width:52px;min-height:52px;box-shadow:2px 2px 0 var(--black,#0A0A0A);}}'

+ '#mimi-panel{position:fixed;z-index:902;background:var(--white,#FFF);border:3px solid var(--black,#0A0A0A);'
+ 'display:flex;flex-direction:column;overflow:hidden;opacity:0;pointer-events:none;'
+ 'transition:opacity .25s ease,transform .25s ease;font-family:Inter,Arial,sans-serif;}'
+ '#mimi-panel.open{opacity:1;pointer-events:all;}'
/* Desktop: right-side card */
+ '@media(min-width:601px){#mimi-panel{bottom:96px;right:96px;width:400px;height:min(640px,80vh);border-radius:20px;'
+ 'transform:translateY(16px) scale(.97);box-shadow:8px 8px 0 var(--black,#0A0A0A);}'
+ '#mimi-panel.open{transform:translateY(0) scale(1);}}'
/* Mobile: full-width bottom sheet */
+ '@media(max-width:600px){#mimi-panel{left:0;right:0;bottom:0;width:100%;height:min(82vh,640px);'
+ 'border-radius:20px 20px 0 0;border-width:3px 0 0 0;transform:translateY(100%);}'
+ '#mimi-panel.open{transform:translateY(0);}}'
+ '@media(prefers-reduced-motion:reduce){#mimi-panel,#mimi-launcher{transition:none!important;}}'

+ '#mimi-hdr{background:var(--black,#0A0A0A);color:#fff;padding:16px 18px;display:flex;align-items:center;gap:12px;flex-shrink:0;}'
+ '#mimi-hdr img{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid var(--orange,#FF6B00);}'
+ '#mimi-hdr-name{font-family:Bangers,cursive;font-size:1.3rem;letter-spacing:.03em;line-height:1;}'
+ '#mimi-hdr-sub{font:700 .62rem "Space Mono",monospace;color:var(--orange,#FF6B00);letter-spacing:.08em;margin-top:3px;}'
+ '#mimi-close{margin-left:auto;background:none;border:2px solid rgba(255,255,255,.25);color:#fff;width:32px;height:32px;min-width:0;'
+ 'border-radius:50%;cursor:pointer;font-size:16px;line-height:1;display:flex;align-items:center;justify-content:center;box-sizing:border-box;white-space:nowrap;}'
+ '#mimi-close:hover,#mimi-close:focus-visible{border-color:var(--orange,#FF6B00);color:var(--orange,#FF6B00);}'

+ '#mimi-body{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px;-webkit-overflow-scrolling:touch;}'
+ '.mimi-msg{max-width:86%;padding:12px 14px;border-radius:14px;font-size:.92rem;line-height:1.5;}'
+ '.mimi-msg.bot{background:var(--grey,#f5f5f5);color:var(--black,#0A0A0A);align-self:flex-start;border-bottom-left-radius:4px;}'
+ '.mimi-msg.usr{background:var(--orange,#FF6B00);color:#fff;align-self:flex-end;border-bottom-right-radius:4px;font-weight:600;}'
+ '.mimi-warn{font:700 .68rem "Space Mono",monospace;color:#a83232;background:#fdecec;border:1px solid #f2b8b8;'
+ 'padding:8px 10px;border-radius:8px;margin-top:8px;}'

+ '.mimi-opts{display:flex;flex-wrap:wrap;gap:8px;}'
+ '.mimi-opt{font:700 .78rem Inter,Arial,sans-serif;padding:10px 14px;min-height:44px;min-width:0;width:auto;white-space:normal;'
+ 'box-sizing:border-box;text-align:center;border:2px solid var(--black,#0A0A0A);'
+ 'background:#fff;color:var(--black,#0A0A0A);border-radius:24px;cursor:pointer;transition:all .15s;}'
+ '.mimi-opt:hover,.mimi-opt:focus-visible{background:var(--orange,#FF6B00);color:#fff;border-color:var(--orange,#FF6B00);}'
+ '.mimi-opt:focus-visible{outline:3px solid var(--orange,#FF6B00);outline-offset:2px;}'

+ '.mimi-card{border:3px solid var(--black,#0A0A0A);border-radius:14px;padding:16px;background:#fff;box-shadow:4px 4px 0 var(--black,#0A0A0A);}'
+ '.mimi-card h3{font-family:Bangers,cursive;font-size:1.3rem;letter-spacing:.02em;margin:0 0 6px;color:var(--black,#0A0A0A);}'
+ '.mimi-card p{font-size:.86rem;color:#444;margin:0 0 10px;line-height:1.5;}'
+ '.mimi-card .mimi-tags{font:700 .62rem "Space Mono",monospace;color:var(--orange,#FF6B00);letter-spacing:.06em;margin-bottom:10px;text-transform:uppercase;}'
+ '.mimi-card .mimi-actions{display:flex;flex-wrap:wrap;gap:8px;}'
+ '.mimi-card .mimi-actions a,.mimi-card .mimi-actions button{font:700 .72rem "Space Mono",monospace;padding:9px 12px;min-height:40px;min-width:0;'
+ 'width:auto;white-space:normal;box-sizing:border-box;'
+ 'border:2px solid var(--black,#0A0A0A);background:#fff;color:var(--black,#0A0A0A);border-radius:20px;cursor:pointer;'
+ 'text-decoration:none;display:inline-flex;align-items:center;letter-spacing:.03em;}'
+ '.mimi-card .mimi-actions a:hover,.mimi-card .mimi-actions button:hover,'
+ '.mimi-card .mimi-actions a:focus-visible,.mimi-card .mimi-actions button:focus-visible{background:var(--orange,#FF6B00);color:#fff;border-color:var(--orange,#FF6B00);}'

+ '#mimi-typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:var(--grey,#f5f5f5);border-radius:14px;border-bottom-left-radius:4px;}'
+ '#mimi-typing span{width:6px;height:6px;border-radius:50%;background:#999;animation:mimiBlink 1.2s infinite;}'
+ '#mimi-typing span:nth-child(2){animation-delay:.2s}#mimi-typing span:nth-child(3){animation-delay:.4s}'
+ '@keyframes mimiBlink{0%,80%,100%{opacity:.3}40%{opacity:1}}'
+ '@media(prefers-reduced-motion:reduce){#mimi-typing span{animation:none;opacity:.7;}}';

var styleTag = document.createElement('style');
styleTag.id = 'mimi-style';
styleTag.textContent = css;
document.head.appendChild(styleTag);

/* ---------- Markup ---------------------------------------------------- */
var MIMI_AVATAR = '/logos/dreaming-anime-logo-round.png';

var launcher = document.createElement('button');
launcher.id = 'mimi-launcher';
launcher.type = 'button';
launcher.setAttribute('aria-label', "Open Mimi, Dreaming Anime's Mascot");
launcher.setAttribute('aria-expanded', 'false');
launcher.innerHTML = '<img src="' + MIMI_AVATAR + '" alt="" onerror="this.style.display=\'none\'">'
  + '<span class="mimi-badge" aria-hidden="true">?</span>';
document.body.appendChild(launcher);

var panel = document.createElement('div');
panel.id = 'mimi-panel';
panel.setAttribute('role', 'dialog');
panel.setAttribute('aria-modal', 'false');
panel.setAttribute('aria-label', "Mimi, Dreaming Anime's Mascot");
panel.innerHTML =
  '<div id="mimi-hdr">'
  + '<img src="' + MIMI_AVATAR + '" alt="" onerror="this.style.display=\'none\'">'
  + '<div><div id="mimi-hdr-name">MIMI</div><div id="mimi-hdr-sub">ANIME MASCOT</div></div>'
  + '<button id="mimi-close" type="button" aria-label="Close chat">&#10005;</button>'
  + '</div>'
  + '<div id="mimi-body" aria-live="polite"></div>'
  + '<div id="mimi-input-row" style="display:flex;gap:8px;padding:12px;border-top:2px solid var(--grey,#f5f5f5);flex-shrink:0;">'
  + '<input id="mimi-input" type="text" placeholder="Ask Mimi anything..." '
  + 'style="flex:1;min-width:0;border:2px solid var(--black,#0A0A0A);border-radius:22px;padding:10px 14px;font:0.88rem Inter,Arial,sans-serif;outline:none;">'
  + '<button id="mimi-send" type="button" aria-label="Send message" '
  + 'style="width:44px;height:44px;min-width:44px;min-height:44px;flex-shrink:0;border-radius:50%;border:2px solid var(--black,#0A0A0A);background:var(--orange,#FF6B00);color:#fff;cursor:pointer;font-size:16px;box-sizing:border-box;white-space:nowrap;">&#8593;</button>'
  + '</div>';
document.body.appendChild(panel);

var mimiOpen = false;
function toggleMimi(forceState){
  mimiOpen = (typeof forceState === 'boolean') ? forceState : !mimiOpen;
  panel.classList.toggle('open', mimiOpen);
  launcher.setAttribute('aria-expanded', String(mimiOpen));
  if (mimiOpen) {
    if (!bodyEl.children.length) go('start');
    var inp = document.getElementById('mimi-input');
    setTimeout(function(){ if (inp) inp.focus(); }, 300);
  }
}
launcher.addEventListener('click', function(){ toggleMimi(); });
document.getElementById('mimi-close').addEventListener('click', function(){ toggleMimi(false); });
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' && mimiOpen) toggleMimi(false);
});

var bodyEl = document.getElementById('mimi-body');

/* ---------- Message rendering ------------------------------------------ */
function scrollToNew(el){
  el.scrollIntoView({ block:'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
function addMsg(text, side){
  var d = document.createElement('div');
  d.className = 'mimi-msg ' + side;
  d.textContent = text;
  bodyEl.appendChild(d);
  if (side === 'bot') scrollToNew(d); else bodyEl.scrollTop = bodyEl.scrollHeight;
  return d;
}
function addOptions(options){
  var wrap = document.createElement('div');
  wrap.className = 'mimi-opts';
  options.forEach(function(opt){
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'mimi-opt';
    b.textContent = opt.label;
    b.addEventListener('click', function(){ handleChoice(opt); });
    wrap.appendChild(b);
  });
  bodyEl.appendChild(wrap);
  scrollToNew(wrap);
}
function showTyping(cb, delay){
  var t = document.createElement('div');
  t.id = 'mimi-typing';
  t.innerHTML = '<span></span><span></span><span></span>';
  bodyEl.appendChild(t);
  scrollToNew(t);
  setTimeout(function(){
    if (t.parentNode) t.parentNode.removeChild(t);
    cb();
  }, delay || 500);
}

/* ---------- Conversation state ----------------------------------------- */
var quizAnswers = {};

function handleChoice(opt){
  addMsg(opt.label, 'usr');
  clearOptions();
  showTyping(function(){ opt.action(); });
}
function clearOptions(){
  var opts = bodyEl.querySelectorAll('.mimi-opts');
  opts.forEach(function(o){ o.remove(); });
}

function go(step){
  STEPS[step]();
}

/* ---------- Steps -------------------------------------------------------
   Mirrors the spec's quick_actions and recommendation_questions exactly. */
var STEPS = {

  start: function(){
    addMsg("Welcome to Dreaming Anime — I'm Mimi, your anime mascot. I can help you find your next anime, explore reviews, discover anime music, locate legal streaming options, find merch, or build your personal watchlist.", 'bot');
    addOptions([
      { label:'Recommend an anime', action:function(){ quizAnswers = {}; go('q_mood'); } },
      { label:'Take the Anime Quiz', action:function(){ quizAnswers = {}; go('q_mood'); } },
      { label:'Find where to watch', action:function(){ go('whereToWatch'); } },
      { label:'Explore genres', action:function(){ go('genreMenu'); } },
      { label:'Discover anime music', action:function(){ go('music'); } },
      { label:'Find anime merch', action:function(){ go('merch'); } },
      { label:'Visit the Shop', action:function(){ go('shop'); } },
      { label:"Open Dreamer's Collection", action:function(){ go('collection'); } },
      { label:'Follow us', action:function(){ go('socials'); } },
      { label:'Anime cons & comic cons', action:function(){ go('events'); } }
    ]);
  },

  /* --- Recommendation quiz: 6 fixed questions + 1 optional free-text --- */
  q_mood: function(){
    addMsg('What mood are you in tonight?', 'bot');
    addOptions([
      { label:'Action & battles', action:function(){ quizAnswers.mood='action'; go('q_world'); } },
      { label:'Emotion & relationships', action:function(){ quizAnswers.mood='emotional'; go('q_world'); } },
      { label:'Mystery & suspense', action:function(){ quizAnswers.mood='mystery'; go('q_world'); } },
      { label:'Comedy & chaos', action:function(){ quizAnswers.mood='comedy'; go('q_world'); } },
      { label:'Epic fantasy', action:function(){ quizAnswers.mood='fantasy'; go('q_world'); } },
      { label:'Dark & intense', action:function(){ quizAnswers.mood='dark'; go('q_world'); } },
      { label:'Romantic', action:function(){ quizAnswers.mood='romantic'; go('q_world'); } }
    ]);
  },
  q_world: function(){
    addMsg('What kind of world do you want?', 'bot');
    addOptions([
      { label:'Fantasy', action:function(){ quizAnswers.world='fantasy'; go('q_character'); } },
      { label:'Modern city', action:function(){ quizAnswers.world='modern'; go('q_character'); } },
      { label:'Sci-fi', action:function(){ quizAnswers.world='scifi'; go('q_character'); } },
      { label:'Historical', action:function(){ quizAnswers.world='historical'; go('q_character'); } },
      { label:'School', action:function(){ quizAnswers.world='school'; go('q_character'); } },
      { label:'Supernatural', action:function(){ quizAnswers.world='supernatural'; go('q_character'); } },
      { label:'Post-apocalyptic', action:function(){ quizAnswers.world='postapoc'; go('q_character'); } }
    ]);
  },
  q_character: function(){
    addMsg('What type of main character do you prefer?', 'bot');
    addOptions([
      { label:'A determined fighter', action:function(){ quizAnswers.character='fighter'; go('q_length'); } },
      { label:'A clever strategist', action:function(){ quizAnswers.character='strategist'; go('q_length'); } },
      { label:'A quiet character with hidden depth', action:function(){ quizAnswers.character='quiet'; go('q_length'); } },
      { label:'A chaotic troublemaker', action:function(){ quizAnswers.character='chaotic'; go('q_length'); } },
      { label:'A morally complicated antihero', action:function(){ quizAnswers.character='antihero'; go('q_length'); } },
      { label:'A group of friends who grow together', action:function(){ quizAnswers.character='group'; go('q_length'); } }
    ]);
  },
  q_length: function(){
    addMsg('How much time do you want to invest?', 'bot');
    addOptions([
      { label:'A movie', action:function(){ quizAnswers.length='movie'; go('q_values'); } },
      { label:'A short series', action:function(){ quizAnswers.length='series'; go('q_values'); } },
      { label:'A complete series', action:function(){ quizAnswers.length='complete'; go('q_values'); } },
      { label:'A long journey', action:function(){ quizAnswers.length='long'; go('q_values'); } }
    ]);
  },
  q_values: function(){
    addMsg('What matters most to you?', 'bot');
    addOptions([
      { label:'Story', action:function(){ quizAnswers.values='story'; go('q_subdub'); } },
      { label:'Characters', action:function(){ quizAnswers.values='characters'; go('q_subdub'); } },
      { label:'Animation', action:function(){ quizAnswers.values='animation'; go('q_subdub'); } },
      { label:'Fight scenes', action:function(){ quizAnswers.values='fight'; go('q_subdub'); } },
      { label:'Music', action:function(){ quizAnswers.values='music'; go('q_subdub'); } },
      { label:'Romance', action:function(){ quizAnswers.values='romance'; go('q_subdub'); } },
      { label:'World-building', action:function(){ quizAnswers.values='world'; go('q_subdub'); } },
      { label:'Atmosphere', action:function(){ quizAnswers.values='atmosphere'; go('q_subdub'); } }
    ]);
  },
  q_subdub: function(){
    addMsg('Do you prefer subtitles, an English dub, or either?', 'bot');
    addOptions([
      { label:'Subtitles', action:function(){ quizAnswers.subdub='sub'; go('recommend'); } },
      { label:'English dub', action:function(){ quizAnswers.subdub='dub'; go('recommend'); } },
      { label:'Either is fine', action:function(){ quizAnswers.subdub='either'; go('recommend'); } }
    ]);
  },

  recommend: function(){
    var pick = matchAnime(quizAnswers);
    renderRecommendation(pick);
  },

  seeSimilar: function(){
    var pick = matchAnime(quizAnswers, lastRecommended);
    renderRecommendation(pick);
  },

  whereToWatch: function(){
    addMsg("I can point you to our legal streaming guide, which covers where each title is officially available. I don't track real-time availability myself, so always check the guide for the latest, verified info.", 'bot');
    addOptions([
      { label:'Open streaming guide', action:function(){ window.open(SITE_LINKS.whereToWatch, '_blank'); go('afterAction'); } },
      { label:'Back to menu', action:function(){ go('start'); } }
    ]);
  },

  genreMenu: function(){
    addMsg('Which genre are you in the mood to explore?', 'bot');
    var opts = Object.keys(GENRE_PAGES).map(function(name){
      return { label:name, action:function(){ window.open(GENRE_PAGES[name], '_blank'); go('afterAction'); } };
    });
    opts.push({ label:'Back to menu', action:function(){ go('start'); } });
    addOptions(opts);
  },

  music: function(){
    addMsg('The Music Vault has openings, endings, soundtracks, and artist spotlights — a great way to discover anime through its sound.', 'bot');
    addOptions([
      { label:'Open Music Vault', action:function(){ window.open(SITE_LINKS.music, '_blank'); go('afterAction'); } },
      { label:'Back to menu', action:function(){ go('start'); } }
    ]);
  },

  merch: function(){
    addMsg("Official Dreaming Anime designs — apparel, prints, and lifestyle pieces — are available through our Redbubble store.", 'bot');
    addOptions([
      { label:'Open Merch Store', action:function(){ window.open(SITE_LINKS.merch, '_blank'); go('afterAction'); } },
      { label:'Back to menu', action:function(){ go('start'); } }
    ]);
  },

  shop: function(){
    addMsg('Figures, manga, posters, and collectibles all live in the Shop.', 'bot');
    addOptions([
      { label:'Open Shop', action:function(){ window.open(SITE_LINKS.shop, '_blank'); go('afterAction'); } },
      { label:'Back to menu', action:function(){ go('start'); } }
    ]);
  },

  socials: function(){
    addMsg("Follow Dreaming Anime for updates, drops, and community posts:", 'bot');
    var opts = SOCIALS.map(function(s){
      return { label:s.label, action:function(){ window.open(s.url, '_blank'); go('afterAction'); } };
    });
    opts.push({ label:'Back to menu', action:function(){ go('start'); } });
    addOptions(opts);
  },

  events: function(){
    addMsg("We've covered conventions on the ground — Anime Expo 2026 and FanimeCon 2026 are both in the Log. For the wider 2026 con calendar, here's what's confirmed as of our last update: Anime Boston (Apr 3\u20135), Anime Expo \u2014 the biggest in North America (Jul 2\u20135, LA), New York Comic Con (Oct 8\u201311), and LA Comic Con (Oct 30\u2013Nov 1). Dates can shift, so always confirm with the official con site before booking travel.", 'bot');
    addOptions([
      { label:'Read our con coverage', action:function(){ window.open('/blog/anime-expo-2026-day-one-signals.html', '_blank'); go('afterAction'); } },
      { label:'Full 2026 con directory', action:function(){ window.open('https://animecons.com/events/schedule.php?year=2026&loc=us', '_blank'); go('afterAction'); } },
      { label:'Back to menu', action:function(){ go('start'); } }
    ]);
  },

  collection: function(){
    var items = getCollection();
    addMsg("Dreamer's Collection is your personal anime shelf — saved right on this device, no account needed. You currently have " + items.length + (items.length === 1 ? ' title' : ' titles') + ' saved.', 'bot');
    addOptions([
      { label:'Open my Collection', action:function(){ window.open(SITE_LINKS.collection, '_blank'); go('afterAction'); } },
      { label:'Get a recommendation to add', action:function(){ quizAnswers = {}; go('q_mood'); } },
      { label:'Back to menu', action:function(){ go('start'); } }
    ]);
  },

  afterAction: function(){
    addMsg('Anything else I can help with?', 'bot');
    addOptions([
      { label:'Recommend an anime', action:function(){ quizAnswers = {}; go('q_mood'); } },
      { label:'Start over', action:function(){ go('start'); } }
    ]);
  }
};

/* ---------- Recommendation matching -------------------------------------
   Simple weighted-overlap scorer against the curated CATALOG. Never
   invents a title -- always returns a real, reviewed entry. */
var lastRecommended = null;

function matchAnime(answers, exclude){
  var scored = CATALOG.map(function(a){
    var score = 0;
    if (answers.mood && a.moods.indexOf(answers.mood) > -1) score += 3;
    if (answers.world && a.world.indexOf(answers.world) > -1) score += 2;
    if (answers.character && a.character.indexOf(answers.character) > -1) score += 2;
    if (answers.values && a.values.indexOf(answers.values) > -1) score += 2;
    if (answers.length === 'movie' && a.length.indexOf('movie') > -1) score += 2;
    if (answers.length === 'long' && a.length.indexOf('long') > -1) score += 1;
    if (exclude && a.title === exclude.title) score -= 100;
    return { anime:a, score:score };
  });
  scored.sort(function(x,y){ return y.score - x.score; });
  // small randomised pick among the top matches so repeat quizzes don't
  // always return the exact same title
  var top = scored.filter(function(s){ return s.score >= scored[0].score - 1 && s.score > -50; }).slice(0, 4);
  var pick = top.length ? top[Math.floor(Math.random() * top.length)].anime : CATALOG[0];
  lastRecommended = pick;
  return pick;
}

function reasonFor(a, answers){
  var bits = [];
  if (answers.mood && a.moods.indexOf(answers.mood) > -1) bits.push('matches the ' + answers.mood + ' mood you\'re after');
  if (answers.character && a.character.indexOf(answers.character) > -1) bits.push('the lead is exactly the ' + answers.character + '-type you like');
  if (answers.values && a.values.indexOf(answers.values) > -1) bits.push('it leans hard into ' + answers.values);
  if (!bits.length) bits.push("it's a genuinely well-loved title on Dreaming Anime");
  return 'Recommended because ' + bits.slice(0,2).join(' and ') + '.';
}

function renderRecommendation(pick){
  var card = document.createElement('div');
  card.className = 'mimi-card';
  var reviewUrl = SITE_LINKS.reviews + pick.slug + '/';
  card.innerHTML =
    '<h3></h3>'
    + '<div class="mimi-tags"></div>'
    + '<p></p>'
    + (pick.warn ? '<div class="mimi-warn"></div>' : '')
    + '<div class="mimi-actions">'
    + '<a href="' + reviewUrl + '" target="_blank" rel="noopener">Read the review</a>'
    + '<a href="' + SITE_LINKS.whereToWatch + '" target="_blank" rel="noopener">Watch legally</a>'
    + '<button type="button" data-act="add">Add to Collection</button>'
    + '<button type="button" data-act="similar">See similar</button>'
    + '<button type="button" data-act="restart">Start over</button>'
    + '</div>';
  card.querySelector('h3').textContent = pick.title;
  card.querySelector('.mimi-tags').textContent = [pick.moods[0], pick.world[0]].filter(Boolean).join(' \u00b7 ');
  card.querySelector('p').textContent = reasonFor(pick, quizAnswers);
  if (pick.warn) card.querySelector('.mimi-warn').textContent = '\u26a0 ' + pick.warn;

  card.querySelector('[data-act="add"]').addEventListener('click', function(){
    addToCollection(pick.title);
    this.textContent = 'Added \u2713';
    this.disabled = true;
  });
  card.querySelector('[data-act="similar"]').addEventListener('click', function(){ go('seeSimilar'); });
  card.querySelector('[data-act="restart"]').addEventListener('click', function(){ go('start'); });

  bodyEl.appendChild(card);
  scrollToNew(card);

  addOptions([
    { label:'See another option', action:function(){ go('seeSimilar'); } },
    { label:'Start over', action:function(){ go('start'); } }
  ]);
}

/* ---------- Dreamer's Collection integration -----------------------------
   Reads/writes the EXACT same localStorage key and object shape used by
   /dreamers-collection/index.html, so entries added here show up there
   and vice versa. */
function getCollection(){
  try { return JSON.parse(localStorage.getItem(COLLECTION_KEY) || '[]'); }
  catch(e){ return []; }
}
function addToCollection(title){
  var items = getCollection();
  items.unshift({ title:title, status:'Want to watch', rating:'0', note:'Added via Mimi, Dreaming Anime\'s Mascot' });
  try { localStorage.setItem(COLLECTION_KEY, JSON.stringify(items)); } catch(e){}
}

/* ---------- Free-text input ---------------------------------------------
   No external AI call -- kept local and lightweight per spec. Handles the
   optional "three anime you enjoyed" style input and general free text by
   doing a light keyword match against the catalogue and site sections,
   then falling back to the guided menu rather than guessing. */
function handleFreeText(raw){
  var text = raw.trim();
  if (!text) return;
  addMsg(text, 'usr');
  showTyping(function(){
    var lower = text.toLowerCase();
    // Title matching first (whole-word boundaries, min length 4) -- a
    // specific title mention is a stronger signal than a generic keyword
    // that might appear incidentally in the same sentence (e.g. "what
    // else should I watch" contains "watch" but is really a title query).
    var titleHit = CATALOG.filter(function(a){
      var prefix = a.title.toLowerCase().split(':')[0].trim();
      if (prefix.length < 4) return false;
      var re = new RegExp('\\b' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      return re.test(lower);
    });
    if (titleHit.length) {
      quizAnswers.mood = quizAnswers.mood || titleHit[0].moods[0];
      addMsg("Good taste \u2014 based on " + titleHit[0].title + ", here's something in a similar vein.", 'bot');
      renderRecommendation(matchAnime(quizAnswers, titleHit[0]));
      return;
    }
    if (/watch|stream|where/.test(lower)) { go('whereToWatch'); return; }
    if (/music|opening|ending|soundtrack/.test(lower)) { go('music'); return; }
    if (/merch/.test(lower)) { go('merch'); return; }
    if (/shop|figure|buy/.test(lower)) { go('shop'); return; }
    if (/social|follow|facebook|instagram|tiktok|threads|youtube/.test(lower)) { go('socials'); return; }
    if (/\bcon\b|convention|comic con|anime expo|cosplay event/.test(lower)) { go('events'); return; }
    if (/collection|watchlist|shelf/.test(lower)) { go('collection'); return; }
    if (/recommend|suggest|quiz/.test(lower)) { quizAnswers = {}; go('q_mood'); return; }
    addMsg("I'm not sure I caught that \u2014 I'm best with guided questions rather than open chat. Let's find you something great.", 'bot');
    addOptions([
      { label:'Recommend an anime', action:function(){ quizAnswers = {}; go('q_mood'); } },
      { label:'Back to menu', action:function(){ go('start'); } }
    ]);
  }, 450);
}

var inputEl = document.getElementById('mimi-input');
var sendBtn = document.getElementById('mimi-send');
sendBtn.addEventListener('click', function(){
  var v = inputEl.value; inputEl.value = ''; handleFreeText(v);
});
inputEl.addEventListener('keydown', function(e){
  if (e.key === 'Enter') { e.preventDefault(); var v = inputEl.value; inputEl.value = ''; handleFreeText(v); }
});

})();




