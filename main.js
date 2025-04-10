  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page loads
    setTimeout(function() {
      document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);
    
    // Terminal typing effect
    const typingText = document.getElementById('typing-text');
    const textToType = "npm run build-something-amazing";
    let i = 0;
    
    function typeWriter() {
      if (i < textToType.length) {
        typingText.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    setTimeout(typeWriter, 1000);
    
    // Mouse follower
    const mouseFollower = document.getElementById('mouseFollower');
    
    document.addEventListener('mousemove', function(e) {
      mouseFollower.style.left = e.clientX + 'px';
      mouseFollower.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', function() {
      mouseFollower.classList.add('active');
    });
    
    document.addEventListener('mouseup', function() {
      mouseFollower.classList.remove('active');
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinksArray = document.querySelectorAll('.nav-link');
    navLinksArray.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Project navigation
    const projectsContainer = document.getElementById('projectsContainer');
    const projectPrev = document.getElementById('projectPrev');
    const projectNext = document.getElementById('projectNext');
    
    projectNext.addEventListener('click', function() {
      projectsContainer.scrollBy({
        left: 500,
        behavior: 'smooth'
      });
    });
    
    projectPrev.addEventListener('click', function() {
      projectsContainer.scrollBy({
        left: -500,
        behavior: 'smooth'
      });
    });
    
    // Scroll to top button
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        scrollIndicator.classList.add('visible');
      } else {
        scrollIndicator.classList.remove('visible');
      }
    });
    
    scrollIndicator.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Theme switcher
    const themeSwitcher = document.getElementById('themeSwitcher');
    const root = document.documentElement;
    let darkMode = true; // Default is dark mode
    
    themeSwitcher.addEventListener('click', function() {
      if (darkMode) {
        // Switch to light mode
        root.style.setProperty('--bg-color', '#fffffe');
        root.style.setProperty('--text-color', '#0f0e17');
        root.style.setProperty('--dark', '#fffffe');
        root.style.setProperty('--light', '#0f0e17');
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        // Switch to dark mode
        root.style.setProperty('--bg-color', '#0f0e17');
        root.style.setProperty('--text-color', '#fffffe');
        root.style.setProperty('--dark', '#0f0e17');
        root.style.setProperty('--light', '#fffffe');
        themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
      }
      darkMode = !darkMode;
    });
    
    // Interactive canvas
    const canvas = document.getElementById('interactive-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particles
    const particles = [];
    const particleCount = 100;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = getRandomColor();
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function getRandomColor() {
      const colors = ['rgba(255, 137, 6, 0.5)', 'rgba(242, 95, 76, 0.5)', 'rgba(229, 49, 112, 0.5)'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function createParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Connect particles with lines
        connectParticles(particles[i], particles);
      }
      
      requestAnimationFrame(animateParticles);
    }
    
    function connectParticles(p1, particles) {
      for (let i = 0; i < particles.length; i++) {
        const p2 = particles[i];
        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + 
          Math.pow(p1.y - p2.y, 2)
        );
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 137, 6, ${0.2 - distance/500})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    
    createParticles();
    animateParticles();
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would normally send the form data to a server
      // For demo purposes, we'll just log it to console
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  });