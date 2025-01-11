document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference, if any, on load of the website
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        // Add transition class
        icon.style.opacity = '0';
        
        setTimeout(() => {
            body.classList.toggle('dark-mode');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            
            // Save user preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', null);
            }
            
            icon.style.opacity = '1';
        }, 200);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });

    // Observe individual elements
    const animatedElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .achievement-card');
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });

    // Updated Animated text functionality
    const titles = [
        "Full Stack Developer",
        "Tech Innovator",
        "Problem Solver",
        "Code Artist",
        "Digital Creator"
    ];
    
    const animatedText = document.querySelector('.animated-text');
    let titleIndex = 0;
    
    function updateTitle() {
        // Add exit animation
        animatedText.style.opacity = '0';
        animatedText.style.transform = 'scale(0.95) translateY(10px)';
        
        setTimeout(() => {
            animatedText.textContent = titles[titleIndex];
            // Add entrance animation
            animatedText.style.opacity = '1';
            animatedText.style.transform = 'scale(1) translateY(0)';
            
            // Create glitch effect
            setTimeout(() => {
                animatedText.style.transform = 'scale(1.02) skew(-1deg)';
                setTimeout(() => {
                    animatedText.style.transform = 'scale(1) skew(0)';
                }, 100);
            }, 300);
            
            titleIndex = (titleIndex + 1) % titles.length;
        }, 300);
    }

    // Add transition styles
    animatedText.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Initial call
    updateTitle();
    // Update every 3 seconds
    setInterval(updateTitle, 3000);
}); 