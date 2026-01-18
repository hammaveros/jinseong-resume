// ========================================
// Jinseong Resume - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollSpy();
  initAnimations();
});

// ========================================
// Navigation
// ========================================

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        updateActiveNav(targetId);
      }
    });
  });
}

function updateActiveNav(sectionId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkSection = link.getAttribute('href').slice(1);
    link.classList.toggle('active', linkSection === sectionId);
  });
}

// ========================================
// Scroll Spy
// ========================================

function initScrollSpy() {
  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveNav(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

// ========================================
// Animations
// ========================================

function initAnimations() {
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate children with stagger
        const children = entry.target.querySelectorAll('.skill-card, .experience-card, .project-card, .highlight-item, .info-card');
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add('animate');
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // Add hover effect to cards
  document.querySelectorAll('.skill-card, .experience-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ========================================
// Smooth Scroll Polyfill for Safari
// ========================================

if (!('scrollBehavior' in document.documentElement.style)) {
  function smoothScrollTo(to, duration) {
    const start = window.scrollY;
    const change = to - start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, start + change * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }

  // Override link click behavior for Safari
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        smoothScrollTo(target.offsetTop - 70, 600);
        updateActiveNav(targetId);
      }
    });
  });
}
