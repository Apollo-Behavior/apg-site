// APG demo site: framework rail tabs + updates filter. No dependencies.
(function () {
  var rail = document.querySelector('.apg-fw__rail');
  if (rail) {
    var tabs = Array.prototype.slice.call(rail.querySelectorAll('[role="tab"]'));
    var panel = document.getElementById('fw-panel');
    var icons = panel.querySelectorAll('[data-step-icon]');
    var texts = panel.querySelectorAll('[data-step-text]');
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', j === i ? 'true' : 'false');
        t.tabIndex = j === i ? 0 : -1;
      });
      icons.forEach(function (ic) { ic.hidden = ic.getAttribute('data-step-icon') !== String(i); });
      texts.forEach(function (tx) { tx.hidden = tx.getAttribute('data-step-text') !== String(i); });
      panel.setAttribute('aria-labelledby', tabs[i].id);
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, k = e.key;
        if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); select((i + 1) % n, true); }
        else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); select((i - 1 + n) % n, true); }
        else if (k === 'Home') { e.preventDefault(); select(0, true); }
        else if (k === 'End') { e.preventDefault(); select(n - 1, true); }
      });
    });
  }
  // Facebook page feed (Meta Page Plugin). Width is read from the container so it fits phones too.
  var FB_PAGE = 'https://www.facebook.com/AutismProvidersOfGeorgia/';
  document.querySelectorAll('[data-fb-feed]').forEach(function (box) {
    var h = parseInt(box.getAttribute('data-fb-feed'), 10) || 640;
    box.style.minHeight = h + 'px';
    var w = Math.max(180, Math.min(500, Math.floor(box.clientWidth || 500)));
    var src = 'https://www.facebook.com/plugins/page.php?href=' + encodeURIComponent(FB_PAGE) +
      '&tabs=timeline&width=' + w + '&height=' + h +
      '&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false';
    var f = document.createElement('iframe');
    f.src = src; f.width = w; f.height = h; f.title = 'Autism Providers of Georgia on Facebook';
    f.setAttribute('scrolling', 'no'); f.setAttribute('frameborder', '0');
    f.setAttribute('allow', 'clipboard-write; encrypted-media; picture-in-picture; web-share');
    f.style.height = h + 'px';
    box.appendChild(f);
  });

  var filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    var posts = document.querySelectorAll('[data-kind]');
    var empty = document.querySelector('[data-empty]');
    filters.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter'), shown = 0;
        filters.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        posts.forEach(function (p) {
          var on = f === 'all' || p.getAttribute('data-kind') === f;
          p.hidden = !on; if (on) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    });
  }
})();
