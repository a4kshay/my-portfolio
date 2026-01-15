// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    const isVisible = navMenu.style.display === 'flex';
    if (isVisible) {
        navMenu.style.display = 'none';
        navMenu.style.position = 'static';
        navMenu.style.flexDirection = 'row';
        navMenu.style.width = 'auto';
        navMenu.style.background = 'transparent';
        navMenu.style.padding = '0';
    } else {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '80px';
        navMenu.style.left = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.width = '100%';
        navMenu.style.background = '#0a0a0a';
        navMenu.style.padding = '2rem';
        navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        navMenu.style.textAlign = 'center';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            if (navMenu.style.position === 'absolute') {
                navMenu.style.display = 'none';
            }
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    });
});

// Handle Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const subject = `Portfolio Query from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        window.location.href = `mailto:akshay141Shiv@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        contactForm.reset();
        alert('Opening your email client to send the message...');
    });
}


// Particle Background Animation
const canvas = document.getElementById('particles-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    // Create Particle
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.directionX = (Math.random() * 0.4) - 0.2;
            this.directionY = (Math.random() * 0.4) - 0.2;
            this.size = Math.random() * 2 + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(0, 242, 255, 0.4)'; // Cyan subtle
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    let opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(0, 242, 255,' + opacityValue * 0.15 + ')'; // Cyan lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Parallax Effect on Scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Shift transparently or subtly
        // We can slightly nudge particles or just rely on the fixed canvas covering viewport
        // A simple effect is just letting them be fixed, which looks like a deep background.
        // If we want movement:
        // particlesArray.forEach(p => p.y += 0.5); // simplistic
    });

    init();
    animate();
}
