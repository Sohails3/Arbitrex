/* ==========================================================================
   Arbitrex — scroll motion engine

   All scroll work runs inside a single rAF-throttled handler and only ever
   writes transforms/opacity, so nothing here triggers layout. Every effect
   degrades to a static page under prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsIO = 'IntersectionObserver' in window;

  /* ===============================================================
     1. Headline word split — wraps each word so it can rise in turn
     =============================================================== */
  function splitWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var textNodes = [];
    var node;
    while ((node = walker.nextNode())) textNodes.push(node);

    textNodes.forEach(function (textNode) {
      var parts = textNode.nodeValue.split(/(\s+)/);
      if (parts.length === 1 && !parts[0].trim()) return;

      var frag = document.createDocumentFragment();
      parts.forEach(function (part) {
        if (!part.trim()) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        var span = document.createElement('span');
        span.className = 'word';
        span.textContent = part;
        frag.appendChild(span);
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  var splitTargets = document.querySelectorAll('[data-split]');
  Array.prototype.forEach.call(splitTargets, function (el) {
    if (reduce) return;
    splitWords(el);
  });

  // Stagger the hero words in on load
  var heroWords = document.querySelectorAll('[data-split] .word');
  if (reduce) {
    Array.prototype.forEach.call(heroWords, function (w) { w.classList.add('is-visible'); });
  } else {
    Array.prototype.forEach.call(heroWords, function (w, i) {
      w.style.transitionDelay = (120 + i * 45) + 'ms';
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { w.classList.add('is-visible'); });
      });
    });
  }

  /* ===============================================================
     2. Reveal on scroll
     =============================================================== */
  var movers = document.querySelectorAll('.m');

  function revealAll() {
    Array.prototype.forEach.call(movers, function (el) { el.classList.add('is-visible'); });
  }

  if (!supportsIO || reduce) {
    revealAll();
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
        window.setTimeout(function () {
          entry.target.classList.add('is-visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(movers, function (el) { revealObserver.observe(el); });

    // Anything already on screen at load reveals immediately rather than
    // waiting for a scroll that may never come on a short viewport.
    window.addEventListener('load', function () {
      window.setTimeout(function () {
        Array.prototype.forEach.call(movers, function (el) {
          if (el.classList.contains('is-visible')) return;
          var box = el.getBoundingClientRect();
          if (box.top < window.innerHeight) el.classList.add('is-visible');
        });
      }, 400);
    });
  }

  /* ===============================================================
     3. Count-up figures
     =============================================================== */
  function animateCount(el) {
    var raw = el.getAttribute('data-count');
    var target = parseFloat(raw);
    if (isNaN(target)) return;

    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = (raw.split('.')[1] || '').length;

    if (reduce) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    var duration = 1500;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 4);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll('[data-count]');
  if (!supportsIO) {
    Array.prototype.forEach.call(counters, animateCount);
  } else {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (el) { countObserver.observe(el); });
  }

  /* ===============================================================
     4. Pinned frames — step in view drives which frame is shown
     =============================================================== */
  var steps = document.querySelectorAll('.frame-step');
  var frames = document.querySelectorAll('.frame');

  function setFrame(index) {
    Array.prototype.forEach.call(frames, function (f) {
      f.classList.toggle('is-active', Number(f.getAttribute('data-frame')) === index);
    });
    Array.prototype.forEach.call(steps, function (s) {
      s.classList.toggle('is-active', Number(s.getAttribute('data-frame')) === index);
    });
  }

  if (steps.length && frames.length) {
    if (reduce || !supportsIO) {
      // Show everything; CSS un-stacks the frames in the reduced-motion block.
      Array.prototype.forEach.call(steps, function (s) { s.classList.add('is-active'); });
      Array.prototype.forEach.call(frames, function (f) { f.classList.add('is-active'); });
    } else {
      setFrame(0);
      var frameObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          setFrame(Number(entry.target.getAttribute('data-frame')));
        });
      }, { rootMargin: '-45% 0px -45% 0px' });

      Array.prototype.forEach.call(steps, function (s) { frameObserver.observe(s); });
    }
  }

  /* ===============================================================
     5. Nav behaviour, parallax and progress — one rAF loop
     =============================================================== */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  var heroVisual = document.getElementById('heroVisual');
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;

    if (nav) {
      nav.classList.toggle('is-stuck', y > 8);
      // Hide on the way down, reveal the instant the user scrolls up.
      var menuOpen = links && links.classList.contains('is-open');
      if (!menuOpen && y > 240 && y > lastY + 4) {
        nav.classList.add('is-hidden');
      } else if (y < lastY - 4 || y <= 240) {
        nav.classList.remove('is-hidden');
      }
    }

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }

    if (heroVisual && !reduce && window.innerWidth > 1024) {
      // Small counter-drift; capped so the panel never separates from its column.
      var shift = Math.max(-40, Math.min(40, y * -0.06));
      heroVisual.style.setProperty('--parallax', shift.toFixed(1) + 'px');
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScroll);
  }, { passive: true });

  /* ===============================================================
     6. Mobile menu
     =============================================================== */
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
      if (open && nav) nav.classList.remove('is-hidden');
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

  /* ===============================================================
     7. Active nav link
     =============================================================== */
  var navLinks = document.querySelectorAll('.nav__link');
  var pairs = [];

  Array.prototype.forEach.call(navLinks, function (link) {
    var id = link.getAttribute('href');
    if (!id || id.charAt(0) !== '#' || id.length < 2) return;
    var section = document.querySelector(id);
    if (section) pairs.push({ link: link, section: section });
  });

  if (pairs.length && supportsIO) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        pairs.forEach(function (p) {
          p.link.classList.toggle('is-active', p.section === entry.target);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    pairs.forEach(function (p) { sectionObserver.observe(p.section); });
  }

  /* ===============================================================
     8. Footer year
     =============================================================== */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  onScroll();
})();
