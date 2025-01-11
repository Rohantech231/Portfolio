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

    // Update the animated text functionality
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
        // Add changing class for glitch effect
        animatedText.classList.add('changing');
        
        // Create glitch effect
        const glitchDuration = 500; // 0.5 seconds
        const glitchIntervals = 5;
        let glitchCount = 0;
        
        const glitchInterval = setInterval(() => {
            if (glitchCount < glitchIntervals) {
                animatedText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                glitchCount++;
            } else {
                clearInterval(glitchInterval);
                animatedText.style.transform = 'translate(0, 0)';
                
                // Update text after glitch effect
                setTimeout(() => {
                    animatedText.textContent = titles[titleIndex];
                    animatedText.classList.remove('changing');
                    titleIndex = (titleIndex + 1) % titles.length;
                }, 100);
            }
        }, glitchDuration / glitchIntervals);
    }

    // Initial call
    updateTitle();
    // Update every 3 seconds
    setInterval(updateTitle, 3000);

    // Add terminal-style typing effect
    function typeText(element, text, speed = 50) {
        let index = 0;
        element.textContent = '';
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Apply typing effect to initial text
    const firstTitle = titles[0];
    typeText(animatedText, firstTitle);
}); 