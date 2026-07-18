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
      { title: '색상 선택기', url: '/tools/ko/color-picker/' },
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
