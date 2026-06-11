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
       6. Constellation effect (AI/Neural network inspired)
    ---------------------------------------------------------------- */
    const constellationContainer = $('#constellation');
    const canvas = $('#constellationCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;

    // Global page constellation
    const pageCanvas = $('#pageConstellationCanvas');
    const pageCtx = pageCanvas ? pageCanvas.getContext('2d') : null;

    let stars = [];
    let pageStars = [];
    let mouse = { x: null, y: null, radius: 150 };
    let pageMouse = { x: null, y: null, radius: 150 };
    let animationId = null;
    let pageAnimationId = null;

    const STAR_COUNT = 80;
    const CONNECTION_DISTANCE = 120;
    const MOUSE_INFLUENCE_RADIUS = 200;

    function resizeCanvas() {
        if (!canvas || !constellationContainer) return;
        canvas.width = constellationContainer.offsetWidth;
        canvas.height = constellationContainer.offsetHeight;
    }

    function resizePageCanvas() {
        if (!pageCanvas) return;
        pageCanvas.width = window.innerWidth;
        pageCanvas.height = window.innerHeight;
    }

    class Star {
        constructor(targetCtx, targetCanvas, mouseObj) {
            this.ctx = targetCtx;
            this.canvas = targetCanvas;
            this.mouse = mouseObj;
            this.reset();
        }

        reset() {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.hue = Math.random() > 0.5 ? 250 : 270; // purple-blue
        }

        update() {
            // Mouse influence - repel/attract
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.x - this.mouse.x;
                const dy = this.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_INFLUENCE_RADIUS) {
                    const force = (MOUSE_INFLUENCE_RADIUS - dist) / MOUSE_INFLUENCE_RADIUS;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 0.8;
                    this.y += Math.sin(angle) * force * 0.8;
                }
            }

            // Gentle drift
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x < 0) this.x = this.canvas.width;
            if (this.x > this.canvas.width) this.x = 0;
            if (this.y < 0) this.y = this.canvas.height;
            if (this.y > this.canvas.height) this.y = 0;
        }

        draw() {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.opacity})`;
            this.ctx.fill();

            // Glow
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = `hsla(${this.hue}, 70%, 65%, 0.5)`;
        }
    }

    function drawConnections(targetStars, targetCtx) {
        for (let i = 0; i < targetStars.length; i++) {
            for (let j = i + 1; j < targetStars.length; j++) {
                const dx = targetStars[i].x - targetStars[j].x;
                const dy = targetStars[i].y - targetStars[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DISTANCE) {
                    const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.4;
                    targetCtx.beginPath();
                    targetCtx.moveTo(targetStars[i].x, targetStars[i].y);
                    targetCtx.lineTo(targetStars[j].x, targetStars[j].y);

                    // Gradient line for depth
                    const gradient = targetCtx.createLinearGradient(
                        targetStars[i].x, targetStars[i].y, targetStars[j].x, targetStars[j].y
                    );
                    gradient.addColorStop(0, `hsla(250, 70%, 65%, ${opacity})`);
                    gradient.addColorStop(1, `hsla(270, 70%, 65%, ${opacity * 0.5})`);

                    targetCtx.strokeStyle = gradient;
                    targetCtx.lineWidth = 1;
                    targetCtx.stroke();
                }
            }
        }
    }

    function animate() {
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw stars
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        // Draw connections
        drawConnections(stars, ctx);

        animationId = requestAnimationFrame(animate);
    }

    function animatePageStars() {
        if (!pageCtx) return;

        pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);

        // Update and draw stars
        pageStars.forEach(star => {
            star.update();
            star.draw();
        });

        // Draw connections
        drawConnections(pageStars, pageCtx);

        pageAnimationId = requestAnimationFrame(animatePageStars);
    }

    function initConstellation() {
        if (!canvas || !constellationContainer || prefersReducedMotion) return;

        resizeCanvas();
        stars = [];

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(new Star(ctx, canvas, mouse));
        }

        // Mouse tracking for hero canvas
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Start animation
        if (animationId) cancelAnimationFrame(animationId);
        animate();
    }

    function initPageConstellation() {
        if (!pageCanvas || !pageCtx || prefersReducedMotion) return;

        resizePageCanvas();
        pageStars = [];

        for (let i = 0; i < STAR_COUNT; i++) {
            pageStars.push(new Star(pageCtx, pageCanvas, pageMouse));
        }

        // Mouse tracking for page canvas (uses viewport coordinates directly)
        window.addEventListener('mousemove', (e) => {
            pageMouse.x = e.clientX;
            pageMouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            pageMouse.x = null;
            pageMouse.y = null;
        });

        // Start animation
        if (pageAnimationId) cancelAnimationFrame(pageAnimationId);
        animatePageStars();
    }

    initConstellation();
    initPageConstellation();

    // Resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resizeCanvas();
            resizePageCanvas();
            // Reinitialize stars on resize
            stars.forEach(star => star.reset());
            pageStars.forEach(star => star.reset());
        }, 250);
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

    /* ----------------------------------------------------------------
       11. CV download dropdown (hero)
    ---------------------------------------------------------------- */
    const cvDropdown = document.querySelector('.cv-dropdown');
    const cvTrigger = cvDropdown && cvDropdown.querySelector('.cv-trigger');
    const cvMenu = cvDropdown && cvDropdown.querySelector('.cv-menu');

    function closeCvMenu() {
        if (!cvDropdown) return;
        cvDropdown.classList.remove('is-open');
        if (cvTrigger) cvTrigger.setAttribute('aria-expanded', 'false');
        if (cvMenu) cvMenu.setAttribute('aria-hidden', 'true');
        document.removeEventListener('click', onCvDocClick);
        document.removeEventListener('keydown', onCvKey);
    }

    function openCvMenu() {
        if (!cvDropdown) return;
        cvDropdown.classList.add('is-open');
        if (cvTrigger) cvTrigger.setAttribute('aria-expanded', 'true');
        if (cvMenu) cvMenu.setAttribute('aria-hidden', 'false');
        setTimeout(() => {
            document.addEventListener('click', onCvDocClick);
            document.addEventListener('keydown', onCvKey);
        }, 0);
    }

    function onCvDocClick(e) {
        if (!cvDropdown.contains(e.target)) closeCvMenu();
    }

    function onCvKey(e) {
        if (e.key === 'Escape') closeCvMenu();
    }

    if (cvTrigger) {
        cvTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (cvDropdown.classList.contains('is-open')) closeCvMenu();
            else openCvMenu();
        });
    }
})();
