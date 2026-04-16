/* ============================================================
   COASTAL PEDIATRIC DENTISTRY — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {


    /* ── 1. SCROLL REVEAL ──────────────────────────────────── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    /* ── 2. STICKY HEADER SHADOW ON SCROLL ─────────────────── */
    const header = document.getElementById('site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });


    /* ── 3. BACK TO TOP BUTTON ─────────────────────────────── */
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* ── 4. MOBILE NAV TOGGLE ──────────────────────────────── */
    const navToggle = document.getElementById('nav-toggle');
    const navList   = document.getElementById('nav-list');

    navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a non-dropdown link is clicked
    navList.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', false);
        });
    });


    /* ── 5. MOBILE DROPDOWN ACCORDION ─────────────────────── */
    // On mobile, tapping a dropdown trigger toggles it instead of navigating
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Only intercept on mobile (nav is in column layout)
            if (window.innerWidth > 700) return;

            e.preventDefault();
            const parent = trigger.closest('.has-dropdown');
            const isOpen = parent.classList.toggle('open');

            // Close all other open dropdowns
            document.querySelectorAll('.has-dropdown.open').forEach(other => {
                if (other !== parent) other.classList.remove('open');
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown.open').forEach(el => {
                el.classList.remove('open');
            });
        }
    });


    /* ── 6. SMOOTH ANCHOR SCROLL (for on-page links) ───────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });


    /* ── 7. HERO CARD STAGGER ANIMATION ───────────────────── */
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = `opacity .5s ease ${0.3 + i * 0.1}s, transform .5s ease ${0.3 + i * 0.1}s`;

        // Trigger after a short delay so CSS transition fires
        requestAnimationFrame(() => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        });
    });


    /* ── 8. ACTIVE NAV LINK HIGHLIGHT ─────────────────────── */
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-list > li > a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath === linkPath) {
            link.style.background = 'rgba(255,255,255,.15)';
            link.style.color = '#fff';
        }
    });


});
