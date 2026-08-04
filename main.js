/* ==========================================================================
   Arbitrex — interaction layer

   Per ARBITREX_DESIGN_SYSTEM.md §9, motion here is deliberately quiet: one-shot
   entrances only, no scroll-driven effects, no counters, no parallax. Anything
   that would "bounce or snap" is intentionally absent.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Sticky nav — hairline + soft shadow once scrolled off the top
     --------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var ticking = false;

  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
  }

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
     Entrance reveal — §9 brand-rise, plays once per element.
     Elements start at opacity:0 in CSS, so every fallback path below
     must guarantee .is-visible is applied.
     --------------------------------------------------------------- */
  var risers = document.querySelectorAll('.rise');

  function revealAll() {
    Array.prototype.forEach.call(risers, function (el) {
      el.classList.add('is-visible');
    });
  }

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealAll();
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(risers, function (el) {
      // Gentle stagger within a row of siblings — capped so later cards
      // never feel like they are lagging behind the scroll.
      var siblings = el.parentElement ? el.parentElement.children : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      el.style.animationDelay = Math.min(index, 4) * 60 + 'ms';
      observer.observe(el);
    });

    // Safety net: if anything is still hidden after load, show it.
    window.addEventListener('load', function () {
      window.setTimeout(function () {
        Array.prototype.forEach.call(risers, function (el) {
          var box = el.getBoundingClientRect();
          if (box.top < window.innerHeight && !el.classList.contains('is-visible')) {
            el.classList.add('is-visible');
          }
        });
      }, 300);
    });
  }

  /* ---------------------------------------------------------------
     Active section highlighting in the nav
     --------------------------------------------------------------- */
  var navLinks = document.querySelectorAll('.nav__link');
  var sections = [];

  Array.prototype.forEach.call(navLinks, function (link) {
    var id = link.getAttribute('href');
    if (!id || id.charAt(0) !== '#' || id.length < 2) return;
    var section = document.querySelector(id);
    if (section) sections.push({ link: link, section: section });
  });

  if (sections.length && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sections.forEach(function (pair) {
          pair.link.classList.toggle('is-active', pair.section === entry.target);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (pair) { sectionObserver.observe(pair.section); });
  }

  /* ---------------------------------------------------------------
     Footer year
     --------------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
