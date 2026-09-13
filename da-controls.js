/* [Zapia] Shared Dreaming Anime page controls — mirrors the homepage translator and back-to-top implementation. */
(function () {
  'use strict';

  var controlCSS = '.logo{font-family:Bangers,cursive!important;font-size:1.15rem!important;letter-spacing:.06em!important}.da-brand-logo{width:48px;height:48px;border-radius:50%;object-fit:cover;display:inline-block;vertical-align:middle;margin-right:12px;border:2px solid #FF6B00}.da-brand-lockup{display:inline-flex;align-items:center}' + '.float-stack{position:fixed;bottom:28px;right:24px;display:flex;flex-direction:column;gap:12px;z-index:900;align-items:center}.float-btn{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;border:2px solid #0A0A0A;transition:transform .2s,box-shadow .2s;font-size:22px;box-shadow:3px 3px 0 #0A0A0A}.float-btn:hover{transform:translateY(-3px);box-shadow:5px 5px 0 #0A0A0A}.float-top{background:#FF6B00;color:#FFF;font-family:Bangers,cursive;font-size:20px;cursor:pointer}.float-translate{background:#FFF;border-radius:24px;padding:0 16px;height:38px;width:auto;font-family:"Space Mono",monospace;font-size:10px;font-weight:700;color:#0A0A0A;letter-spacing:.06em;white-space:nowrap;cursor:pointer}@media(max-width:600px){.float-stack{right:14px;bottom:88px;gap:8px}.float-translate{font-size:9px;padding:0 12px}.float-btn{box-shadow:2px 2px 0 #0A0A0A}}';
  function addBrandLogo() { var host=document.querySelector('.nav, nav, .navbar, header'); if(!host || host.querySelector(".da-brand-logo, img[src*=\"logo-round\"], img[src*=\"dreaming-anime-logo\"], img[alt*=\"Dreaming Anime\"]")) return; var img=document.createElement('img'); img.className='da-brand-logo'; img.src='/logos/dreaming-anime-logo-round.png'; img.alt='Dreaming Anime'; var first=host.querySelector('a, .logo'); if(first){ first.parentNode.insertBefore(img,first); } else { host.insertBefore(img,host.firstChild); } }
  function init() {
    addBrandLogo();
    if (!document.getElementById('da-shared-controls-style')) {
      var style = document.createElement('style');
      style.id = 'da-shared-controls-style';
      style.textContent = controlCSS;
      document.head.appendChild(style);
    }

    /* The homepage already owns these nodes; never create a duplicate. */
    if (!document.getElementById('backToTop') && !document.querySelector('.float-stack')) {
      var stack = document.createElement('div');
      stack.className = 'float-stack';
      stack.innerHTML = '<div class="float-btn float-translate" id="translateBtn" title="Translate page" role="button" tabindex="0" aria-label="Translate">🌐 TRANSLATE</div>' +
        '<div class="float-btn float-top" id="backToTop" title="Back to top" role="button" tabindex="0" aria-label="Back to top">↑</div>';
      document.body.appendChild(stack);
      var target = document.createElement('div');
      target.id = 'google_translate_element';
      target.style.display = 'none';
      document.body.appendChild(target);
    }

    var topBtn = document.getElementById('backToTop');
    if (topBtn && !topBtn.dataset.daBound) {
      topBtn.dataset.daBound = 'true';
      var goTop = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
      topBtn.addEventListener('click', goTop);
      topBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTop(); }
      });
    }

    var translateBtn = document.getElementById('translateBtn');
    if (translateBtn && !translateBtn.dataset.daBound) {
      translateBtn.dataset.daBound = 'true';
      var loaded = false;
      var loadTranslate = function () {
        if (!loaded) {
          loaded = true;
          var script = document.createElement('script');
          script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
          document.head.appendChild(script);
        }
      };
      translateBtn.addEventListener('click', loadTranslate);
      translateBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadTranslate(); }
      });
      window.googleTranslateElementInit = function () {
        if (window.google && google.translate && document.getElementById('google_translate_element')) {
          new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
        }
      };
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

(function(){function clay(){if(document.getElementById('da-global-clay-nav'))return;var st=document.createElement('style');st.id='da-global-clay-nav';st.textContent='nav,.nav{background:linear-gradient(145deg,#202027,#09090c)!important;border:2px solid #ff7a18!important;border-radius:0 0 28px 28px!important;box-shadow:0 9px 0 #7a3008,0 18px 32px rgba(0,0,0,.48),inset 0 3px 0 rgba(255,255,255,.18),inset 0 -8px 15px rgba(255,122,24,.12)!important}nav .brand{display:none!important}nav .nav-brand span,nav .nav-brand div{display:none!important}nav .nav-links>a,nav .nav-links>li>a,nav .nav-links>li>button,nav .nav-links>li>details>summary,nav .navlinks>a,.da-connect-wallet{height:44px!important;min-height:44px!important;min-width:104px!important;padding:0 14px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important;white-space:nowrap!important;background:linear-gradient(145deg,#24242b,#0c0c10)!important;color:#fff!important;border:1px solid #ff7a18!important;border-radius:15px!important;box-shadow:5px 6px 0 #5b260b,inset 0 2px 0 rgba(255,255,255,.18),inset 0 -3px 6px rgba(255,122,24,.12)!important}.da-connect-wallet{background:linear-gradient(145deg,#24242b,#0c0c10)!important;color:#fff!important;border:1px solid #ff7a18!important;border-radius:15px!important;box-shadow:5px 6px 0 #5b260b,inset 0 2px 0 rgba(255,255,255,.18),inset 0 -3px 6px rgba(255,122,24,.12)!important}nav a:hover,.nav a:hover,nav button:hover,.nav button:hover,nav summary:hover,.nav summary:hover,.da-connect-wallet:hover{background:#ff7a18!important;color:#111!important;transform:translateY(-3px)!important;box-shadow:3px 4px 0 #fff,0 10px 18px rgba(0,0,0,.35)!important}';document.head.appendChild(st)}function addWallet(){clay();var nav=document.querySelector('nav');if(!nav||nav.querySelector('.da-connect-wallet'))return;var a=document.createElement('a');a.className='da-connect-wallet';a.href='/account/';a.textContent='CONNECT WALLET';a.setAttribute('aria-label','Connect Cardano wallet');var target=nav.querySelector('.nav-links')||nav.querySelector('.navlinks')||nav;target.appendChild(a)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addWallet);else addWallet();})();

(function(){function bind(){var b=document.querySelector('.da-connect-wallet');if(!b||b.dataset.bound)return;b.dataset.bound='true';var ws=document.createElement('span');ws.className='da-wallet-status';ws.textContent='NOT CONNECTED';b.parentNode.insertBefore(ws,b.nextSibling);b.removeAttribute('href');b.setAttribute('role','button');b.addEventListener('click',async function(e){e.preventDefault();var stage='wallet detection';try{var endpoint='https://sazhdnqzaqpqcralmthh.supabase.co/functions/v1/da-wallet-auth',w=window.cardano||{},keys=Object.keys(w).filter(function(k){return w[k]&&typeof w[k].enable==='function'}),key=['vespr','lace','eternl','nami','flint','yoroi','typhon'].find(function(k){return keys.indexOf(k)>=0})||keys[0];if(!key){b.textContent='INSTALL WALLET';ws.textContent='NO WALLET DETECTED';return}b.textContent='CONNECTING…';ws.textContent='CONNECTING';stage='opening '+key+' wallet';var api=await w[key].enable(),used=await api.getUsedAddresses(),address=used[0]||await api.getChangeAddress(),nr=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'nonce',chain:'cardano',walletAddress:address})}),n=await nr.json();if(!nr.ok)throw Error(n.error||'Nonce request failed');stage='requesting wallet signature';b.textContent='SIGN IN '+key.toUpperCase();ws.textContent='SIGNATURE REQUIRED';var sig=await api.signData(address,n.payload),vr=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'verify',chain:'cardano',walletAddress:address,nonce:n.nonce,key:sig.key,signature:sig.signature,provider:key})}),r=await vr.json();if(!vr.ok)throw Error(r.error||'Signature verification failed');localStorage.setItem('dreamingAnimeSession',r.sessionToken);localStorage.setItem('dreamingAnimeAccountId',r.accountId);b.textContent=key.toUpperCase()+' CONNECTED';ws.textContent='CONNECTED · '+key.toUpperCase();}catch(err){b.textContent='CONNECT WALLET';ws.textContent='FAILED · '+stage;ws.title=String(err.message||'Connection failed');ws.title=String(err.message||'Connection failed');console.warn(err)}})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind()})();

(function(){if(document.getElementById('wallet-status-style'))return;var st=document.createElement('style');st.id='wallet-status-style';st.textContent='.da-wallet-status{display:inline-flex;align-items:center;height:30px;margin-left:8px;padding:0 10px;border-radius:999px;background:#111118;color:#fff;border:1px solid #ff7a18;box-shadow:3px 4px 0 #5b260b;font:700 .62rem Space Mono;white-space:nowrap}.da-wallet-status::before{content:"";width:7px;height:7px;margin-right:6px;border-radius:50%;background:#ff7a18}.da-wallet-status[data-connected="true"]{color:#baffc7;border-color:#63e889}.da-wallet-status[data-connected="true"]::before{background:#63e889}@media(max-width:700px){.da-wallet-status{font-size:.55rem;padding:0 7px}.da-connect-wallet{min-width:0!important}}';document.head.appendChild(st)})();

(function(){function replace(){var old=document.querySelector('.da-connect-wallet');if(!old||old.dataset.directBound)return;var b=old.cloneNode(true);b.dataset.directBound='true';old.replaceWith(b);var ws=b.nextElementSibling;b.addEventListener('click',async function(e){e.preventDefault();try{var w=window.cardano||{},keys=Object.keys(w).filter(function(k){return w[k]&&typeof w[k].enable==='function'}),key=['vespr','lace','eternl','nami','flint','yoroi','typhon'].find(function(k){return keys.indexOf(k)>=0})||keys[0];if(!key){b.textContent='INSTALL WALLET';if(ws)ws.textContent='NO WALLET DETECTED';return}b.textContent='CONNECTING…';if(ws)ws.textContent='CONNECTING';var api=await w[key].enable(),used=await api.getUsedAddresses(),address=used[0]||await api.getChangeAddress();if(!address)throw Error('Wallet returned no address');localStorage.setItem('dreamingAnimeWalletProvider',key);localStorage.setItem('dreamingAnimeWalletAddress',address);b.textContent=key.toUpperCase()+' CONNECTED';if(ws){ws.textContent='CONNECTED · '+key.toUpperCase();ws.dataset.connected='true';}}catch(err){b.textContent='CONNECT WALLET';if(ws)ws.textContent='FAILED · WALLET DID NOT CONNECT';console.warn(err)}})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',replace);else replace()})();

/* Restore the already-authorized CIP-30 session without asking the user to sign in again. */
function daNormalizeCip30(candidate){var api=candidate&&candidate.api&&typeof candidate.api==='object'?candidate.api:candidate;var required=['getNetworkId','getUtxos','getChangeAddress','signTx','submitTx'];var missing=required.filter(function(k){return typeof (api&&api[k])!=='function'});if(missing.length)throw Error('Wallet API compatibility error: missing '+missing.join(', '));return api;}
(function(){async function restore(){try{var key=localStorage.getItem('dreamingAnimeWalletProvider'),w=window.cardano||{};if(key&&w[key]&&typeof w[key].enable==='function'){window.daWalletApi=daNormalizeCip30(await w[key].enable());var api=window.daWalletApi;var used=await api.getUsedAddresses(),address=used[0]||await api.getChangeAddress();if(address)localStorage.setItem('dreamingAnimeWalletAddress',address);var b=document.querySelector('.da-connect-wallet'),s=b&&b.nextElementSibling;if(b)b.textContent=key.toUpperCase()+' CONNECTED';if(s){s.textContent='CONNECTED · '+key.toUpperCase();s.dataset.connected='true'}}}catch(e){console.warn('Wallet restore unavailable',e)}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',restore);else restore()})();
