/* Dreaming Anime ADA checkout: CIP-30 Cardano Preprod only. */
(function () {
  'use strict';
  var ENDPOINT = 'https://sazhdnqzaqpqcralmthh.supabase.co/functions/v1/';
  var CSL_URL = 'https://cdn.jsdelivr.net/npm/@emurgo/cardano-serialization-lib-asmjs@15.0.3/cardano_serialization_lib.js';
  var ADA = 8000000;
  var CSL = null, intent = null, activeProduct = null;
  function normalize(candidate) {
    if (typeof window.daNormalizeCip30 === 'function') return window.daNormalizeCip30(candidate);
    var api = candidate && candidate.api && typeof candidate.api === 'object' ? candidate.api : candidate;
    var required = ['getNetworkId', 'getUtxos', 'getChangeAddress', 'signTx', 'submitTx'];
    var missing = required.filter(function (k) { return !api || typeof api[k] !== 'function'; });
    if (missing.length) throw Error('Wallet API compatibility error: missing ' + missing.join(', '));
    return api;
  }
  async function wallet() {
    try { if (window.daWalletApi) return normalize(window.daWalletApi); } catch (_) { delete window.daWalletApi; }
    var key = localStorage.getItem('dreamingAnimeWalletProvider'), providers = window.cardano || {};
    if (!key || !providers[key] || typeof providers[key].enable !== 'function') throw Error('No injected Cardano wallet was detected. Connect Vespr on Cardano Preprod, then try again.');
    var api = normalize(await providers[key].enable()); window.daWalletApi = api; return api;
  }
  async function loadCsl() { if (CSL) return CSL; CSL = await import(CSL_URL); if (!CSL.Address || !CSL.TransactionBuilder) throw Error('Cardano transaction support could not be loaded.'); return CSL; }
  function hex(bytes) { return Array.from(new Uint8Array(bytes)).map(function (x) { return x.toString(16).padStart(2, '0'); }).join(''); }
  function bytes(hexString) { var out = new Uint8Array(hexString.length / 2); for (var i = 0; i < out.length; i++) out[i] = parseInt(hexString.slice(i * 2, i * 2 + 2), 16); return out; }
  async function createIntent(productId) {
    var response = await fetch(ENDPOINT + 'da-payment-intent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ purpose: 'purchase', productId: productId, amountAda: 8, chain: 'cardano', network: 'preprod' }) });
    var body = await response.json(); if (!response.ok) throw Error(body.error || 'Unable to create payment intent.');
    var pi = body.paymentIntent || body; if (!pi.receiving_address || !(pi.id || pi.payment_intent_id)) throw Error('Payment service returned an incomplete intent.');
    var target = CSL.Address.from_bech32(pi.receiving_address); if (target.network_id() !== 0) throw Error('Checkout blocked: the payment address is not Cardano Preprod. No funds were sent.');
    return pi;
  }
  async function buildTx(api, recipient) {
    if (Number(await api.getNetworkId()) !== 0) throw Error('Checkout blocked: switch your wallet to Cardano Preprod. No mainnet funds will be used.');
    var target = CSL.Address.from_bech32(recipient); if (target.network_id() !== 0) throw Error('Checkout blocked: recipient is not Cardano Preprod.');
    var utxos = await api.getUtxos(); if (!utxos || !utxos.length) throw Error('No spendable Preprod ADA was found in this wallet.');
    var ep = await (await fetch('https://preprod.koios.rest/api/v1/epoch_params')).json(), p = ep[0] || ep;
    var cfg = CSL.TransactionBuilderConfigBuilder.new().fee_algo(CSL.LinearFee.new(CSL.BigNum.from_str(String(p.min_fee_a || 44)), CSL.BigNum.from_str(String(p.min_fee_b || 155381)))).pool_deposit(CSL.BigNum.from_str(String(p.pool_deposit || 500000000))).key_deposit(CSL.BigNum.from_str(String(p.key_deposit || 2000000))).max_value_size(Number(p.max_val_size || 5000)).max_tx_size(Number(p.max_tx_size || 16384)).coins_per_utxo_byte(CSL.BigNum.from_str(String(p.coins_per_utxo_size || 4310))).build();
    var builder = CSL.TransactionBuilder.new(cfg), total = 0;
    utxos.forEach(function (raw) { var u = CSL.TransactionUnspentOutput.from_bytes(bytes(raw)), input = u.input(), output = u.output(); builder.add_input(output.address(), input, output.amount()); total += Number(output.amount().coin().to_str()); });
    if (total < ADA) throw Error('This wallet needs at least 8 ADA plus network fees.');
    builder.add_output(CSL.TransactionOutput.new(target, CSL.Value.new(CSL.BigNum.from_str(String(ADA)))));
    builder.add_change_if_needed(CSL.Address.from_bech32(await api.getChangeAddress())); return hex(builder.build_tx().to_bytes());
  }
  function ensurePanel() {
    if (document.getElementById('da-ada-panel')) return;
    var style = document.createElement('style'); style.textContent = '#da-ada-panel{display:none;position:fixed;z-index:9999;right:20px;bottom:20px;width:min(430px,calc(100vw - 32px));padding:22px;background:#101116;color:#fff;border:2px solid #ff6b00;border-radius:18px;box-shadow:8px 9px 0 #6c2d08,0 20px 50px #000a;font:14px/1.5 Inter,Arial}#da-ada-panel.open{display:block}#da-ada-panel h2{margin:0 0 8px;color:#ff6b00;font:2rem Bangers}#da-ada-panel button{width:100%;padding:12px;margin-top:10px;border:1px solid #ff6b00;border-radius:10px;background:#ff6b00;color:#111;font-weight:700;cursor:pointer}#da-ada-panel .close{background:#fff}#da-ada-panel .muted{color:#c6c2d0}'; document.head.appendChild(style);
    var panel = document.createElement('aside'); panel.id = 'da-ada-panel'; panel.setAttribute('aria-live', 'polite'); panel.innerHTML = '<button class="close" id="da-ada-close">CLOSE</button><h2>BUY WITH ADA</h2><p id="da-ada-status">Cardano Preprod checkout. The exact amount is 8 ADA.</p><p class="muted" id="da-ada-network"></p><button id="da-ada-connect" hidden>CONNECT WALLET</button><button id="da-ada-pay" disabled>APPROVE 8 ADA PAYMENT</button>'; document.body.appendChild(panel);
    document.getElementById('da-ada-close').onclick = function () { panel.classList.remove('open'); };
    document.getElementById('da-ada-pay').onclick = pay;
  }
  async function open(product, name) { ensurePanel(); activeProduct = product; intent = null; var panel = document.getElementById('da-ada-panel'), status = document.getElementById('da-ada-status'), payButton = document.getElementById('da-ada-pay'), connectButton = document.getElementById('da-ada-connect'), net = document.getElementById('da-ada-network'); panel.classList.add('open'); payButton.disabled = true; connectButton.hidden = true; status.textContent = 'Preparing your secure Preprod checkout…';
    try { await loadCsl(); var api = await wallet(); if (Number(await api.getNetworkId()) !== 0) throw Error('Checkout blocked to protect your mainnet funds. Switch the connected wallet to Cardano Preprod.'); net.textContent = 'Preprod wallet detected.'; connectButton.hidden = true; intent = await createIntent(product); payButton.disabled = false; status.textContent = name + ' · payment intent ready. Approve exactly 8 ADA in your wallet.'; } catch (e) { var msg=e.message||'Checkout could not start.'; if(msg==='Failed to fetch') msg='The secure checkout service could not be reached. Please retry once.'; status.textContent = msg; connectButton.hidden = /wallet|injected|connect/i.test(msg); }
  }
  async function pay() { var status = document.getElementById('da-ada-status'), button = document.getElementById('da-ada-pay'); button.disabled = true; try { if (!intent) throw Error('Payment intent is not ready.'); var api = await wallet(); var tx = await buildTx(api, intent.receiving_address); status.textContent = 'Review and approve the exact 8 ADA payment in your wallet…'; var signed = await api.signTx(tx); var hash = await api.submitTx(signed); status.textContent = 'Transaction submitted. Verifying payment…'; var response = await fetch(ENDPOINT + 'da-verify-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paymentIntentId: intent.id || intent.payment_intent_id, transactionHash: hash }) }); var body = await response.json(); if (body.status === 'confirmed') status.textContent = 'Payment confirmed. Your wallpaper entitlement is ready.'; else if (response.status === 202 || body.status === 'pending') status.textContent = 'Payment pending confirmation. Keep this page open and verify again shortly.'; else throw Error(body.error || 'Payment verification failed.'); } catch (e) { status.textContent = e.message || 'Payment was not completed.'; } finally { button.disabled = !intent; } }
  document.addEventListener('click', function (event) { if(event.target.closest('#da-ada-connect')){event.preventDefault();if(window.daOpenWalletChooser)window.daOpenWalletChooser();return;} var button = event.target.closest('[data-ada-product]'); if (!button) return; event.preventDefault(); open(button.dataset.adaProduct, button.dataset.adaName || 'Wallpaper pack'); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensurePanel); else ensurePanel();
})();
