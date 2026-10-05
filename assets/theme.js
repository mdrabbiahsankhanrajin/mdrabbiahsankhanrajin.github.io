(function(){
  var root = document.documentElement;
  function get(){ return root.dataset.theme === 'light' ? 'light' : 'dark'; }
  function set(t){
    if (t === 'light') root.dataset.theme = 'light'; else delete root.dataset.theme;
    try { localStorage.setItem('theme', t); } catch(e){}
    label();
  }
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
  var btns = [];
  function label(){
    var next = get() === 'light' ? 'dark' : 'light';
    btns.forEach(function(b){ b.setAttribute('aria-label', 'Switch to ' + next + ' theme'); if (b.classList.contains('th-btn')) b.innerHTML = next === 'light' ? SUN : MOON; });
  }
  // the About page already ships the original toggle buttons; case pages and 404 get a new one
  Array.prototype.forEach.call(document.querySelectorAll('[aria-label^="Switch to"]'), function(b){ btns.push(b); });
  var top = document.querySelector('.c-top');
  if (top && !btns.length){
    var b = document.createElement('button'); b.type = 'button'; b.className = 'th-btn';
    var nav = top.querySelector('.c-nav'); if (nav) nav.appendChild(b); else top.appendChild(b);
    btns.push(b);
  }
  btns.forEach(function(b){ b.addEventListener('click', function(e){ e.preventDefault(); set(get() === 'light' ? 'dark' : 'light'); }); });
  label();
})();
