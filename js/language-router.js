(function () {
  'use strict';

  var preferenceKey = 'site-language';
  var path = window.location.pathname.replace(/\/index\.html$/, '/');

  document.querySelectorAll('[data-language-choice]').forEach(function (link) {
    link.addEventListener('click', function () {
      localStorage.setItem(preferenceKey, link.dataset.languageChoice);
    });
  });

  // Automatic routing only happens at the Chinese home page. A saved manual
  // choice always wins, so readers are never trapped in a redirect loop.
  if (path !== '/') return;

  var preference = localStorage.getItem(preferenceKey);
  if (preference === 'en') {
    window.location.replace('/en/');
    return;
  }
  if (preference === 'zh-CN') return;

  var fallbackCountry = /^zh(?:-|$)/i.test(navigator.language || '') ? 'CN' : 'OTHER';
  var timeout = new AbortController();
  var timer = setTimeout(function () { timeout.abort(); }, 1800);

  fetch('https://api.country.is/', {
    signal: timeout.signal,
    headers: { Accept: 'application/json' }
  })
    .then(function (response) {
      if (!response.ok) throw new Error('Geo lookup failed');
      return response.json();
    })
    .then(function (result) {
      if (result.country !== 'CN') window.location.replace('/en/');
    })
    .catch(function () {
      if (fallbackCountry !== 'CN') window.location.replace('/en/');
    })
    .finally(function () { clearTimeout(timer); });
})();
