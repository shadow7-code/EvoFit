// Load theme immediately to prevent flash
(function() {
      const html = document.documentElement;
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
      } else {
        html.removeAttribute('data-theme');
      }
    })();

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load theme from localStorage
    function loadTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.textContent = '🌙';
      } else {
        html.removeAttribute('data-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
      }
    }

    // Apply theme on page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadTheme);
    } else {
      loadTheme();
    }

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'light') {
          html.removeAttribute('data-theme');
          themeToggle.textContent = '☀️';
          localStorage.setItem('theme', 'dark');
        } else {
          html.setAttribute('data-theme', 'light');
          themeToggle.textContent = '🌙';
          localStorage.setItem('theme', 'light');
        }
      });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          mobileMenuBtn.textContent = '☰';
        }
      });
    });


    // Scroll Animation for Cards & Paragraph
    const cards = document.querySelectorAll('.card');
    const paragraph = document.getElementById('aboutPara');
    const reveal = () => {
      const triggerBottom = window.innerHeight * 0.85;
      cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < triggerBottom) card.classList.add('show');
      });
      if(paragraph.getBoundingClientRect().top < triggerBottom) {
        paragraph.classList.add('show');
      }
    };
    window.addEventListener('scroll', reveal);
    reveal();
