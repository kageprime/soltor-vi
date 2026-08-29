/**
 * Soltor VI Limited - Main JavaScript File
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
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMenu();
                if (menuToggle) {
                    menuToggle.focus();
                }
            }
        }
    });

});
