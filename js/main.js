/* ==============================================
   CATHEDRAL CYBER â MAIN SCRIPTS
   ============================================== */

(function () {
  'use strict';

  /* âââââââââââ Loader âââââââââââ */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Artificial delay: deliberate, not rushed
    window.addEventListener('load', function () {
      window.setTimeout(function () {
        loader.classList.add('is-hidden');
        // Start typewriter after loader clears
        initTypewriter();
      }, 800);
    });
  }

  /* âââââââââââ Typewriter Effect âââââââââââ */
  function initTypewriter() {
    const target = document.querySelector('.typewriter-text');
    if (!target) return;

    const phrase = 'Federal cybersecurity. Offensive operations. Compliance intelligence.';
    let i = 0;
    const speed = 80; // ms per character â deliberate, not frantic

    function typeStep() {
      if (i < phrase.length) {
        target.textContent += phrase.charAt(i);
        i++;
        window.setTimeout(typeStep, speed);
      }
    }

    typeStep();
  }

  /* âââââââââââ Scroll Fade-In âââââââââââ */
  function initScrollFadeIn() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      document.querySelectorAll('.fade-on-scroll').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-on-scroll').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* âââââââââââ Nav Scroll Spy âââââââââââ */
  function initScrollSpy() {
    const nav = document.getElementById('nav');
    const links = document.querySelectorAll('.nav-links a');
    if (!nav || links.length === 0) return;

    const sections = {};
    document.querySelectorAll('section[id]').forEach(function (sec) {
      sections[sec.id] = sec;
    });

    const sectionKeys = Object.keys(sections);

    // Scroll class for nav background
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }

      // Determine active section
      let current = '';
      sectionKeys.forEach(function (id) {
        const sec = sections[id];
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 100) {
          current = id;
        }
      });

      // Highlight nav link
      links.forEach(function (link) {
        link.classList.remove('is-active');
        if (link.dataset.section === current) {
          link.classList.add('is-active');
        }
      });
    });

    // Smooth scroll + close mobile menu on click
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const id = link.getAttribute('href').replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          const offset = nav.offsetHeight + 16;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
        // Close mobile menu
        const linksContainer = document.getElementById('nav-links');
        if (linksContainer) {
          linksContainer.classList.remove('is-open');
        }
        const toggle = document.getElementById('nav-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Mobile toggle
    const toggle = document.getElementById('nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        const linksContainer = document.getElementById('nav-links');
        const isOpen = linksContainer.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  }

  /* âââââââââââ Form Validation âââââââââââ */
  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const fields = form.querySelectorAll('input[required], textarea[required]');

      fields.forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (isValid) {
        // For static site: generic confirmation, no sensitive data transmitted
        // Security: no error leakage, no raw input echo
        alert('TRANSMISSION RECEIVED');
        form.reset();
      }
    });

    // Remove invalid state on input
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('is-invalid');
      });
    });
  }

  /* âââââââââââ Add fade-on-scroll class to sections âââââââââââ */
  function initFadeTargets() {
    document.querySelectorAll('.about-inner, .services > h2, .services-grid, ' +
      '.tools > h2, .tools-grid, .contact > h2, #contact-form, footer').forEach(function (el) {
      el.classList.add('fade-on-scroll');
    });
  }

  /* âââââââââââ Initialize âââââââââââ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initLoader();
      initScrollFadeIn();
      initScrollSpy();
      initForm();
      initFadeTargets();
    });
  } else {
    initLoader();
    initScrollFadeIn();
    initScrollSpy();
    initForm();
    initFadeTargets();
  }
})();
