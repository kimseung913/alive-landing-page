/**
 * 살았니(Alive) Landing Page Scripts
 */

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for anchor links
    initSmoothScroll();

    // Header scroll effect
    initHeaderScroll();

    // Scroll reveal animations
    initScrollReveal();

    // Phone screen slide carousel
    initPhoneSlideCarousel();

    // iOS App Store button toast
    initIosToast();
});

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header transparency on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Scroll reveal animations using Intersection Observer
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.value-card, .feature-card, .step, .about-text'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Phone screen slide carousel for hero section
 */
function initPhoneSlideCarousel() {
    const phoneSlides = document.getElementById('phoneSlides');
    const indicators = document.querySelectorAll('.phone-indicator');

    if (!phoneSlides || indicators.length === 0) return;

    let currentSlide = 0;
    const totalSlides = 2;
    const slideInterval = 6000; // 6 seconds

    function goToSlide(index) {
        currentSlide = index;

        // Update slide position
        if (index === 1) {
            phoneSlides.classList.add('show-emergency');
        } else {
            phoneSlides.classList.remove('show-emergency');
        }

        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }

    // Auto-advance slides
    let autoSlideInterval = setInterval(nextSlide, slideInterval);

    // Click on indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            // Reset auto-advance timer
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, slideInterval);
        });
    });

    // Pause on hover
    const phoneContainer = document.querySelector('.phone-mockup-container');
    if (phoneContainer) {
        phoneContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        phoneContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, slideInterval);
        });
    }
}

/**
 * iOS App Store button - show "coming soon" toast
 */
function initIosToast() {
    const iosBtn = document.getElementById('iosBtn');
    const iosToast = document.getElementById('iosToast');

    if (!iosBtn || !iosToast) return;

    let toastTimeout = null;

    iosBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Clear any existing timeout
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        // Show toast
        iosToast.classList.add('show');

        // Hide after 3 seconds
        toastTimeout = setTimeout(function () {
            iosToast.classList.remove('show');
        }, 3000);
    });
}
