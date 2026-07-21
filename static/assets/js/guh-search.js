(function () {
  'use strict';

  var path = location.pathname;
  var lang = (path.indexOf('/tools/en/') !== -1 || path.indexOf('/en/') === 0) ? 'en' : 'ko';

  var TOOLS = {
    ko: [
      { title: 'BMI 계산기', url: '/tools/ko/bmi-calculator/' },
      { title: '이상체중 계산기', url: '/tools/ko/ideal-weight-calculator/' },
      { title: '날짜 계산기', url: '/tools/ko/date-calculator/' },
      { title: '만나이 계산기', url: '/tools/ko/korean-age-calculator/' },
      { title: '문자 수 계산기', url: '/tools/ko/character-counter/' },
      { title: '바이트 계산기', url: '/tools/ko/byte-calculator/' },
      { title: 'D-Day 계산기', url: '/tools/ko/dday-calculator/' },
      { title: '퍼센트 계산기', url: '/tools/ko/percentage-calculator/' },
      { title: '단위 변환기', url: '/tools/ko/unit-converter/' },
      { title: 'JSON 포매터', url: '/tools/ko/json-formatter/' },
      { title: 'XML 포매터', url: '/tools/ko/xml-formatter/' },
      { title: '정규식 테스터', url: '/tools/ko/regex-tester/' },
      { title: 'Base64 인코더', url: '/tools/ko/base64/' },
      { title: 'URL 인코더', url: '/tools/ko/url-encoder/' },
      { title: 'HTML 이스케이프', url: '/tools/ko/html-escape/' },
      { title: '색상 선택기 컬러 피커', url: '/tools/ko/color-picker/' },
      { title: '이미지 변환기', url: '/tools/ko/image-converter/' },
      { title: '바코드 생성기', url: '/tools/ko/barcode-generator/' },
      { title: '이미지 리사이저', url: '/tools/ko/image-resizer/' },
      { title: '이미지 압축기', url: '/tools/ko/image-compress/' },
      { title: 'SVG 변환기', url: '/tools/ko/svg-converter/' },
      { title: 'GIF 메이커', url: '/tools/ko/gif-maker/' },
      { title: 'ZIP 압축해제', url: '/tools/ko/zip-extractor/' },
      { title: 'QR코드 생성기', url: '/tools/ko/qr-code-generator/' },
      { title: '이미지 PDF 변환기', url: '/tools/ko/image-to-pdf/' },
      { title: '복리 계산기', url: '/tools/ko/compound-interest/' },
      { title: '대출 계산기', url: '/tools/ko/loan-calculator/' },
{ title: '부가세 계산기', url: '/tools/ko/vat-calculator/' },
      { title: '연봉 계산기', url: '/tools/ko/salary-calculator/' },
      { title: '시급·월급 계산기', url: '/tools/ko/monthly-salary/' },
      { title: '이미지 자르기', url: '/tools/ko/image-cropper/' },
      { title: '배경제거 투명배경', url: '/tools/ko/bg-remover/' },
      { title: '주식 포트폴리오 수식 생성기', url: '/tools/ko/stock-portfolio-formula/' },
      { title: '이모지 찾기', url: '/tools/ko/emoji-finder/' }
    ],
    en: [
      { title: 'BMI Calculator', url: '/tools/en/bmi-calculator/' },
      { title: 'Ideal Weight Calculator', url: '/tools/en/ideal-weight-calculator/' },
      { title: 'Date Calculator', url: '/tools/en/date-calculator/' },
      { title: 'Korean Age Calculator', url: '/tools/en/korean-age-calculator/' },
      { title: 'Character Counter', url: '/tools/en/character-counter/' },
      { title: 'Byte Calculator', url: '/tools/en/byte-calculator/' },
      { title: 'D-Day Calculator', url: '/tools/en/dday-calculator/' },
      { title: 'Percentage Calculator', url: '/tools/en/percentage-calculator/' },
      { title: 'Unit Converter', url: '/tools/en/unit-converter/' },
      { title: 'JSON Formatter', url: '/tools/en/json-formatter/' },
      { title: 'XML Formatter', url: '/tools/en/xml-formatter/' },
      { title: 'Regex Tester', url: '/tools/en/regex-tester/' },
      { title: 'Base64 Encoder', url: '/tools/en/base64/' },
      { title: 'URL Encoder', url: '/tools/en/url-encoder/' },
      { title: 'HTML Escape', url: '/tools/en/html-escape/' },
      { title: 'Color Picker', url: '/tools/en/color-picker/' },
      { title: 'Image Converter', url: '/tools/en/image-converter/' },
      { title: 'Barcode Generator', url: '/tools/en/barcode-generator/' },
      { title: 'Image Resizer', url: '/tools/en/image-resizer/' },
      { title: 'Image Compressor', url: '/tools/en/image-compress/' },
      { title: 'SVG Converter', url: '/tools/en/svg-converter/' },
      { title: 'GIF Maker', url: '/tools/en/gif-maker/' },
      { title: 'ZIP Extractor', url: '/tools/en/zip-extractor/' },
      { title: 'QR Code Generator', url: '/tools/en/qr-code-generator/' },
      { title: 'Image to PDF Converter', url: '/tools/en/image-to-pdf/' },
      { title: 'Compound Interest Calculator', url: '/tools/en/compound-interest/' },
      { title: 'Loan Calculator', url: '/tools/en/loan-calculator/' },
{ title: 'VAT Calculator', url: '/tools/en/vat-calculator/' },
      { title: 'Salary Calculator', url: '/tools/en/salary-calculator/' },
      { title: 'Hourly Wage Calculator', url: '/tools/en/monthly-salary/' },
      { title: 'Image Cropper', url: '/tools/en/image-cropper/' },
      { title: 'BG Remover Transparent Background', url: '/tools/en/bg-remover/' },
      { title: 'Stock Portfolio Formula Generator', url: '/tools/en/stock-portfolio-formula/' },
      { title: 'Emoji Finder', url: '/tools/en/emoji-finder/' }
    ]
  };

  var blogPosts = [];

  fetch('/' + lang + '/blog/index.json')
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (posts) { blogPosts = posts || []; })
    .catch(function () {});

  function init() {
    var actions = document.querySelector('.guh-header-actions');
    if (!actions || document.getElementById('guh-search-wrap')) return;

    var ph = lang === 'ko' ? '검색...' : 'Search...';
    var label = lang === 'ko' ? '검색' : 'Search';

    var wrap = document.createElement('div');
    wrap.className = 'guh-search-wrap';
    wrap.id = 'guh-search-wrap';
    wrap.innerHTML =
      '<input type="text" class="guh-search-input" id="guh-search-input"' +
      ' placeholder="' + ph + '" autocomplete="off" aria-label="' + label + '" />' +
      '<button class="guh-search-btn" id="guh-search-btn" aria-label="' + label + '">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
        ' stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '</button>' +
      '<div class="guh-search-results" id="guh-search-results" role="listbox"></div>';

    actions.insertBefore(wrap, actions.firstChild);

    var input = document.getElementById('guh-search-input');
    var btn = document.getElementById('guh-search-btn');
    var results = document.getElementById('guh-search-results');

    function doSearch(q) {
      q = q.trim().toLowerCase();
      if (!q) { hide(); return; }

      var toolList = (TOOLS[lang] || [])
        .filter(function (t) { return t.title.toLowerCase().indexOf(q) !== -1; })
        .map(function (t) { return { title: t.title, url: t.url, kind: 'tool' }; });

      var postList = blogPosts
        .filter(function (p) { return (p.title || '').toLowerCase().indexOf(q) !== -1; })
        .slice(0, 5)
        .map(function (p) { return { title: p.title, url: p.url, kind: 'blog' }; });

      var all = toolList.concat(postList).slice(0, 7);

      var ICON_TOOL = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>';
      var ICON_BLOG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
      var noResult = lang === 'ko' ? '검색 결과가 없습니다' : 'No results found';

      results.innerHTML = all.length
        ? all.map(function (item) {
            return '<a href="' + item.url + '" class="guh-search-item" role="option">' +
              '<span class="guh-search-item-icon">' + (item.kind === 'tool' ? ICON_TOOL : ICON_BLOG) + '</span>' +
              '<span class="guh-search-item-title">' + item.title + '</span>' +
              '</a>';
          }).join('')
        : '<div class="guh-search-empty">' + noResult + '</div>';

      results.classList.add('show');
    }

    function hide() {
      results.classList.remove('show');
    }

    input.addEventListener('input', function () { doSearch(this.value); });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = results.querySelector('.guh-search-item');
        if (first) location.href = first.href;
      }
      if (e.key === 'Escape') {
        hide(); input.value = ''; wrap.classList.remove('open');
      }
    });

    btn.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        if (!wrap.classList.contains('open')) {
          wrap.classList.add('open');
          setTimeout(function () { input.focus(); }, 50);
        } else if (input.value.trim()) {
          doSearch(input.value);
        } else {
          wrap.classList.remove('open');
          hide();
        }
      } else {
        if (input.value.trim()) doSearch(input.value);
        else input.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) {
        hide();
        if (window.innerWidth <= 768) wrap.classList.remove('open');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ── Favorites ──────────────────────────────────────────────────────
(function () {
  'use strict';

  var FAV_KEY = 'GUH-favorites';
  var path = location.pathname;
  var lang = (path.indexOf('/tools/en/') !== -1 || path.indexOf('/en/') === 0) ? 'en' : 'ko';

  var TOOL_ICONS = {
    'image-converter': '🔄', 'image-resizer': '↔️', 'image-compress': '🗜️',
    'image-cropper': '✂️', 'bg-remover': '🪄', 'gif-maker': '🎞️',
    'svg-converter': '✏️', 'image-to-pdf': '📄',
    'date-calculator': '📅', 'korean-age-calculator': '🎂',
    'character-counter': '📝', 'byte-calculator': '💾',
    'dday-calculator': '⏳', 'percentage-calculator': '💯',
    'unit-converter': '📏', 'emoji-finder': '😊',
    'zip-extractor': '📦', 'barcode-generator': '📊',
    'qr-code-generator': '📱', 'compound-interest': '📈',
    'loan-calculator': '🏦', 'vat-calculator': '🧾',
    'salary-calculator': '💼', 'monthly-salary': '🕐',
    'stock-portfolio-formula': '📊', 'bmi-calculator': '⚖️',
    'ideal-weight-calculator': '🏋️', 'json-formatter': '{ }',
    'xml-formatter': '📄', 'regex-tester': '🔍',
    'base64': '🔤', 'url-encoder': '🔗',
    'html-escape': '🛡️', 'color-picker': '🎨',
    'exchange-rate': '💱'
  };

  var TOOL_TITLES = {
    ko: {
      'image-converter': '이미지 변환기', 'image-resizer': '이미지 리사이저',
      'image-compress': '이미지 압축', 'image-cropper': '이미지 자르기',
      'bg-remover': '배경제거(투명배경)', 'gif-maker': 'GIF 메이커',
      'svg-converter': 'SVG 변환기', 'image-to-pdf': '이미지→PDF',
      'date-calculator': '날짜 계산기', 'korean-age-calculator': '만나이 계산기',
      'character-counter': '글자수 계산기', 'byte-calculator': 'Byte 계산기',
      'dday-calculator': 'D-Day 계산기', 'percentage-calculator': '퍼센트 계산기',
      'unit-converter': '단위환산기', 'emoji-finder': '이모지 찾기',
      'zip-extractor': 'ZIP 압축해제', 'barcode-generator': '바코드 생성기',
      'qr-code-generator': 'QR코드 생성기', 'compound-interest': '복리 계산기',
      'loan-calculator': '대출 계산기', 'vat-calculator': '부가세 계산기',
      'salary-calculator': '연봉 계산기', 'monthly-salary': '월급·시급 계산기',
      'stock-portfolio-formula': '주식 포트폴리오', 'bmi-calculator': 'BMI 계산기',
      'ideal-weight-calculator': '이상체중 계산기', 'json-formatter': 'JSON 포매터',
      'xml-formatter': 'XML 포매터', 'regex-tester': 'Regex 테스터',
      'base64': 'Base64 인코더', 'url-encoder': 'URL 인코더',
      'html-escape': 'HTML Escape', 'color-picker': '색상 선택기',
      'exchange-rate': '환율 계산기'
    },
    en: {
      'image-converter': 'Image Converter', 'image-resizer': 'Image Resizer',
      'image-compress': 'Image Compress', 'image-cropper': 'Image Cropper',
      'bg-remover': 'BG Remover', 'gif-maker': 'GIF Maker',
      'svg-converter': 'SVG Converter', 'image-to-pdf': 'Image to PDF',
      'date-calculator': 'Date Calculator', 'korean-age-calculator': 'Korean Age',
      'character-counter': 'Character Counter', 'byte-calculator': 'Byte Calculator',
      'dday-calculator': 'D-Day Calculator', 'percentage-calculator': 'Percentage Calc',
      'unit-converter': 'Unit Converter', 'emoji-finder': 'Emoji Finder',
      'zip-extractor': 'ZIP Extractor', 'barcode-generator': 'Barcode Generator',
      'qr-code-generator': 'QR Code Generator', 'compound-interest': 'Compound Interest',
      'loan-calculator': 'Loan Calculator', 'vat-calculator': 'VAT Calculator',
      'salary-calculator': 'Salary Calculator', 'monthly-salary': 'Hourly/Monthly Pay',
      'stock-portfolio-formula': 'Stock Portfolio', 'bmi-calculator': 'BMI Calculator',
      'ideal-weight-calculator': 'Ideal Weight', 'json-formatter': 'JSON Formatter',
      'xml-formatter': 'XML Formatter', 'regex-tester': 'Regex Tester',
      'base64': 'Base64 Encoder', 'url-encoder': 'URL Encoder',
      'html-escape': 'HTML Escape', 'color-picker': 'Color Picker',
      'exchange-rate': 'Exchange Rate'
    }
  };

  function getFavs() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; }
  }

  function setFavs(arr) {
    localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  }

  function isFav(id) {
    return getFavs().indexOf(id) !== -1;
  }

  function toggleFav(id) {
    var favs = getFavs();
    var idx = favs.indexOf(id);
    if (idx === -1) favs.push(id); else favs.splice(idx, 1);
    setFavs(favs);
    return idx === -1;
  }

  function getToolId() {
    var m = path.match(/\/tools\/(?:ko|en)\/([^\/]+)\//);
    return m ? m[1] : null;
  }

  function isMainPage() {
    return /^\/(ko|en)\/$/.test(path);
  }

  function showToast(msg, added) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.style.background = added ? 'var(--gold)' : 'var(--text-3)';
    t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, 2000);
  }

  function initFavBtn() {
    var toolId = getToolId();
    if (!toolId) return;
    var hero = document.querySelector('.guh-hero');
    if (!hero) return;
    var h1 = hero.querySelector('h1');
    if (!h1) return;

    var favored = isFav(toolId);
    var addLabel  = lang === 'ko' ? '즐겨찾기 추가' : 'Add to favorites';
    var rmLabel   = lang === 'ko' ? '즐겨찾기 해제' : 'Remove from favorites';

    var btn = document.createElement('button');
    btn.className = 'guh-fav-btn' + (favored ? ' active' : '');
    btn.setAttribute('aria-label', favored ? rmLabel : addLabel);
    btn.innerHTML =
      '<span class="guh-fav-star">' + (favored ? '★' : '☆') + '</span>' +
      '<span class="guh-fav-label">' + (favored ? rmLabel : addLabel) + '</span>';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var added = toggleFav(toolId);
      btn.querySelector('.guh-fav-star').textContent = added ? '★' : '☆';
      btn.querySelector('.guh-fav-label').textContent = added ? rmLabel : addLabel;
      btn.setAttribute('aria-label', added ? rmLabel : addLabel);
      btn.classList.toggle('active', added);
      var msg = added
        ? (lang === 'ko' ? '즐겨찾기에 추가됐습니다.' : 'Added to favorites.')
        : (lang === 'ko' ? '즐겨찾기에서 제거됐습니다.' : 'Removed from favorites.');
      showToast(msg, added);
    });

    h1.appendChild(btn);
  }

  function initFavSection() {
    if (!isMainPage()) return;
    var favs = getFavs();
    if (!favs.length) return;

    var titles = TOOL_TITLES[lang] || {};
    var items = favs.map(function (id) {
      return {
        id: id,
        title: titles[id] || id,
        icon: TOOL_ICONS[id] || '⭐',
        url: '/tools/' + lang + '/' + id + '/'
      };
    });

    var section = document.createElement('section');
    section.className = 'guh-section guh-fav-section';
    section.id = 'favorites';
    section.innerHTML =
      '<h2 class="guh-section-title">' +
      (lang === 'ko' ? '⭐ 즐겨찾기 도구' : '⭐ Favorite Tools') +
      '</h2>' +
      '<div class="guh-tool-grid">' +
      items.map(function (t) {
        return '<a href="' + t.url + '" class="guh-tool-card">' +
          '<span class="guh-tool-icon">' + t.icon + '</span>' +
          '<span>' + t.title + '</span></a>';
      }).join('') +
      '</div>';

    var container = document.querySelector('.guh-container.guh-page');
    if (!container) return;
    var hero = container.querySelector('.guh-hero');
    var anchor = hero ? hero.nextSibling : container.firstChild;
    container.insertBefore(section, anchor);
  }

  function init() {
    initFavBtn();
    initFavSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ── PWA Install Prompt ─────────────────────────────────────────────
(function () {
  'use strict';

  // 이미 앱으로 실행 중이면 종료
  if (window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone) return;

  var path = location.pathname;
  var lang = (path.indexOf('/en/') === 0 || path.indexOf('/tools/en/') === 0) ? 'en' : 'ko';
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
  var deferredPrompt = null;

  // 7일 내 닫은 경우 표시 안 함
  var dismissedAt = parseInt(localStorage.getItem('GUH-pwa-dismissed') || '0');
  if (Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) return;

  function createBanner(msg, btnLabel, onInstall) {
    if (document.getElementById('guh-pwa-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'guh-pwa-banner';
    banner.innerHTML =
      '<div class="guh-pwa-inner">' +
        '<img src="/assets/img/logo_100.png" class="guh-pwa-icon" alt="EveryUtil" />' +
        '<p class="guh-pwa-msg">' + msg + '</p>' +
        '<div class="guh-pwa-btns">' +
          '<button id="guh-pwa-ok">' + btnLabel + '</button>' +
          '<button id="guh-pwa-close" aria-label="닫기">✕</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    setTimeout(function () { banner.classList.add('show'); }, 80);

    document.getElementById('guh-pwa-ok').addEventListener('click', function () {
      onInstall();
      dismiss();
    });
    document.getElementById('guh-pwa-close').addEventListener('click', dismiss);
  }

  function dismiss() {
    var banner = document.getElementById('guh-pwa-banner');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(function () { banner.remove(); }, 350);
    }
    localStorage.setItem('GUH-pwa-dismissed', String(Date.now()));
  }

  // 서비스워커 등록
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    });
  }

  if (isIOS) {
    // iOS Safari: 수동 안내 배너
    window.addEventListener('load', function () {
      setTimeout(function () {
        var msg = lang === 'ko'
          ? 'Safari 하단 <b>공유(↑) → 홈 화면에 추가</b>를 탭하면 앱처럼 사용할 수 있어요!'
          : 'Tap <b>Share (↑) → Add to Home Screen</b> in Safari to install as an app!';
        createBanner(msg, lang === 'ko' ? '알겠어요' : 'Got it', function () {});
      }, 3000);
    });
  } else {
    // Android / Chrome: beforeinstallprompt 이벤트
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      deferredPrompt = e;
      setTimeout(function () {
        var msg = lang === 'ko'
          ? 'EveryUtil을 <b>앱으로 설치</b>하면 홈 화면에서 바로 실행할 수 있어요!'
          : 'Install <b>EveryUtil</b> as an app for quick access from your home screen!';
        createBanner(msg, lang === 'ko' ? '📲 앱으로 설치' : '📲 Install App', function () {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function () { deferredPrompt = null; });
          }
        });
      }, 2500);
    });
  }
})();
