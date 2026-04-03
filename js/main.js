// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MOBILE MENU ====================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // If it's the dropdown toggle on mobile, don't close the menu yet
        if (window.innerWidth <= 768 && link.classList.contains('dropbtn')) {
            return; 
        }
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});
    
// ==================== ACTIVE NAVIGATION ====================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
// If a sub-item is active, also highlight the parent dropdown button
const activeSubLink = document.querySelector('.dropdown-content .active');
if (activeSubLink) {
    activeSubLink.closest('.dropdown').querySelector('.dropbtn').classList.add('active');
}
    // ==================== DOMAIN SEARCH ====================
    const searchBtn = document.getElementById('searchDomainBtn');
    const domainInput = document.getElementById('domainInput');
    
    if (searchBtn && domainInput) {
        searchBtn.addEventListener('click', function() {
            const domain = domainInput.value.trim();
            if (domain) {
                alert(`🔍 Checking availability for ${domain}...\n\nThis feature will be available soon!\n\nWould you like us to notify you when ${domain} becomes available?`);
            } else {
                alert('Please enter a domain name to search');
                domainInput.style.border = '1px solid #ff6b00';
                setTimeout(() => {
                    domainInput.style.border = '';
                }, 2000);
            }
        });
        
        domainInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // ==================== PRICING TOGGLE (Monthly/Yearly) ====================
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'block');
            } else {
                monthlyPrices.forEach(price => price.style.display = 'block');
                yearlyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }
    
    // ==================== FAQ ACCORDION ====================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value.trim();
            
            // Validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showFormMessage('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showFormMessage(msg, type) {
        if (formMessage) {
            formMessage.textContent = msg;
            formMessage.className = `form-message ${type}`;
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
    
    // ==================== COUNTER ANIMATION ====================
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // ==================== SCROLL ANIMATIONS ====================
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .feature-item, .team-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        scrollObserver.observe(el);
    });
    
    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#home') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ==================== STICKY NAVBAR ON SCROLL ====================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ==================== BACK TO TOP BUTTON ====================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ff6b00, #ff8533);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==================== ADD LOADING CLASS TO BUTTONS ====================
    const allButtons = document.querySelectorAll('.btn-service, .btn-cta, .btn-submit');
    
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-submit')) return;
            
            if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                // Allow navigation
                return;
            }
            
            if (!this.hasAttribute('data-no-loading')) {
                e.preventDefault();
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                    alert('This feature is coming soon!');
                }, 1000);
            }
        });
    });
    
    // ==================== DYNAMIC YEAR IN FOOTER ====================
const year = new Date().getFullYear();
copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2024', year);
    
    // ==================== TOOLTIP FOR POPULAR BADGE ====================
    const popularBadges = document.querySelectorAll('.popular-badge');
    popularBadges.forEach(badge => {
        badge.setAttribute('title', 'Our most popular plan with the best value!');
    });
    
    // ==================== DOMAIN EXTENSION HOVER EFFECT ====================
    const extensions = document.querySelectorAll('.domain-extensions span');
    extensions.forEach(ext => {
        ext.addEventListener('mouseenter', () => {
            ext.style.transform = 'scale(1.1)';
            ext.style.transition = 'transform 0.3s';
        });
        ext.addEventListener('mouseleave', () => {
            ext.style.transform = 'scale(1)';
        });
    });
    
    console.log('Cave Cloud BD website loaded successfully! 🚀');
});


