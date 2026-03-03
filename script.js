/* ============================================================
   SWISS AGENTS - Interactive JavaScript
   Particles, Parallax, Scroll Animations, FAQ, Navigation
   ============================================================ */

(function () {
    'use strict';

    // ── Particle System ──────────────────────────────────────
    class ParticleSystem {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.mouse = { x: -1000, y: -1000 };
            this.resize();
            this.init();
            this.bindEvents();
            this.animate();
        }

        resize() {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
        }

        init() {
            const count = Math.min(80, Math.floor((this.width * this.height) / 15000));
            this.particles = [];
            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.1,
                    color: ['#00d4ff', '#8b5cf6', '#06ffa5'][Math.floor(Math.random() * 3)]
                });
            }
        }

        bindEvents() {
            window.addEventListener('resize', () => {
                this.resize();
                this.init();
            });

            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
        }

        animate() {
            this.ctx.clearRect(0, 0, this.width, this.height);

            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = this.width;
                if (p.x > this.width) p.x = 0;
                if (p.y < 0) p.y = this.height;
                if (p.y > this.height) p.y = 0;

                // Mouse interaction
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    p.vx -= (dx / dist) * force * 0.02;
                    p.vy -= (dy / dist) * force * 0.02;
                }

                // Dampen velocity
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Draw particle
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.opacity;
                this.ctx.fill();

                // Draw connections
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p2 = this.particles[j];
                    const ddx = p.x - p2.x;
                    const ddy = p.y - p2.y;
                    const ddist = Math.sqrt(ddx * ddx + ddy * ddy);

                    if (ddist < 120) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.strokeStyle = p.color;
                        this.ctx.globalAlpha = (1 - ddist / 120) * 0.12;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                }
            }

            this.ctx.globalAlpha = 1;
            requestAnimationFrame(() => this.animate());
        }
    }

    // ── Scroll Animations (Intersection Observer) ────────────
    function initScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });
    }

    // ── Navigation ───────────────────────────────────────────
    function initNavigation() {
        const nav = document.getElementById('nav');
        const toggle = document.getElementById('navToggle');
        const links = document.getElementById('navLinks');

        // Scroll handler
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        });

        // Mobile toggle
        if (toggle) {
            toggle.addEventListener('click', () => {
                links.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link, .nav-cta').forEach((link) => {
            link.addEventListener('click', () => {
                links.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }

    // ── Smooth Scroll ────────────────────────────────────────
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }

    // ── Parallax ─────────────────────────────────────────────
    function initParallax() {
        const elements = document.querySelectorAll('[data-parallax]');
        if (!elements.length) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            elements.forEach((el) => {
                const speed = parseFloat(el.dataset.parallax);
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }

    // ── Timeline Fill ────────────────────────────────────────
    function initTimelineFill() {
        const timeline = document.querySelector('.process-timeline');
        const fill = document.getElementById('timelineFill');
        const steps = document.querySelectorAll('.process-step');
        if (!timeline || !fill) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-active');
                    }
                });
            },
            { threshold: 0.5 }
        );

        steps.forEach((step) => observer.observe(step));

        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            const timelineTop = rect.top;
            const timelineHeight = rect.height;
            const windowHeight = window.innerHeight;

            if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
                const progress = Math.min(
                    1,
                    Math.max(0, (windowHeight - timelineTop) / (timelineHeight + windowHeight * 0.5))
                );
                fill.style.height = `${progress * 100}%`;
            }
        });
    }

    // ── FAQ Accordion ────────────────────────────────────────
    function initFAQ() {
        const items = Array.from(document.querySelectorAll('.faq-item'));
        if (!items.length) return;

        const currentTitle = document.getElementById('faqCurrentTitle');
        const currentSummary = document.getElementById('faqCurrentSummary');
        const currentIndex = document.getElementById('faqCurrentIndex');

        function setFAQAnswerHeight(item, isOpen) {
            const answer = item.querySelector('.faq-answer');
            if (!answer) return;

            if (isOpen) {
                answer.style.height = `${answer.scrollHeight}px`;
            } else {
                answer.style.height = '0px';
            }
        }

        function updateFAQRail(item) {
            if (!item) return;

            const title = item.querySelector('.faq-question-text');
            if (currentTitle && title) {
                currentTitle.textContent = title.textContent;
            }

            if (currentSummary) {
                currentSummary.textContent = item.dataset.faqSummary || 'Die wichtigsten Antworten auf einen Blick.';
            }

            if (currentIndex) {
                currentIndex.textContent = item.dataset.faqIndex || '01';
            }
        }

        const initialActive = items.find((item) => item.classList.contains('active')) || items[0];
        initialActive.classList.add('active');
        const initialButton = initialActive.querySelector('.faq-question');
        if (initialButton) {
            initialButton.setAttribute('aria-expanded', 'true');
        }
        setFAQAnswerHeight(initialActive, true);
        updateFAQRail(initialActive);

        items.forEach((item) => {
            const btn = item.querySelector('.faq-question');
            if (!btn) return;

            btn.addEventListener('click', () => {
                // Close all
                items.forEach((i) => {
                    i.classList.remove('active');
                    i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    setFAQAnswerHeight(i, false);
                });

                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                setFAQAnswerHeight(item, true);
                updateFAQRail(item);
            });
        });

        window.addEventListener('resize', () => {
            const activeItem = items.find((item) => item.classList.contains('active'));
            if (activeItem) {
                setFAQAnswerHeight(activeItem, true);
            }
        });
    }

    // ── 3D Card Tilt Effect ──────────────────────────────────
    function initCardTilt() {
        document.querySelectorAll('.module-card').forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;

                const inner = card.querySelector('.module-card-inner');
                if (inner) {
                    inner.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }

                // Move glow
                const glow = card.querySelector('.module-glow');
                if (glow) {
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.08), transparent 50%)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                const inner = card.querySelector('.module-card-inner');
                if (inner) {
                    inner.style.transform = '';
                }
            });
        });
    }

    // ── Contact Form ─────────────────────────────────────────
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const today = new Date().toISOString().split('T')[0];
        const preferredDate = document.getElementById('preferredDate');
        const preferredTime = document.getElementById('preferredTime');

        if (preferredDate) {
            preferredDate.min = today;
        }

        [preferredDate, preferredTime].forEach((input) => {
            if (!input) return;

            ['focus', 'click'].forEach((eventName) => {
                input.addEventListener(eventName, () => {
                    if (typeof input.showPicker === 'function') {
                        input.showPicker();
                    }
                });
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Gesendet!</span>';
            btn.style.background = 'linear-gradient(135deg, #06ffa5, #00d4ff)';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // ── Neon Cursor Glow (subtle) ────────────────────────────
    function initCursorGlow() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.04) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
            opacity: 0;
        `;
        document.body.appendChild(glow);

        let visible = false;
        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            if (!visible) {
                glow.style.opacity = '1';
                visible = true;
            }
        });

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
            visible = false;
        });
    }

    // ── Magnetic Buttons ─────────────────────────────────────
    function initMagneticButtons() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        document.querySelectorAll('.btn-primary').forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ── Floating CTA Visibility ──────────────────────────────
    function initFloatingCTA() {
        const cta = document.getElementById('floatingCta');
        if (!cta) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                cta.classList.add('is-visible');
            } else {
                cta.classList.remove('is-visible');
            }
        }, { passive: true });
    }

    // ── Agent Showcase Slider ───────────────────────────────
    function initAgentShowcase() {
        document.querySelectorAll('.agent-showcase').forEach((showcase) => {
            const slides = Array.from(showcase.querySelectorAll('.agent-showcase-slide'));
            const prevButton = showcase.querySelector('.agent-showcase-arrow-prev');
            const nextButton = showcase.querySelector('.agent-showcase-arrow-next');
            const interval = Number(showcase.dataset.interval) || 7000;
            let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
            let timerId = null;

            if (!slides.length) return;
            if (activeIndex < 0) activeIndex = 0;

            function setActive(index) {
                activeIndex = index;

                slides.forEach((slide, slideIndex) => {
                    slide.classList.toggle('is-active', slideIndex === index);
                    slide.setAttribute('aria-hidden', slideIndex === index ? 'false' : 'true');
                });
            }

            function stopAutoRotate() {
                if (!timerId) return;
                window.clearInterval(timerId);
                timerId = null;
            }

            function startAutoRotate() {
                stopAutoRotate();
                timerId = window.setInterval(() => {
                    setActive((activeIndex + 1) % slides.length);
                }, interval);
            }

            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    setActive((activeIndex - 1 + slides.length) % slides.length);
                    startAutoRotate();
                });
            }

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    setActive((activeIndex + 1) % slides.length);
                    startAutoRotate();
                });
            }

            showcase.addEventListener('mouseenter', stopAutoRotate);
            showcase.addEventListener('mouseleave', startAutoRotate);
            showcase.addEventListener('focusin', stopAutoRotate);
            showcase.addEventListener('focusout', (event) => {
                if (!showcase.contains(event.relatedTarget)) {
                    startAutoRotate();
                }
            });

            setActive(activeIndex);
            startAutoRotate();
        });
    }

    // ── Active Nav Link on Scroll ────────────────────────────
    function initActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach((section) => {
                const top = section.offsetTop - 120;
                if (window.pageYOffset >= top) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ── Initialize Everything ────────────────────────────────
    function init() {
        // Particle system
        const canvas = document.getElementById('particleCanvas');
        if (canvas) {
            new ParticleSystem(canvas);
        }

        initScrollAnimations();
        initNavigation();
        initSmoothScroll();
        initParallax();
        initTimelineFill();
        initFAQ();
        initCardTilt();
        initContactForm();
        initCursorGlow();
        initMagneticButtons();
        initActiveNavLink();
        initFloatingCTA();
        initAgentShowcase();
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
