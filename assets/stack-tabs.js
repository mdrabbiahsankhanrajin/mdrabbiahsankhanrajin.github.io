(function(){
  var CAT = {
    'React':'Frontend','TypeScript':'Frontend','Next.js':'Frontend','Tailwind CSS':'Frontend','Three.js':'Frontend','GSAP':'Frontend',
    'Node.js':'Backend and data','Supabase':'Backend and data','Firebase':'Backend and data',
    'Flutter':'Mobile','Capacitor':'Mobile','Vercel':'Hosting',
    'Google Analytics':'Analytics','Meta Pixel':'Analytics',
    'Claude (AI-assisted build)':'AI','OpenAI (ChatGPT + Codex)':'AI'
  };
  var grid = document.querySelector('[class*="toolsGrid"]'); if (!grid) return;
  var tools = Array.prototype.slice.call(grid.children);
  var names = ['All'];
  tools.forEach(function(t){ var c = CAT[t.getAttribute('title')]; t.setAttribute('data-cat', c || ''); if (c && names.indexOf(c) < 0) names.push(c); });
  var ul = document.createElement('ul'); ul.className = 'st-tabs'; ul.setAttribute('aria-label', 'Filter the stack');
  names.forEach(function(n, i){
    var li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.textContent = n; b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function(){
      Array.prototype.forEach.call(ul.querySelectorAll('button'), function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      tools.forEach(function(t){ t.classList.toggle('st-off', n !== 'All' && t.getAttribute('data-cat') !== n); });
    });
    li.appendChild(b); ul.appendChild(li);
  });
  grid.parentNode.insertBefore(ul, grid);
})();
