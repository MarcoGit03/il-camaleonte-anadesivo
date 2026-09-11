var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cascading scroll-reveal
if (!reduceMotion) {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.stagger').forEach(function(el){ io.observe(el); });
} else {
  document.querySelectorAll('.stagger').forEach(function(el){ el.classList.add('in-view'); });
}

// Gentle hero parallax (only on pages that have a #hero section; disabled for reduced motion)
if (!reduceMotion) {
  var hero = document.getElementById('hero');
  if (hero) {
    var layers = document.querySelectorAll('[data-parallax]');
    var ticking = false;
    function updateParallax(){
      var rect = hero.getBoundingClientRect();
      var progress = Math.max(0, -rect.top);
      layers.forEach(function(el){
        var factor = parseFloat(el.getAttribute('data-parallax')) || 0;
        el.style.transform = 'translateY(' + (progress * factor) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if (!ticking){ requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive:true });
    updateParallax();
  }
}
