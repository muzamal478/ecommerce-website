// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Timer for Deals Section
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
        let timeLeft = 24 * 60 * 60; // 24 hours in seconds
        const countdownInterval = setInterval(() => {
            let days = Math.floor(timeLeft / (24 * 60 * 60));
            let hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
            let minutes = Math.floor((timeLeft % (60 * 60)) / 60);
            let seconds = timeLeft % 60;

            countdownElement.textContent = `Days: ${days.toString().padStart(2, '0')} | Hours: ${hours.toString().padStart(2, '0')} | Min: ${minutes.toString().padStart(2, '0')} | Sec: ${seconds.toString().padStart(2, '0')}`;

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = "Deal Ended!";
            }
        }, 1000);
    }

    // 2. Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px',
        threshold: 0.1
    });

    images.forEach(img => {
        img.setAttribute('data-src', img.src);
        img.src = ''; // Clear the src to prevent initial loading
        imageObserver.observe(img);
    });

    // 3. Fade-In Animation for Sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. Search Bar Functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const categorySelect = document.querySelector('.search-bar select');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        const category = categorySelect.value;

        if (searchTerm) {
            console.log(`Searching for "${searchTerm}" in category: ${category}`);
            // Add your search logic here (e.g., redirect to a search results page)
            alert(`Searching for "${searchTerm}" in ${category}`);
        } else {
            alert('Please enter a search term!');
        }
    });

    // 5. Form Validation for Send Quote Section
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const itemInput = quoteForm.querySelector('input[type="text"]');
            const detailsInput = quoteForm.querySelector('textarea');
            const quantitySelect = quoteForm.querySelector('select');

            const item = itemInput.value.trim();
            const details = detailsInput.value.trim();
            const quantity = quantitySelect.value;

            if (!item || !details) {
                alert('Please fill in all required fields!');
                return;
            }

            console.log('Quote Request:', { item, details, quantity });
            alert('Quote request sent successfully!');
            quoteForm.reset();
        });
    }

    // 6. Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-section form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address!');
                return;
            }

            console.log('Subscribed with email:', email);
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }

    // 7. Add to Cart Functionality
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.querySelector('h5').textContent;
            const productPrice = card.querySelector('p').textContent;

            console.log(`Added to cart: ${productName} - ${productPrice}`);
            alert(`${productName} has been added to your cart!`);
        });
    });

    // 8. Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 9. Back to Top Button (Dynamic Addition)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 10. Hover Animation for Social Icons
    const socialIcons = document.querySelectorAll('.social-icons i');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1)';
        });
    });
});