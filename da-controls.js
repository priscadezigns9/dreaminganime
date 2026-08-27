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
