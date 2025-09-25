// Initialize GSAP and ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // DOM Elements
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const header = document.querySelector('header');
        const donationForm = document.getElementById('donation-form');
        const newsletterForm = document.getElementById('newsletter-form');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const donorRows = document.querySelectorAll('#donors-table tbody tr');
        const successModal = document.getElementById('success-modal');
        const closeModal = document.querySelector('.close-modal');
        const continueBtn = document.querySelector('.modal-content .btn');
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            initAnimations();
            initEventListeners();
            updateActiveNavLink();
        });
        
        // Initialize animations
        function initAnimations() {
            // Hero section animation
            gsap.from('.hero-content', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });

            // Activities section animations
            gsap.from('.activity-category', {
                scrollTrigger: {
                    trigger: '.activities-section',
                    start: 'top 80%'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.3,
                ease: 'power3.out'
            });
            
            gsap.from('.activity-item', {
                scrollTrigger: {
                    trigger: '.activity-list',
                    start: 'top 90%'
                },
                duration: 0.8,
                x: -30,
                opacity: 0,
                stagger: 0.1,
                ease: 'power3.out'
            });
            
            
            // About section animation
            gsap.from('.about-text', {
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 80%'
                },
                duration: 1,
                x: -50,
                opacity: 0,
                ease: 'power3.out'
            });
            
            gsap.from('.about-image', {
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 80%'
                },
                duration: 1,
                x: 50,
                opacity: 0,
                ease: 'power3.out'
            });
            
            // Initiatives section animation
            gsap.from('.card', {
                scrollTrigger: {
                    trigger: '.initiatives',
                    start: 'top 80%'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out'
            });
            
            // Mission section animation
            gsap.from('.mission-content p', {
                scrollTrigger: {
                    trigger: '.mission',
                    start: 'top 80%'
                },
                duration: 1,
                y: 30,
                opacity: 0,
                stagger: 0.3,
                ease: 'power3.out'
            });
            
            gsap.from('.stat', {
                scrollTrigger: {
                    trigger: '.mission-stats',
                    start: 'top 80%'
                },
                duration: 1,
                scale: 0.5,
                opacity: 0,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            });
            
            // Form section animation
            gsap.from('.form-container', {
                scrollTrigger: {
                    trigger: '.form-section',
                    start: 'top 80%'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
            // Tours section animations
            gsap.from('.tour-card', {
                scrollTrigger: {
                    trigger: '.tours-section',
                    start: 'top 80%'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out'
            });
            
            gsap.from('.benefit-item', {
                scrollTrigger: {
                    trigger: '.benefits-container',
                    start: 'top 80%'
                },
                duration: 1,
                scale: 0.5,
                opacity: 0,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            });
            
            gsap.from('.testimonial-card', {
                scrollTrigger: {
                    trigger: '.testimonials',
                    start: 'top 80%'
                },
                duration: 1,
                y: 30,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out'
            });
             // Close menu when clicking on a nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
            
            // Donor table animation
            gsap.from('tr', {
                scrollTrigger: {
                    trigger: '.donor-list',
                    start: 'top 80%'
                },
                duration: 0.5,
                x: -50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power3.out'
            });
            
            // Footer animation
            gsap.from('.footer-column', {
                scrollTrigger: {
                    trigger: 'footer',
                    start: 'top 90%'
                },
                duration: 1,
                y: 30,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
        
        // Initialize event listeners
        function initEventListeners() {
            // Hamburger menu toggle
            hamburger.addEventListener('click', toggleMenu);
            
            // Close menu when clicking on a nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    setActiveNavLink(link);
                });
            });
            
            // Header scroll effect
            window.addEventListener('scroll', handleScroll);
            
            // Form submissions
            donationForm.addEventListener('submit', handleDonationSubmit);
            newsletterForm.addEventListener('submit', handleNewsletterSubmit);
            
            // Donor filter buttons
            filterButtons.forEach(button => {
                button.addEventListener('click', () => filterDonors(button));
            });
            
            // Modal controls
            closeModal.addEventListener('click', hideModal);
            continueBtn.addEventListener('click', hideModal);
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === successModal) {
                    hideModal();
                }
            });
            
            // Input validation
            setupInputValidation();
        }
        
        // Toggle mobile menu
        function toggleMenu() {
            navLinks.classList.toggle('active');
        }
        
        // Handle scroll events
        function handleScroll() {
            // Header scroll effect
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            updateActiveNavLink();
        }
        
        // Update active navigation link based on scroll position
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 100) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === currentSection) {
                    link.classList.add('active');
                }
            });
        }
        
        // Set active navigation link
        function setActiveNavLink(link) {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
        
        // Handle donation form submission
        function handleDonationSubmit(e) {
            e.preventDefault();
            
            if (validateForm(donationForm)) {
                // In a real application, you would process the form data here
                showModal();
                donationForm.reset();
            }
        }
        
        // Handle newsletter form submission
        function handleNewsletterSubmit(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const errorElement = document.getElementById('newsletter-error');
            
            if (validateEmail(emailInput.value)) {
                // In a real application, you would submit the email to a newsletter service
                emailInput.value = '';
                errorElement.style.display = 'none';
                alert('Thank you for subscribing to our newsletter!');
            } else {
                errorElement.style.display = 'block';
            }
        }
        
        // Filter donors based on category
        function filterDonors(button) {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide donor rows based on filter
            donorRows.forEach(row => {
                if (filter === 'all') {
                    row.style.display = 'table-row';
                } else {
                    const categories = row.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        row.style.display = 'table-row';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        }
        
        // Show success modal
        function showModal() {
            successModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        // Hide success modal
        function hideModal() {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Setup input validation
        function setupInputValidation() {
            const inputs = document.querySelectorAll('.form-control');
            
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateInput(this);
                });
                
                input.addEventListener('input', function() {
                    clearError(this);
                });
            });
        }
        
        // Validate a single input
        function validateInput(input) {
            const value = input.value.trim();
            let isValid = true;
            let errorElement;
            
            switch(input.id) {
                case 'name':
                    isValid = value !== '';
                    errorElement = document.getElementById('name-error');
                    break;
                case 'email':
                    isValid = validateEmail(value);
                    errorElement = document.getElementById('email-error');
                    break;
                case 'amount':
                    isValid = !isNaN(value) && parseInt(value) > 0;
                    errorElement = document.getElementById('amount-error');
                    break;
            }
            
            if (!isValid && errorElement) {
                input.classList.add('error-input');
                errorElement.style.display = 'block';
                return false;
            }
            
            return true;
        }
        
        // Clear error message
        function clearError(input) {
            const id = input.id;
            const errorElement = document.getElementById(`${id}-error`);
            
            if (errorElement) {
                input.classList.remove('error-input');
                errorElement.style.display = 'none';
            }
        }
        
        // Validate entire form
        function validateForm(form) {
            const inputs = form.querySelectorAll('.form-control');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required')) {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                }
            });
            
            return isValid;
        }
        
        // Validate email format
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }