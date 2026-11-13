document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Typing Effect for hero section
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const roles = [
            "Especialista en Ciberseguridad",
            "Full-Stack Developer",
            "Soporte IT",
            "Administrador de Sistemas"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                currentText = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            typedTextElement.textContent = currentText;

            if (!isDeleting && charIndex === currentRole.length) {
                // Finished typing a role
                isDeleting = true;
                setTimeout(type, 2000); // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500); // Pause before typing next role
            } else {
                const typingSpeed = isDeleting ? 50 : 100;
                setTimeout(type, typingSpeed);
            }
        }

        // Start the typing effect
        setTimeout(type, 1000);
    }

    // Dropdown for certificados
    const certBtn = document.getElementById('certBtn');
    const certMenu = document.getElementById('certMenu');

    if (certBtn && certMenu) {
        certBtn.addEventListener('click', function(e) {
            e.preventDefault();
            certMenu.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!certBtn.contains(e.target) && !certMenu.contains(e.target)) {
                certMenu.classList.remove('active');
            }
        });
    }
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function() {
            // Show success message without interfering with Netlify's native form submission
            formStatus.textContent = '¡Mensaje enviado correctamente! Gracias por contactarme.';
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
        });
    }

    // Consolidar todos los event listeners de scroll en uno solo
    const backToTopButton = document.getElementById('backToTop');
    const navbar = document.querySelector('header');
    const SCROLL_THRESHOLD = 100;
    let lastScrollY = window.scrollY;

    // Initial check on load
    if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('hidden');
    }

    window.addEventListener('scroll', function() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar hide/show logic
        if (currentScrollY < SCROLL_THRESHOLD) {
            navbar.classList.remove('hidden');
        } else if (Math.abs(currentScrollY - lastScrollY) > 10) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down - hide navbar
                navbar.classList.add('hidden');
            } else {
                // Scrolling up - show navbar
                navbar.classList.remove('hidden');
            }
        }
        lastScrollY = currentScrollY;

        // Back to top button visibility
        if (currentScrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Close mobile nav when scrolling to top
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        }
    });

    // Update year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add animation classes to sections for fade-in effect
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-up');
    });

    // Ofuscar información personal (email y teléfono)
    const obfuscatedElements = document.querySelectorAll('.obfuscated');
    obfuscatedElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            this.textContent = value;
            this.classList.add('revealed');
        });
    });

    // Initialize Lucide icons
    lucide.createIcons();
});