(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var root = document.documentElement;
  function $(s, c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); }

  // scroll reveal (staggered inside each group)
  var sel = '.ab-hero .ab-eyebrow,.ab-hero h1,.ab-bio,.ab-hero .ab-row,.ab-stats > div,.ab-sec h2,.ab-story li,.ab-card,.ab-time li,.ab-photos figure,.ab-cap,.ab-two > div,.ab-close p,.ab-close .ab-row,'
          + '.c-hero > *,.c-grid,.c-shots li,.c-next,.c-foot,.page-module__NfDiEG__toolsGrid > div';
  var items = $(sel);
  var stages = $('.c-stage');
  if (!items.length && !stages.length) return;
  if (!reduce) {
    root.classList.add('fx-on');
    items.forEach(function(el){
      el.classList.add('fx');
      var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--d', Math.min(sibs, 8) * 0.07 + 's');
    });
    stages.forEach(function(el){ el.classList.add('fx-stage'); });
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
    items.concat(stages).forEach(function(el){ io.observe(el); });
  }

  // footer back-to-top (About page is static, so wire the click here)
  $('[class*="logoBtn"]').forEach(function(b){ b.addEventListener('click', function(){ window.scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'}); }); });
  // count-up numbers
  $('.ab-stats dt').forEach(function(dt){
    var m = dt.textContent.match(/^(\d+)(.*)$/); if (!m || reduce) return;
    var to = +m[1], suf = m[2], done = false;
    new IntersectionObserver(function(es, o){
      if (done || !es[0].isIntersecting) return; done = true; o.disconnect();
      var t0 = performance.now();
      (function step(t){ var p = Math.min(1, (t - t0) / 1100); dt.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); })(t0);
    }, {threshold: 0.6}).observe(dt);
  });

  // header gets a glass background after scrolling
  var hdr = document.querySelector('.c-top'); if (hdr) hdr.classList.add('fx-hdr');
  // parallax on the About portrait + backdrop
  var por = document.querySelector('.ab-portrait'), bg = document.querySelector('.ab-herobg');
  var ticking = false;
  function onScroll(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){
      var y = window.scrollY;
      if (hdr) hdr.classList.toggle('scrolled', y > 24);
      if (!reduce && por) por.style.transform = 'translateY(' + Math.min(y * 0.08, 60) + 'px)';
      if (!reduce && bg) bg.style.backgroundPosition = 'center ' + (y * 0.15) + 'px';
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive: true}); onScroll();

  if (!fine || reduce) return;

  // magnetic buttons
  $('.ab-btn,.c-back,.c-next').forEach(function(el){
    el.addEventListener('mousemove', function(e){
      var r = el.getBoundingClientRect(), x = e.clientX - (r.left + r.width/2), y = e.clientY - (r.top + r.height/2);
      el.style.transform = 'translate(' + x * 0.18 + 'px,' + y * 0.25 + 'px)';
    });
    el.addEventListener('mouseleave', function(){ el.style.transform = ''; });
  });
  // stage tilt on case pages
  $('.c-stage').forEach(function(el){
    el.classList.add('fx-tilt');
    el.addEventListener('mousemove', function(e){
      var r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      el.style.transform = 'perspective(1200px) rotateX(' + (-py * 4) + 'deg) rotateY(' + (px * 5) + 'deg)';
    });
    el.addEventListener('mouseleave', function(){ el.style.transform = ''; });
  });
  // custom cursor (ring + dot)
  var ring = document.createElement('div'); ring.className = 'fx-cursor';
  var dot = document.createElement('div'); dot.className = 'fx-cursor-dot';
  document.body.appendChild(ring); document.body.appendChild(dot); document.body.classList.add('fx-cur');
  var mx = 0, my = 0, rx = 0, ry = 0, shown = false;
  window.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    if (!shown){ shown = true; rx = mx; ry = my; ring.classList.add('on'); dot.classList.add('on'); }
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    var hot = e.target.closest && e.target.closest('a,button,.c-shots img,.ab-ph,.ab-card');
    ring.classList.toggle('big', !!hot);
  }, {passive: true});
  document.addEventListener('mouseleave', function(){ ring.classList.remove('on'); dot.classList.remove('on'); shown = false; });
  (function loop(){ rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(loop); })();
})();
