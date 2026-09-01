/* ============================================================
   SOLTOR VI — Day chapters runtime (homepage only)
   Phase detection, entrance reveals, dusk contact form.
   ============================================================ */
(function () {
    'use strict';

    const main = document.getElementById('day');
    if (!main) return;

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PHASES = ['sunrise', 'morning', 'midday', 'golden', 'dusk'];
    const counter = document.getElementById('day-counter');

    // ==========================================
    // 1. Phase detection — drives the palette
    // ==========================================
    const chapters = main.querySelectorAll('.day-ch[data-phase-name]');
    if (chapters.length) {
        main.dataset.phase = chapters[0].dataset.phaseName || 'sunrise';

        const phaseObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const phase = entry.target.dataset.phaseName;
                main.dataset.phase = phase;
                if (counter) {
                    const i = PHASES.indexOf(phase);
                    counter.textContent = String(i + 1).padStart(2, '0') + ' / 05';
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px' });

        chapters.forEach((section) => phaseObserver.observe(section));
    }

    // ==========================================
    // 2. Scroll progress hairline
    // ==========================================
    const progressBar = document.getElementById('day-progress-bar');
    let progressRaf = 0;
    const paintProgress = () => {
        progressRaf = 0;
        if (!progressBar) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        progressBar.style.width = (p * 100) + '%';
    };
    const onScroll = () => { if (!progressRaf) progressRaf = requestAnimationFrame(paintProgress); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    paintProgress();

    // ==========================================
    // 3. Entrance reveals (.rv → .is-in)
    // ==========================================
    const revealEls = main.querySelectorAll('.rv');
    if (REDUCED) {
        revealEls.forEach((el) => el.classList.add('is-in'));
    } else if (revealEls.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach((el) => revealObserver.observe(el));
    }

    // ==========================================
    // 3. Dusk contact form (same conventions as main.js)
    // ==========================================
    const form = document.getElementById('day-form');
    const success = document.getElementById('day-form-success');
    if (form && success) {
        const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            form.querySelectorAll('.error').forEach((el) => el.classList.remove('error'));
            form.querySelectorAll('.form-error').forEach((el) => el.remove());

            let isValid = true;
            let firstInvalid = null;

            form.querySelectorAll('input[required], textarea[required]').forEach((input) => {
                const value = input.value.trim();
                let hasError = false;
                let errorMsg = 'This field is required';

                if (value === '') {
                    hasError = true;
                } else if (input.type === 'email' && !emailOk(value)) {
                    hasError = true;
                    errorMsg = 'Please enter a valid email address';
                }

                if (hasError) {
                    isValid = false;
                    input.classList.add('error');
                    const err = document.createElement('span');
                    err.className = 'form-error';
                    err.textContent = errorMsg;
                    input.parentNode.appendChild(err);
                    if (!firstInvalid) firstInvalid = input;
                }
            });

            if (!isValid) {
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            form.hidden = true;
            success.hidden = false;
        });
    }
})();