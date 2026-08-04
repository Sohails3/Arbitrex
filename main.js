/* ==========================================================================
   Arbitrex — interaction layer
   Dependency-free. All motion respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Sticky nav — add glass background once scrolled past the top
     --------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('scrollProgress');

  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 24);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = 'scaleX(' + pct + ')';
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function closeMenu() {
    if (!links || !toggle) return;
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', function (e) {
      if (!links.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
  }

  /* ---------------------------------------------------------------
     Scroll reveal + one-shot triggers (chart draw, step rules)
     --------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll('.reveal, .step, .panel');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    // Stagger siblings so grids cascade rather than popping in together
    Array.prototype.forEach.call(revealTargets, function (el) {
      var siblings = el.parentElement ? el.parentElement.children : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      el.style.transitionDelay = Math.min(index, 6) * 70 + 'ms';
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------
     Count-up numbers — runs once when the figure scrolls into view
     --------------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');

  function renderCount(el, value, decimals, suffix) {
    el.textContent = value.toFixed(decimals) + suffix;
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;

    if (isNaN(target)) return;
    if (reduceMotion) {
      renderCount(el, target, decimals, suffix);
      return;
    }

    var duration = 1600;
    var start = null;

    function frame(timestamp) {
      if (start === null) start = timestamp;
      var elapsed = timestamp - start;
      var t = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - t, 4); // expo-ish ease-out
      renderCount(el, target * eased, decimals, suffix);
      if (t < 1) window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  }

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(counters, animateCount);
  } else {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    Array.prototype.forEach.call(counters, function (el) {
      countObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------
     Card spotlight — track the cursor within each card
     --------------------------------------------------------------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    Array.prototype.forEach.call(document.querySelectorAll('.card'), function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  }

  /* ---------------------------------------------------------------
     Footer year
     --------------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
