(function(){
  // "Built with" strip, added after hydration so React's tree is untouched.
  var TOOLS = [['React','react'],['TypeScript','typescript'],['Next.js','nextjs'],['Node.js','nodejs'],['Tailwind CSS','tailwindcss'],['Vercel','vercel'],['Supabase','supabase'],['Firebase','firebase'],
               ['Flutter','flutter'],['Capacitor','capacitor'],['Three.js','threejs'],['GSAP','gsap'],['Google Analytics','google-analytics'],['Meta Pixel','meta-pixel'],['Claude','claude'],['OpenAI','openai']];
  var css = '.bw{padding:clamp(4rem,10vw,9rem) 0;color:#fff}.bw-in{max-width:80rem;margin:0 auto;padding:0 clamp(1.25rem,4vw,3rem)}'
    + '.bw h2{font:400 clamp(2rem,4.5vw,3.5rem)/1.05 var(--font-serif,"manier",serif);margin:0 0 .75rem}.bw h2 em{font-style:italic}'
    + '.bw p{font-weight:300;opacity:.7;max-width:34rem;margin:0 0 2.5rem;line-height:1.5}'
    + '.bw ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:1.25rem 1rem}'
    + '.bw li{display:flex;flex-direction:column;align-items:center;gap:.6rem;font-size:.8125rem;font-weight:300}'
    + '.bw li span{display:flex;align-items:center;justify-content:center;width:100%;aspect-ratio:1;background:#fff;border-radius:.75rem;transition:transform .35s cubic-bezier(.16,1,.3,1)}'
    + '.bw li:hover span{transform:translateY(-4px)}.bw img{max-width:2.6rem;max-height:2.6rem;object-fit:contain}'
    + '@media(max-width:800px){.bw ul{grid-template-columns:repeat(4,minmax(0,1fr))}}';
  function add(){
    if (document.querySelector('.bw')) return;
    var main = document.querySelector('main'), spacer = main && main.querySelector(':scope > .pin-spacer:last-of-type') || null;
    var tst = document.querySelector('[class*="Testimonials-module"][class*="testimonials"]');
    var anchor = tst && (tst.closest('.pin-spacer') || tst);
    if (!anchor || !anchor.parentNode) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var sec = document.createElement('section'); sec.className = 'bw'; sec.setAttribute('aria-label', 'Built with');
    sec.innerHTML = '<div class="bw-in"><h2>Built <em>with</em></h2><p>The tools behind every project here, picked for shipping fast and keeping it solid.</p><ul>'
      + TOOLS.map(function(t){ return '<li><span><img src="/assets/stack/' + t[1] + '.svg" alt="" loading="lazy"/></span>' + t[0] + '</li>'; }).join('') + '</ul></div>';
    anchor.parentNode.insertBefore(sec, anchor.nextSibling);
  }
  function go(){ setTimeout(add, 900); }
  if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
})();
