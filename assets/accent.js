(function(){
  var KEY = 'accent', root = document.documentElement;
  var OPTS = [['green', 'Green', 'linear-gradient(135deg,#0ae448,#a9fc83)'], ['indigo', 'Indigo', 'linear-gradient(135deg,#4f46e5,#22d3ee)'], ['amber', 'Amber', 'linear-gradient(135deg,#ff6a13,#ffe08a)'], ['gold', 'Emerald', 'linear-gradient(135deg,#0f8f6a,#f2c14e)']];
  var q = new URLSearchParams(location.search), cur = null;
  try { if (q.get('c')) localStorage.setItem(KEY, q.get('c')); cur = localStorage.getItem(KEY); } catch(e){ cur = q.get('c'); }
  var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '/assets/accent.css'; document.head.appendChild(l);
  function apply(a){ if (!a || a === 'green') root.removeAttribute('data-accent'); else root.setAttribute('data-accent', a); }
  apply(cur);
  if (q.has('preview')){
    var bar = document.createElement('div'); bar.className = 'ac-pick'; bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', 'Accent colour preview');
    OPTS.forEach(function(o){
      var b = document.createElement('button'); b.type = 'button'; b.innerHTML = '<i style="background:' + o[2] + '"></i>' + o[1];
      b.setAttribute('aria-pressed', String((cur || 'green') === o[0]));
      b.addEventListener('click', function(){ cur = o[0]; try { localStorage.setItem(KEY, cur); } catch(e){} apply(cur); if (document.querySelector('canvas[data-hero-shader]')) { location.reload(); return; } Array.prototype.forEach.call(bar.children, function(x, i){ x.setAttribute('aria-pressed', String(OPTS[i][0] === cur)); }); });
      bar.appendChild(b);
    });
    document.body.appendChild(bar);
  }
})();
