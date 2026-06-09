/* ============================================================
   Matheus Fabio — Landing Page
   Vanilla JS · No dependencies
   ============================================================ */

(function () {
    'use strict';

    /* ----------------------------------------------------------------
       Helpers
    ---------------------------------------------------------------- */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ----------------------------------------------------------------
       1. Mobile menu toggle
    ---------------------------------------------------------------- */
    const navToggle = $('#navToggle');
    const navLinks = $('#navLinks');
    const body = document.body;

    function closeMenu() {
        if (!navToggle || !navLinks) return;
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        navLinks.classList.remove('is-open');
        body.classList.remove('menu-open');
    }

    function openMenu() {
        if (!navToggle || !navLinks) return;
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close menu');
        navLinks.classList.add('is-open');
        body.classList.add('menu-open');
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            if (isOpen) closeMenu();
            else openMenu();
        });

        // Close menu when a link is clicked
        $$('.nav-link', navLinks).forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
                closeMenu();
            }
        });

        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (!navLinks.classList.contains('is-open')) return;
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    /* ----------------------------------------------------------------
       2. Navbar scroll state (transparent → blurred)
    ---------------------------------------------------------------- */
    const navbar = $('#navbar');
    let lastScrollY = 0;
    let ticking = false;

    function updateNavbar() {
        if (!navbar) return;
        if (lastScrollY > 24) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener(
        'scroll',
        () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        },
        { passive: true }
    );

    /* ----------------------------------------------------------------
       3. Active section indicator (IntersectionObserver)
    ---------------------------------------------------------------- */
    const sectionIds = ['about', 'projects', 'skills', 'experience', 'contact'];
    const navLinkMap = new Map();

    sectionIds.forEach((id) => {
        const link = $(`.nav-link[data-section="${id}"]`);
        if (link) navLinkMap.set(id, link);
    });

    if ('IntersectionObserver' in window && navLinkMap.size > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navLinkMap.forEach((link) => link.classList.remove('active'));
                        const activeLink = navLinkMap.get(id);
                        if (activeLink) activeLink.classList.add('active');
                    }
                });
            },
            {
                rootMargin: '-40% 0px -55% 0px',
                threshold: 0,
            }
        );

        sectionIds.forEach((id) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    }

    /* ----------------------------------------------------------------
       4. Reveal on scroll (IntersectionObserver)
    ---------------------------------------------------------------- */
    const revealEls = $$('.reveal');

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = parseInt(entry.target.dataset.revealDelay || '0', 10);
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, delay);
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.05,
            }
        );

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        // Reduced motion / no support: show everything
        revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    /* ----------------------------------------------------------------
       5. Animated counters (stats bar)
    ---------------------------------------------------------------- */
    function animateCount(el, target, duration, suffix = '') {
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);
            el.textContent = value + suffix;
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(tick);
    }

    const counterEls = $$('[data-counter]');

    if ('IntersectionObserver' in window && counterEls.length > 0) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const valueEl = entry.target.querySelector('.stat-value');
                        if (!valueEl) return;
                        const target = parseInt(valueEl.dataset.target || '0', 10);
                        const suffix = valueEl.dataset.suffix || '';
                        if (target > 0 && !prefersReducedMotion) {
                            animateCount(valueEl, target, 1500, suffix);
                        } else if (target > 0) {
                            valueEl.textContent = target + suffix;
                        }
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counterEls.forEach((el) => counterObserver.observe(el));
    }

    /* ----------------------------------------------------------------
       6. Floating particles (hero background)
    ---------------------------------------------------------------- */
    const particlesContainer = $('#particles');

    function createParticles() {
        if (!particlesContainer || prefersReducedMotion) return;

        // Detect mobile to reduce particle count
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 18 : 36;

        // Clear any existing
        particlesContainer.innerHTML = '';

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'particle';
            const size = 2 + Math.random() * 3; // 2–5px
            const left = Math.random() * 100;   // 0–100%
            const duration = 12 + Math.random() * 18; // 12–30s
            const delay = -Math.random() * duration;   // negative so they start mid-cycle
            const drift = (Math.random() - 0.5) * 80; // -40 to 40 px
            const hue = Math.random() > 0.5 ? '99, 102, 241' : '168, 85, 247';

            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${left}%`;
            p.style.bottom = `-10px`;
            p.style.animationDuration = `${duration}s`;
            p.style.animationDelay = `${delay}s`;
            p.style.setProperty('--drift', `${drift}px`);
            p.style.background = `rgb(${hue})`;
            p.style.boxShadow = `0 0 ${size * 2}px rgba(${hue}, 0.6)`;
            fragment.appendChild(p);
        }
        particlesContainer.appendChild(fragment);
    }

    createParticles();

    // Recreate on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createParticles, 250);
    });

    /* ----------------------------------------------------------------
       7. Smooth scroll with offset for older browsers
       (modern browsers handle CSS scroll-behavior + scroll-padding)
    ---------------------------------------------------------------- */
    $$('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ----------------------------------------------------------------
       8. Footer year
    ---------------------------------------------------------------- */
    const yearEl = $('#year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------------
       9. Subtle parallax on hero orbs (mouse)
    ---------------------------------------------------------------- */
    if (!prefersReducedMotion) {
        const heroSection = $('#hero');
        const orbs = $$('.hero-bg .orb');

        if (heroSection && orbs.length > 0 && window.matchMedia('(hover: hover)').matches) {
            let mouseX = 0;
            let mouseY = 0;
            let targetX = 0;
            let targetY = 0;
            let rafId = null;

            function animateOrbs() {
                targetX += (mouseX - targetX) * 0.08;
                targetY += (mouseY - targetY) * 0.08;
                orbs.forEach((orb, i) => {
                    const factor = (i + 1) * 12;
                    orb.style.translate = `${targetX * factor}px ${targetY * factor}px`;
                });
                rafId = requestAnimationFrame(animateOrbs);
            }

            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                if (!rafId) animateOrbs();
            });

            heroSection.addEventListener('mouseleave', () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                mouseX = 0;
                mouseY = 0;
                orbs.forEach((orb) => {
                    orb.style.translate = '0 0';
                });
            });
        }
    }
})();
