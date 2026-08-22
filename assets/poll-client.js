/* [Zapia] Claude AI — shared Character Spotlight poll client, 2026-08-22.
 * Safe by default: no local/fake totals; it renders totals only from Supabase.
 * Configure window.DREAMING_ANIME_SUPABASE_ANON_KEY at deploy time (never commit a service key).
 */
(function () {
  'use strict';
  var cfg = window.DREAMING_ANIME_SUPABASE_CONFIG || {};
  var url = String(cfg.url || '').replace(/\/$/, '');
  var key = String(cfg.anonKey || window.DREAMING_ANIME_SUPABASE_ANON_KEY || '');
  var voterKey = '';
  try { voterKey = localStorage.getItem('dreaming-anime-poll-voter-v1') || ''; if (!voterKey) { voterKey = crypto.randomUUID(); localStorage.setItem('dreaming-anime-poll-voter-v1', voterKey); } } catch (_) { voterKey = 'session-' + Date.now() + '-' + Math.random().toString(36).slice(2); }
  var ready = Boolean(url && key);
  function headers(extra) { return Object.assign({ apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }, extra || {}); }
  function json(path, options) { return fetch(url + path, options).then(function (r) { if (!r.ok) throw new Error('poll request failed'); return r.json(); }); }
  function render(root, data, selected) {
    var counts = data && data.counts || {}, total = Number(data && data.total_votes) || 0;
    root.querySelectorAll('[data-poll-count]').forEach(function (el) { el.textContent = String(Number(counts[el.getAttribute('data-poll-count')] || 0)); });
    var totalEl = root.querySelector('[data-poll-total]'); if (totalEl) totalEl.textContent = String(total);
    root.querySelectorAll('[data-answer]').forEach(function (b) { b.classList.toggle('is-selected', b.getAttribute('data-answer') === selected); b.setAttribute('aria-pressed', b.getAttribute('data-answer') === selected ? 'true' : 'false'); });
  }
  document.querySelectorAll('[data-shared-poll]').forEach(function (root) {
    var slug = root.getAttribute('data-poll-slug'), result = root.querySelector('[data-poll-status]'), selected = '';
    function status(text) { if (result) result.textContent = text; }
    if (!ready) { status('Shared results are not connected yet.'); return; }
    function load() { return json('/rest/v1/character_spotlight_poll_results?select=*&slug=eq.' + encodeURIComponent(slug), { headers: headers() }).then(function (rows) { if (!rows[0]) throw new Error('poll unavailable'); render(root, rows[0], selected); status('Live community results · ' + (rows[0].total_votes || 0) + ' votes'); }); }
    load().catch(function () { status('Poll service is temporarily unavailable.'); });
    root.querySelectorAll('[data-answer]').forEach(function (button) { button.addEventListener('click', function () { var option = button.getAttribute('data-answer'); status('Saving your selection…'); json('/rest/v1/rpc/cast_character_spotlight_vote', { method: 'POST', headers: headers(), body: JSON.stringify({ poll_slug: slug, selected_option: option, browser_voter_key: voterKey }) }).then(function () { selected = option; return load(); }).catch(function () { status('Your vote could not be saved. Please try again.'); }); }); });
  });
}());
