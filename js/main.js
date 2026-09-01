/**
 * Soltor Capital - Main JavaScript File
 * Handles all interactivity for the single-page corporate website.
 * No frameworks - Vanilla JS only.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. Header Scroll Effect
    // ==========================================
    const header = document.querySelector('.site-header');
    
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        // Initial check in case of page refresh partway down
        handleScroll();
        
        // Passive scroll listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ==========================================
    // 2. Mobile Menu Toggle
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    const toggleMenu = () => {
        if (!menuToggle || !mobileMenu) return;
        
        const isOpening = !mobileMenu.classList.contains('active');
        
        if (isOpening) {
            menuToggle.classList.add('active');
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent body scroll
        } else {
            closeMenu();
        }
    };

    const closeMenu = () => {
        if (!menuToggle || !mobileMenu) return;
        
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = ''; // Restore body scroll
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // ==========================================
    // 3. Smooth Scroll Navigation
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
    const headerHeight = header ? header.offsetHeight : 80;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Only handle internal # links
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    closeMenu();
                    
                    // Smooth scroll with offset
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // 4. Active Nav Link on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: `-${headerHeight}px 0px -60% 0px`, // Adjust for header and viewport center
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (!href || !href.startsWith('#')) return;
                        link.classList.remove('active');
                        if (href === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // ==========================================
    // 5. Fade-In Animations (IntersectionObserver)
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const fadeOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Handle staggered delay for grid children
                    const parent = entry.target.parentElement;
                    if (parent && getComputedStyle(parent).display === 'grid') {
                        const siblings = Array.from(parent.children).filter(el => el.classList.contains('fade-in'));
                        const index = siblings.indexOf(entry.target);
                        if (index > -1) {
                            const delay = Math.min(index * 0.1, 0.5);
                            entry.target.style.transitionDelay = `${delay}s`;
                        }
                    }
                    
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, fadeOptions);

        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });
    }

    // ==========================================
    // 6. Animated Counters
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const counterOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const animateCounter = (el) => {
            const originalText = el.textContent.trim();
            const hasPlus = originalText.endsWith('+');
            const target = parseInt(originalText.replace(/\D/g, ''), 10);
            
            if (isNaN(target)) return;
            
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quad
                const easeOut = progress * (2 - progress);
                const current = Math.floor(easeOut * target);
                
                el.textContent = current + (hasPlus ? '+' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target + (hasPlus ? '+' : '');
                }
            };
            
            requestAnimationFrame(updateCounter);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, counterOptions);

        statNumbers.forEach(stat => {
            counterObserver.observe(stat);
        });
    }

    // ==========================================
    // 7. Project Filtering
    // ==========================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterTabs.length > 0 && projectCards.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const filter = tab.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    // Add fade animation
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        if (filter === 'all' || category === filter) {
                            card.style.display = 'block';
                            // Trigger reflow
                            void card.offsetWidth;
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300); // Wait for fade out
                });
            });
        });
    }

    // ==========================================
    // 8. Form Validation & Handling
    // ==========================================
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const validatePhone = (phone) => {
        return phone.replace(/[^0-9+]/g, '').length >= 7;
    };

    const handleForm = (formId, successId, isQuote = false) => {
        const form = document.getElementById(formId);
        const successDiv = document.getElementById(successId);
        
        if (!form || !successDiv) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Validation
            let isValid = true;
            let firstInvalid = null;
            
            // Clear previous errors
            form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            form.querySelectorAll('.form-error').forEach(el => el.remove());
            
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                const value = input.value.trim();
                let hasError = false;
                let errorMsg = 'This field is required';
                
                if (value === '') {
                    hasError = true;
                } else if (input.type === 'email' && !validateEmail(value)) {
                    hasError = true;
                    errorMsg = 'Please enter a valid email address';
                } else if (input.type === 'tel' && !validatePhone(value)) {
                    hasError = true;
                    errorMsg = 'Please enter a valid phone number';
                }
                
                if (hasError) {
                    isValid = false;
                    input.classList.add('error');
                    
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'form-error';
                    errorSpan.textContent = errorMsg;
                    errorSpan.style.color = '#e74c3c';
                    errorSpan.style.fontSize = '0.85rem';
                    errorSpan.style.display = 'block';
                    errorSpan.style.marginTop = '0.25rem';
                    
                    input.parentNode.appendChild(errorSpan);
                    
                    if (!firstInvalid) {
                        firstInvalid = input;
                    }
                }
            });
            
            if (!isValid && firstInvalid) {
                // Scroll to first error
                const offset = firstInvalid.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top: offset, behavior: 'smooth' });
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';
                submitBtn.style.opacity = '0.7';
                submitBtn.style.cursor = 'not-allowed';
            }
            
            // Simulate API Call / Delay
            setTimeout(() => {
                // Hide form with fade
                form.style.opacity = '0';
                
                setTimeout(() => {
                    form.style.display = 'none';
                    
                    // Show success
                    successDiv.style.display = 'block';
                    // Trigger reflow
                    void successDiv.offsetWidth;
                    successDiv.classList.add('active');
                    successDiv.style.opacity = '1';
                    
                    // Special handling for Quote Reference Number
                    if (isQuote) {
                        const refElement = successDiv.querySelector('.quote-reference');
                        if (refElement) {
                            const randomNum = Math.floor(1000 + Math.random() * 9000);
                            const currentYear = new Date().getFullYear();
                            refElement.textContent = `RFQ-${currentYear}-${randomNum}`;
                        }
                    }
                    
                    // Scroll to success message
                    const offset = successDiv.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                    
                    // Reset button state for future
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.cursor = 'pointer';
                    }
                }, 300);
            }, 1500);
        });
        
        // Handle Submit Another / Reset
        const resetBtn = successDiv.querySelector('.reset-form-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                successDiv.style.opacity = '0';
                
                setTimeout(() => {
                    successDiv.style.display = 'none';
                    successDiv.classList.remove('active');
                    
                    form.reset();
                    // Remove file name displays
                    form.querySelectorAll('.file-name').forEach(el => el.remove());
                    // Remove focused states
                    form.querySelectorAll('.focused').forEach(el => el.classList.remove('focused'));
                    
                    form.style.display = 'block';
                    // Trigger reflow
                    void form.offsetWidth;
                    form.style.opacity = '1';
                }, 300);
            });
        }
    };

    handleForm('quote-form', 'quote-success', true);
    handleForm('supplier-form', 'supplier-success');
    handleForm('contract-form', 'contract-success');
    handleForm('contact-form', 'contact-success');

    // ==========================================
    // 9. File Upload Enhancement
    // ==========================================
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            let fileNameDisplay = this.parentNode.querySelector('.file-name');
            
            if (!fileNameDisplay) {
                fileNameDisplay = document.createElement('span');
                fileNameDisplay.className = 'file-name';
                fileNameDisplay.style.display = 'block';
                fileNameDisplay.style.marginTop = '0.5rem';
                fileNameDisplay.style.fontSize = '0.85rem';
                fileNameDisplay.style.color = '#555';
                this.parentNode.appendChild(fileNameDisplay);
            }
            
            if (this.files && this.files.length > 1) {
                fileNameDisplay.textContent = `${this.files.length} files selected`;
            } else if (this.files && this.files.length === 1) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = '';
            }
        });
    });

    // ==========================================
    // 10. Form Input Animations (Focus states)
    // ==========================================
    const formInputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    
    formInputs.forEach(input => {
        // Initial check for pre-filled values
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('focused');
        }
        
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // ==========================================
    // 11. Scroll-to-Top (Footer Logo)
    // ==========================================
    const footerLogo = document.querySelector('.site-footer .footer-logo, .site-footer .logo');
    if (footerLogo) {
        footerLogo.addEventListener('click', (e) => {
            // Only if it's acting as a link or explicitly clickable
            if (footerLogo.tagName.toLowerCase() === 'a' && footerLogo.getAttribute('href') === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ==========================================
    // 12. Current Year Update
    // ==========================================
    const copyrightYearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    copyrightYearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Fallback: If no class is used, look for text like '© 2023'
    const copyrightTexts = document.querySelectorAll('.copyright-text, .footer-bottom p');
    copyrightTexts.forEach(el => {
        if (el.textContent.includes('©')) {
            el.innerHTML = el.innerHTML.replace(/©\s*\d{4}/, `© ${currentYear}`);
        }
    });

    // ==========================================
    // 13. WhatsApp Links
    // ==========================================
    const waLinks = document.querySelectorAll('a[href*="whatsapp.com"], a[href*="wa.me"], .whatsapp-link');
    const placeholderPhone = '1234567890'; // Replace with actual number in prod
    
    waLinks.forEach(link => {
        if (link.getAttribute('href') === '#' || !link.getAttribute('href')) {
            link.setAttribute('href', `https://wa.me/${placeholderPhone}`);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ==========================================
    // 14. Keyboard Accessibility (Escape Key)
    // ==========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close contact modal first
            const cm = document.getElementById('contact-modal');
            if (cm && cm.classList.contains('is-open')) {
                closeContactModal();
                return;
            }
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMenu();
                if (menuToggle) {
                    menuToggle.focus();
                }
            }
        }
    });

    // ==========================================
    // 15. Live Market Ticker (hero widget)
    // ==========================================
    const tickerTrack = document.getElementById('hero-ticker-track');
    if (tickerTrack) {
        const tickerItems = [
            { label: 'BRENT', price: 84.12, unit: '/bbl', change: 1.2 },
            { label: 'WTI', price: 79.45, unit: '/bbl', change: -0.4 },
            { label: 'PMS', price: 1.18, unit: '/L', change: 0.6 },
            { label: 'JET A-1', price: 2.42, unit: '/L', change: 0.3 },
            { label: 'LPG', price: 0.92, unit: '/kg', change: -0.2 },
            { label: 'AGO DIESEL', price: 1.31, unit: '/L', change: 0.9 },
            { label: 'USD/NGN', price: 1485.20, unit: '', change: 0.1 },
            { label: 'EUR/NGN', price: 1612.80, unit: '', change: -0.3 }
        ];
        const fmt = (n) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const renderItem = (it) => {
            const dir = it.change > 0.05 ? 't-up' : it.change < -0.05 ? 't-down' : 't-flat';
            const arrow = it.change > 0.05 ? '▲' : it.change < -0.05 ? '▼' : '■';
            const pct = Math.abs(it.change).toFixed(1);
            return `<span class="hero-ticker-item"><strong>${it.label}</strong> $${fmt(it.price)}${it.unit} <span class="${dir}">${arrow} ${pct}%</span></span>`;
        };
        const renderTrack = () => {
            const html = tickerItems.map(renderItem).join('<span style="opacity:0.35;">\u2022</span>');
            // duplicate for seamless loop (two copies)
            tickerTrack.innerHTML = html + '<span style="opacity:0.35;">\u2022</span>' + html;
        };
        renderTrack();
        // live updates every 3.5s - small random walk (update DOM in place to keep animation smooth)
        setInterval(() => {
            tickerItems.forEach(it => {
                const vol = it.label.includes('NGN') ? 2.5 : it.label.includes('BRENT') || it.label.includes('WTI') ? 0.4 : 0.02;
                it.price = Math.max(0.2, it.price + (Math.random() - 0.5) * vol);
                it.change = (Math.random() - 0.5) * 1.6;
            });
            const items = tickerTrack.querySelectorAll('.hero-ticker-item');
            if (items.length !== tickerItems.length * 2) { renderTrack(); return; }
            tickerItems.forEach((it, i) => {
                const fmt2 = it.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                const dir2 = it.change > 0.05 ? 't-up' : it.change < -0.05 ? 't-down' : 't-flat';
                const arrow2 = it.change > 0.05 ? '\u25B2' : it.change < -0.05 ? '\u25BC' : '\u25A0';
                const pct2 = Math.abs(it.change).toFixed(1);
                const html2 = `<strong>${it.label}</strong> $${fmt2}${it.unit} <span class="${dir2}">${arrow2} ${pct2}%</span>`;
                if (items[i]) items[i].innerHTML = html2;
                if (items[i + tickerItems.length]) items[i + tickerItems.length].innerHTML = html2;
            });
        }, 3500);
        // pause on prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            tickerTrack.style.animation = 'none';
        }
    }

    // ==========================================
    // 16. Reusable Contact Modal
    // ==========================================
    let contactModal = document.getElementById('contact-modal');
    // inject modal if not present (so other pages can reuse)
    if (!contactModal) {
        const tpl = document.createElement('div');
        tpl.innerHTML = `
    <div id=\"contact-modal\" class=\"contact-modal\" aria-hidden=\"true\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"contact-modal-title\">
        <div class=\"contact-modal-backdrop\" data-close-contact></div>
        <div class=\"contact-modal-panel\" role=\"document\">
            <button type=\"button\" class=\"contact-modal-close\" aria-label=\"Close contact form\" data-close-contact>&times;</button>
            <div class=\"contact-modal-head\">
                <span class=\"eyebrow\" style=\"margin-bottom:8px;\">Get in touch — Response &lt; 48h</span>
                <h3 id=\"contact-modal-title\">Talk to the desk</h3>
                <p style=\"margin-top:6px;\">Trading, procurement &amp; contracts — one form routes to the live desk.</p>
            </div>
            <form id=\"modal-contact-form\" class=\"modal-form\" novalidate>
                <div class=\"form-row\">
                    <div class=\"form-group\"><label class=\"form-label\" for=\"modal-name\">Full Name <span class=\"req\">*</span></label><input type=\"text\" id=\"modal-name\" name=\"name\" class=\"form-input\" required autocomplete=\"name\"></div>
                    <div class=\"form-group\"><label class=\"form-label\" for=\"modal-company\">Company</label><input type=\"text\" id=\"modal-company\" name=\"company\" class=\"form-input\" autocomplete=\"organization\"></div>
                </div>
                <div class=\"form-row\">
                    <div class=\"form-group\"><label class=\"form-label\" for=\"modal-email\">Email <span class=\"req\">*</span></label><input type=\"email\" id=\"modal-email\" name=\"email\" class=\"form-input\" required autocomplete=\"email\"></div>
                    <div class=\"form-group\"><label class=\"form-label\" for=\"modal-phone\">Phone</label><input type=\"tel\" id=\"modal-phone\" name=\"phone\" class=\"form-input\" autocomplete=\"tel\"></div>
                </div>
                <div class=\"form-group\">
                    <label class=\"form-label\" for=\"modal-subject\">Subject <span class=\"req\">*</span></label>
                    <select id=\"modal-subject\" name=\"subject\" class=\"form-select\" required>
                        <option value=\"\">Select subject</option>
                        <option value=\"General Enquiry\">General Enquiry</option>
                        <option value=\"Product Enquiry\">Product Enquiry</option>
                        <option value=\"Procurement Request\">Procurement Request</option>
                        <option value=\"Partnership Opportunity\">Partnership Opportunity</option>
                        <option value=\"Supplier Enquiry\">Supplier Enquiry</option>
                        <option value=\"Other\">Other</option>
                    </select>
                </div>
                <div class=\"form-group\">
                    <label class=\"form-label\" for=\"modal-message\">Message <span class=\"req\">*</span></label>
                    <textarea id=\"modal-message\" name=\"message\" class=\"form-textarea\" rows=\"4\" required placeholder=\"How can the desk help?\"></textarea>
                </div>
                <button type=\"submit\" class=\"btn btn-primary\" style=\"width:100%;\">Send message</button>
                <p style=\"text-align:center; margin-top:10px; font-size:0.82rem; color:var(--text-faint);\">Or email <a href=\"mailto:info@soltorcapital.com\" style=\"color:var(--sky-strong); font-weight:600;\">info@soltorcapital.com</a></p>
            </form>
            <div id=\"modal-contact-success\" class=\"form-success\">
                <div class=\"form-success-icon\">✓</div>
                <h3>Message sent</h3>
                <p>Thanks for contacting Soltor Capital. The desk will reply within one business day.</p>
                <div style=\"display:flex; gap:10px; justify-content:center; margin-top:16px;\">
                    <button type=\"button\" class=\"btn btn-outline btn-sm\" data-close-contact>Close</button>
                    <button type=\"button\" class=\"btn btn-ghost btn-sm\" id=\"modal-reset-btn\">Send another</button>
                </div>
            </div>
        </div>
    </div>`;
        document.body.appendChild(tpl.firstElementChild);
        contactModal = document.getElementById('contact-modal');
    }

    const modalForm = document.getElementById('modal-contact-form');
    const modalSuccess = document.getElementById('modal-contact-success');
    const modalPanel = contactModal ? contactModal.querySelector('.contact-modal-panel') : null;
    let lastFocus = null;

    function openContactModal() {
        if (!contactModal) return;
        lastFocus = document.activeElement;
        contactModal.classList.add('is-open');
        contactModal.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
        // reset to form view
        if (modalForm) { modalForm.style.display = 'block'; modalForm.style.opacity = '1'; }
        if (modalSuccess) { modalSuccess.style.display = 'none'; modalSuccess.classList.remove('active'); modalSuccess.style.opacity = '0'; }
        setTimeout(() => {
            const first = contactModal.querySelector('input, select, textarea, button');
            if (first) first.focus();
        }, 80);
    }
    function closeContactModal() {
        if (!contactModal) return;
        contactModal.classList.remove('is-open');
        contactModal.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
        if (lastFocus && typeof lastFocus.focus === 'function') {
            lastFocus.focus();
        }
    }
    // expose globally for inline triggers
    window.openContactModal = openContactModal;
    window.closeContactModal = closeContactModal;

    // triggers: any [data-open-contact] + all contact.html links (reusable everywhere)
    document.addEventListener('click', (e) => {
        const opener = e.target.closest('[data-open-contact]');
        if (opener) {
            e.preventDefault();
            openContactModal();
            const hint = opener.getAttribute('data-subject');
            if (hint && modalForm) {
                const sel = modalForm.querySelector('#modal-subject');
                if (sel) sel.value = hint;
            }
            return;
        }
        const a = e.target.closest('a[href$=\"contact.html\"]');
        if (a && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
            // allow new-tab / download via modifier, otherwise show modal
            const href = a.getAttribute('href');
            // if on contact.html itself, also show modal instead of reload
            e.preventDefault();
            openContactModal();
        }
    });
    // close triggers
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-close-contact') || e.target.classList.contains('contact-modal-backdrop')) {
                closeContactModal();
            }
        });
    }
    // wire modal form validation (reuse handleForm helpers)
    if (modalForm && modalSuccess) {
        // use the same handleForm logic but need to re-wire since handleForm already looks up by id
        // we manually attach here to avoid double binding
        const validateModal = () => {
            let isValid = true;
            let firstInvalid = null;
            modalForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            modalForm.querySelectorAll('.form-error').forEach(el => el.remove());
            const inputs = modalForm.querySelectorAll('input[required], textarea[required], select[required]');
            inputs.forEach(input => {
                const value = input.value.trim();
                let hasError = false;
                let errorMsg = 'This field is required';
                if (value === '') hasError = true;
                else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { hasError = true; errorMsg = 'Please enter a valid email address'; }
                else if (input.type === 'tel' && input.value.trim() !== '' && input.value.replace(/[^0-9+]/g, '').length < 7) { hasError = true; errorMsg = 'Please enter a valid phone number'; }
                if (hasError) {
                    isValid = false;
                    input.classList.add('error');
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'form-error';
                    errorSpan.textContent = errorMsg;
                    errorSpan.style.color = '#e11d48';
                    errorSpan.style.fontSize = '0.82rem';
                    errorSpan.style.display = 'block';
                    errorSpan.style.marginTop = '0.25rem';
                    input.parentNode.appendChild(errorSpan);
                    if (!firstInvalid) firstInvalid = input;
                }
            });
            return { isValid, firstInvalid };
        };
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const { isValid, firstInvalid } = validateModal();
            if (!isValid) {
                if (firstInvalid) firstInvalid.focus();
                return;
            }
            const submitBtn = modalForm.querySelector('button[type=\"submit\"]');
            const originalText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; submitBtn.style.opacity = '0.7'; }
            setTimeout(() => {
                modalForm.style.opacity = '0';
                setTimeout(() => {
                    modalForm.style.display = 'none';
                    modalSuccess.style.display = 'block';
                    void modalSuccess.offsetWidth;
                    modalSuccess.classList.add('active');
                    modalSuccess.style.opacity = '1';
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; submitBtn.style.opacity = '1'; }
                }, 220);
            }, 700);
        });
        const resetBtn = document.getElementById('modal-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                modalSuccess.style.opacity = '0';
                setTimeout(() => {
                    modalSuccess.style.display = 'none';
                    modalSuccess.classList.remove('active');
                    modalForm.reset();
                    modalForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
                    modalForm.querySelectorAll('.form-error').forEach(el => el.remove());
                    modalForm.style.display = 'block';
                    void modalForm.offsetWidth;
                    modalForm.style.opacity = '1';
                }, 220);
            });
        }
        // also hook the existing close buttons in success
        modalSuccess.querySelectorAll('[data-close-contact]').forEach(btn => {
            btn.addEventListener('click', closeContactModal);
        });
    }
    // focus trap inside modal
    if (contactModal && modalPanel) {
        contactModal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || !contactModal.classList.contains('is-open')) return;
            const focusable = modalPanel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
    }

    // ==========================================
    // 17. Additional Reusable Modals — Quote / Supplier / Contract
    // ==========================================
    const modalConfigs = [
        {
            id: 'quote-modal',
            openAttr: 'data-open-quote',
            closeAttr: 'data-close-quote',
            formId: 'modal-quote-form',
            successId: 'modal-quote-success',
            isQuote: true,
            title: 'Request a quote',
            kicker: 'Procurement — Response 3–5 days',
            formHtml: `
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="q-name">Full Name <span class="req">*</span></label><input type="text" id="q-name" name="full_name" class="form-input" required></div>
                    <div class="form-group"><label class="form-label" for="q-company">Company <span class="req">*</span></label><input type="text" id="q-company" name="company" class="form-input" required></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="q-title">Position</label><input type="text" id="q-title" name="title" class="form-input"></div>
                    <div class="form-group"><label class="form-label" for="q-country">Country <span class="req">*</span></label><input type="text" id="q-country" name="country" class="form-input" required></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="q-email">Email <span class="req">*</span></label><input type="email" id="q-email" name="email" class="form-input" required></div>
                    <div class="form-group"><label class="form-label" for="q-phone">Phone <span class="req">*</span></label><input type="tel" id="q-phone" name="phone" class="form-input" required></div>
                </div>
                <h4>Requirements</h4>
                <div class="form-group">
                    <label class="form-label" for="q-category">Category <span class="req">*</span></label>
                    <select id="q-category" name="category" class="form-select" required>
                        <option value="">Select Category</option>
                        <option>Oil &amp; Gas Products</option>
                        <option>Oil &amp; Gas Equipment</option>
                        <option>Technology Products</option>
                        <option>Networking Equipment</option>
                        <option>Structured Cabling</option>
                        <option>Security Systems</option>
                        <option>General Procurement</option>
                        <option>Other</option>
                    </select>
                </div>
                <div class="form-group"><label class="form-label" for="q-desc">Description <span class="req">*</span></label><textarea id="q-desc" name="description" class="form-textarea" rows="3" required placeholder="Describe products or services"></textarea></div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="q-qty">Quantity</label><input type="text" id="q-qty" name="quantity" class="form-input"></div>
                    <div class="form-group"><label class="form-label" for="q-uom">Unit</label><input type="text" id="q-uom" name="uom" class="form-input" placeholder="MT, Units"></div>
                </div>
                <div class="form-group"><label class="form-label" for="q-specs">Specifications</label><textarea id="q-specs" name="specifications" class="form-textarea" rows="2" placeholder="Technical specs, brand prefs"></textarea></div>
                <h4>Delivery &amp; Terms</h4>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="q-location">Delivery Location <span class="req">*</span></label><input type="text" id="q-location" name="delivery_location" class="form-input" required></div>
                    <div class="form-group"><label class="form-label" for="q-date">Required Date</label><input type="date" id="q-date" name="required_date" class="form-input"></div>
                </div>
                <div class="form-group"><label class="form-label" for="q-incoterms">Incoterms</label><select id="q-incoterms" name="incoterms" class="form-select"><option>To Be Discussed</option><option>EXW</option><option>FCA</option><option>FAS</option><option>FOB</option><option>CFR</option><option>CIF</option><option>CPT</option><option>CIP</option><option>DAP</option><option>DPU</option><option>DDP</option></select></div>
                <div class="form-group"><label class="form-label" for="q-files">Attach specs</label><input type="file" id="q-files" name="files" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"></div>`
        },
        {
            id: 'supplier-modal',
            openAttr: 'data-open-supplier',
            closeAttr: 'data-close-supplier',
            formId: 'modal-supplier-form',
            successId: 'modal-supplier-success',
            title: 'Become a supplier',
            kicker: 'Supplier Network — Review in 5 days',
            formHtml: `
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="s-company">Company Name <span class="req">*</span></label><input type="text" id="s-company" name="company_name" class="form-input" required></div>
                    <div class="form-group"><label class="form-label" for="s-country">Country <span class="req">*</span></label><input type="text" id="s-country" name="country" class="form-input" required></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="s-website">Website</label><input type="url" id="s-website" name="website" class="form-input" placeholder="https://"></div>
                    <div class="form-group"><label class="form-label" for="s-person">Contact Person <span class="req">*</span></label><input type="text" id="s-person" name="contact_person" class="form-input" required></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="s-email">Email <span class="req">*</span></label><input type="email" id="s-email" name="email" class="form-input" required></div>
                    <div class="form-group"><label class="form-label" for="s-phone">Phone <span class="req">*</span></label><input type="tel" id="s-phone" name="phone" class="form-input" required></div>
                </div>
                <div class="form-group"><label class="form-label" for="s-category">Business Category <span class="req">*</span></label><select id="s-category" name="category" class="form-select" required><option value="">Select Category</option><option>Oil &amp; Gas Products</option><option>Oil &amp; Gas Equipment</option><option>Technology Products</option><option>Networking</option><option>Industrial Equipment</option><option>General Supplies</option><option>Multiple Categories</option></select></div>
                <div class="form-group"><label class="form-label" for="s-products">Products &amp; Services</label><textarea id="s-products" name="products_services" class="form-textarea" rows="3" placeholder="Main products and services"></textarea></div>
                <div class="form-group"><label class="form-label" for="s-mfg">Manufacturer Relationships</label><textarea id="s-mfg" name="manufacturer_relationships" class="form-textarea" rows="2" placeholder="Authorizations or partnerships"></textarea></div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="s-certs">Certifications</label><input type="text" id="s-certs" name="certifications" class="form-input" placeholder="e.g., ISO 9001, API"></div>
                    <div class="form-group"><label class="form-label" for="s-years">Years in Business</label><input type="number" id="s-years" name="years_in_business" class="form-input" min="0"></div>
                </div>
                <div class="form-group"><label class="form-label" for="s-file-profile">Company Profile</label><input type="file" id="s-file-profile" name="company_profile" accept=".pdf,.doc,.docx"></div>
                <div class="form-group" style="display:flex; gap:10px; align-items:flex-start;"><input type="checkbox" id="s-confirm" name="confirm" required style="width:auto; margin-top:5px;"><label class="form-label" for="s-confirm" style="margin:0;">I confirm information is accurate and agree to supplier terms</label></div>`
        },
        {
            id: 'contract-modal',
            openAttr: 'data-open-contract',
            closeAttr: 'data-close-contract',
            formId: 'modal-contract-form',
            successId: 'modal-contract-success',
            title: 'Submit a contract request',
            kicker: 'Contracts — Reply in 2 business days',
            formHtml: `
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="c-org">Organization <span class="req">*</span></label><input type="text" id="c-org" name="organization" class="form-input" required></div>
                    <div class="form-group"><label class="form-label" for="c-person">Contact Person <span class="req">*</span></label><input type="text" id="c-person" name="contact_person" class="form-input" required></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="c-email">Email <span class="req">*</span></label><input type="email" id="c-email" name="email" class="form-input" required></div>
                    <div class="form-group"><label class="form-label" for="c-phone">Phone <span class="req">*</span></label><input type="tel" id="c-phone" name="phone" class="form-input" required></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="c-category">Category <span class="req">*</span></label><select id="c-category" name="category" class="form-select" required><option value="">Select Category</option><option>Technology</option><option>Oil &amp; Gas</option><option>General</option></select></div>
                    <div class="form-group"><label class="form-label" for="c-budget">Budget Range</label><select id="c-budget" name="budget" class="form-select"><option value="">Select Budget</option><option>Under $10,000</option><option>$10,000–$50,000</option><option>$50,000–$250,000</option><option>$250,000–$1M</option><option>Over $1M</option></select></div>
                </div>
                <div class="form-group"><label class="form-label" for="c-desc">Project Description <span class="req">*</span></label><textarea id="c-desc" name="project_description" class="form-textarea" rows="4" required></textarea></div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="c-products">Products/Services Required</label><input type="text" id="c-products" name="products_required" class="form-input"></div>
                    <div class="form-group"><label class="form-label" for="c-qty">Quantity</label><input type="text" id="c-qty" name="quantity" class="form-input"></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label class="form-label" for="c-location">Location</label><input type="text" id="c-location" name="location" class="form-input"></div>
                    <div class="form-group"><label class="form-label" for="c-date">Required Date</label><input type="date" id="c-date" name="delivery_date" class="form-input"></div>
                </div>
                <div class="form-group" style="display:flex; gap:10px; align-items:center;"><input type="checkbox" id="c-nda" name="nda_required" style="width:auto;"><label class="form-label" for="c-nda" style="margin:0;">Requires Non-Disclosure Agreement</label></div>
                <div class="form-group"><label class="form-label" for="c-docs">Supporting Documents</label><input type="file" id="c-docs" name="documents" accept=".pdf,.doc,.docx,.xls,.xlsx"></div>`
        }
    ];

    modalConfigs.forEach(cfg => {
        let modal = document.getElementById(cfg.id);
        if (!modal) {
            const wrap = document.createElement('div');
            wrap.innerHTML = `
            <div id="${cfg.id}" class="contact-modal is-wide" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="${cfg.id}-title">
                <div class="contact-modal-backdrop" data-close-${cfg.id.split('-')[0]}></div>
                <div class="contact-modal-panel" role="document">
                    <button type="button" class="contact-modal-close" aria-label="Close" data-close-${cfg.id.split('-')[0]}>&times;</button>
                    <div class="contact-modal-head">
                        <span class="eyebrow" style="margin-bottom:8px;">${cfg.kicker}</span>
                        <h3 id="${cfg.id}-title">${cfg.title}</h3>
                    </div>
                    <form id="${cfg.formId}" class="modal-form" novalidate>${cfg.formHtml}<button type="submit" class="btn btn-primary" style="width:100%; margin-top:8px;">Submit</button></form>
                    <div id="${cfg.successId}" class="form-success">
                        <div class="form-success-icon">\u2713</div>
                        <h3>Submitted</h3>
                        <p>Thank you — the desk will review and reply shortly.</p>
                        ${cfg.isQuote ? '<span class="reference-number" style="display:inline-block; margin:12px 0;">RFQ-' + new Date().getFullYear() + '-XXXX</span><br>' : ''}
                        <div style="display:flex; gap:10px; justify-content:center; margin-top:12px;">
                            <button type="button" class="btn btn-outline btn-sm" data-close-${cfg.id.split('-')[0]}>Close</button>
                            <button type="button" class="btn btn-ghost btn-sm" data-reset="${cfg.id}">Send another</button>
                        </div>
                    </div>
                </div>
            </div>`;
            document.body.appendChild(wrap.firstElementChild);
            modal = document.getElementById(cfg.id);
        }
        const form = document.getElementById(cfg.formId);
        const success = document.getElementById(cfg.successId);
        const panel = modal ? modal.querySelector('.contact-modal-panel') : null;
        let lastFocusQ = null;
        const open = () => {
            lastFocusQ = document.activeElement;
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden','false');
            document.body.style.overflow = 'hidden';
            if (form) { form.style.display='block'; form.style.opacity='1'; }
            if (success) { success.style.display='none'; success.classList.remove('active'); success.style.opacity='0'; }
            setTimeout(() => { const f = modal.querySelector('input, select, textarea, button'); if (f) f.focus(); }, 80);
        };
        const close = () => {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden','true');
            document.body.style.overflow = '';
            if (lastFocusQ && lastFocusQ.focus) lastFocusQ.focus();
        };
        window['open' + cfg.id.split('-')[0].charAt(0).toUpperCase() + cfg.id.split('-')[0].slice(1) + 'Modal'] = open;
        // open triggers
        document.addEventListener('click', (e) => {
            const o = e.target.closest('[' + cfg.openAttr + ']');
            if (o) { e.preventDefault(); open(); }
        });
        // close triggers
        modal.addEventListener('click', (e) => {
            if (e.target.hasAttribute(cfg.closeAttr) || e.target.classList.contains('contact-modal-backdrop')) close();
        });
        // legacy anchor intercepts
        if (cfg.id === 'quote-modal') {
            document.addEventListener('click', (e) => {
                const a = e.target.closest('a[href*="#quote"]');
                if (a && !e.metaKey && !e.ctrlKey) { e.preventDefault(); open(); }
            });
        }
        if (cfg.id === 'contract-modal') {
            document.addEventListener('click', (e) => {
                const a = e.target.closest('a[href*="#contracts"]');
                if (a && !e.metaKey && !e.ctrlKey) { e.preventDefault(); open(); }
            });
        }
        if (cfg.id === 'supplier-modal') {
            document.addEventListener('click', (e) => {
                const a = e.target.closest('a[href*="suppliers.html"]');
                // intercept Become a Supplier links that previously went to form anchor
                const isSupplierCTA = a && (a.textContent.toLowerCase().includes('supplier') || a.getAttribute('href') === 'suppliers.html');
                if (isSupplierCTA && !e.metaKey && !e.ctrlKey) { /* allow navigation to page but also could open modal */ }
            });
        }
        // form validation
        if (form && success) {
            const validate = () => {
                let isValid = true; let firstInvalid = null;
                form.querySelectorAll('.error').forEach(el=>el.classList.remove('error'));
                form.querySelectorAll('.form-error').forEach(el=>el.remove());
                const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
                inputs.forEach(input=>{
                    const v = input.value.trim(); let hasError=false; let msg='This field is required';
                    if(v==='') hasError=true;
                    else if(input.type==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {hasError=true; msg='Please enter a valid email address';}
                    else if(input.type==='checkbox' && !input.checked) {hasError=true; msg='Please confirm';}
                    if(hasError){ isValid=false; input.classList.add('error'); const s=document.createElement('span'); s.className='form-error'; s.textContent=msg; s.style.color='#e11d48'; s.style.fontSize='0.82rem'; s.style.display='block'; s.style.marginTop='0.25rem'; input.parentNode.appendChild(s); if(!firstInvalid) firstInvalid=input; }
                });
                return {isValid, firstInvalid};
            };
            form.addEventListener('submit', (e)=>{
                e.preventDefault();
                const {isValid, firstInvalid}=validate();
                if(!isValid){ if(firstInvalid) firstInvalid.focus(); return; }
                const btn=form.querySelector('button[type="submit"]'); const orig=btn?btn.textContent:''; if(btn){btn.disabled=true; btn.textContent='Sending...'; btn.style.opacity='0.7';}
                setTimeout(()=>{
                    form.style.opacity='0';
                    setTimeout(()=>{
                        form.style.display='none';
                        success.style.display='block'; void success.offsetWidth; success.classList.add('active'); success.style.opacity='1';
                        if(cfg.isQuote){
                            const ref=success.querySelector('.reference-number');
                            if(ref){ ref.textContent='RFQ-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000); }
                        }
                        if(btn){btn.disabled=false; btn.textContent=orig; btn.style.opacity='1';}
                    },220);
                },700);
            });
            const resetBtn = success.querySelector('[data-reset="'+cfg.id+'"]');
            if(resetBtn){
                resetBtn.addEventListener('click', ()=>{
                    success.style.opacity='0';
                    setTimeout(()=>{
                        success.style.display='none'; success.classList.remove('active');
                        form.reset(); form.querySelectorAll('.error').forEach(el=>el.classList.remove('error')); form.querySelectorAll('.form-error').forEach(el=>el.remove());
                        form.style.display='block'; void form.offsetWidth; form.style.opacity='1';
                    },220);
                });
            }
            success.querySelectorAll('['+cfg.closeAttr+']').forEach(b=>b.addEventListener('click', close));
        }
        // focus trap & esc
        modal.addEventListener('keydown', (e)=>{
            if(e.key==='Escape'){ close(); }
            if(e.key!=='Tab' || !modal.classList.contains('is-open')) return;
            const focusable = modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            if(focusable.length===0) return;
            const first=focusable[0], last=focusable[focusable.length-1];
            if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
            else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
        });
    });

    // Global ESC also closes any open modal (fallback)
    document.addEventListener('keydown', (e)=>{
        if(e.key==='Escape'){
            document.querySelectorAll('.contact-modal.is-open').forEach(m=>{ m.classList.remove('is-open'); m.setAttribute('aria-hidden','true'); document.body.style.overflow=''; });
        }
    });

});