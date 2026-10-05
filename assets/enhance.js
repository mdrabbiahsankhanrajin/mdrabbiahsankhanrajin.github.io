(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // skip link + main landmark
  var main = document.querySelector('main');
  if (main){ if (!main.id) main.id = 'main'; main.setAttribute('tabindex', '-1');
    var s = document.createElement('a'); s.className = 'skip-link'; s.href = '#' + main.id; s.textContent = 'Skip to content';
    document.body.insertBefore(s, document.body.firstChild); }
  // current page in the nav
  var here = location.pathname.replace(/\/$/, '') || '/';
  Array.prototype.forEach.call(document.querySelectorAll('.c-nav a'), function(a){
    var p = (a.getAttribute('href') || '').replace(/\/$/, '');
    if (p && (p === here || (p === '/work' && here.indexOf('/work') === 0))) a.setAttribute('aria-current', 'page');
  });
  // scroll progress
  if (!reduce){
    var bar = document.createElement('div'); bar.className = 'sp-bar'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
    var tk = false;
    function upd(){ var h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, scrollY / h) : 0) + ')'; tk = false; }
    addEventListener('scroll', function(){ if (!tk){ tk = true; requestAnimationFrame(upd); } }, {passive: true}); upd();
  }
  // screenshot lightbox
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.c-shots img, .c-stage img'));
  if (!imgs.length) return;
  var box = null, idx = 0, last = null;
  function cap(i){ var f = imgs[i].closest('figure'), c = f && f.querySelector('figcaption'); return (c && c.textContent) || imgs[i].alt || ''; }
  function show(i){
    idx = (i + imgs.length) % imgs.length;
    var im = box.querySelector('img'); im.src = imgs[idx].currentSrc || imgs[idx].src; im.alt = imgs[idx].alt;
    box.querySelector('figcaption').textContent = cap(idx);
    var many = imgs.length > 1; box.querySelector('.lb-p').style.display = box.querySelector('.lb-n').style.display = many ? '' : 'none';
  }
  function open(i){
    last = document.activeElement;
    box = document.createElement('div'); box.className = 'lb'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Screenshot viewer');
    box.innerHTML = '<button class="lb-x" aria-label="Close">&times;</button><button class="lb-p" aria-label="Previous screenshot">&#8249;</button><figure><img alt=""/><figcaption></figcaption></figure><button class="lb-n" aria-label="Next screenshot">&#8250;</button>';
    document.body.appendChild(box); document.body.classList.add('lb-open'); show(i);
    setTimeout(function(){ if (box) box.classList.add('on'); }, 20); box.querySelector('.lb-x').focus();
    box.addEventListener('click', function(e){ if (e.target === box || e.target.closest('figure') === null && !e.target.closest('button')) close(); if (e.target.closest('.lb-x')) close(); if (e.target.closest('.lb-p')) show(idx - 1); if (e.target.closest('.lb-n')) show(idx + 1); });
    box.querySelector('figure').addEventListener('click', function(e){ if (e.target.tagName !== 'IMG') close(); });
  }
  function close(){ if (!box) return; var b = box; box = null; b.classList.remove('on'); document.body.classList.remove('lb-open'); setTimeout(function(){ b.remove(); }, reduce ? 0 : 250); if (last && last.focus) last.focus(); }
  imgs.forEach(function(im, i){
    im.setAttribute('tabindex', '0'); im.setAttribute('role', 'button');
    im.addEventListener('click', function(){ open(i); });
    im.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(i); } });
  });
  document.addEventListener('keydown', function(e){
    if (!box) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'Tab'){ var f = box.querySelectorAll('button'); var vis = Array.prototype.filter.call(f, function(x){ return x.style.display !== 'none'; }); var a = document.activeElement, i = vis.indexOf(a);
      e.preventDefault(); vis[(i + (e.shiftKey ? -1 : 1) + vis.length) % vis.length].focus(); }
  });
})();
