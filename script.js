// Theme toggle - Load theme immediately to prevent flash
    (function() {
      const html = document.documentElement;
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
      } else {
        html.removeAttribute('data-theme');
      }
    })();

    // Theme toggle functionality
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

    // Placeholder navigation
    function navigateToDiet() {
      alert('🥗 Diet Plan feature coming soon!');
    }

    // sessionStorage check
    function updateAuthUI() {
      const loginLink = document.getElementById('loginLink');
      const dashboardLink = document.getElementById('dashboardLink');
      const profileContainer = document.getElementById('profileContainer');
      const profileUsername = document.getElementById('profileUsername');
      
      if (sessionStorage.getItem('isLoggedIn') === 'true') {
        // User is logged in - show dashboard link and profile dropdown
        if (loginLink) loginLink.style.display = 'none';
        if (dashboardLink) dashboardLink.style.display = 'block';
        profileContainer.style.display = 'block';
        
        // Get username from activeSession
        const activeSession = sessionStorage.getItem('activeSession');
        const username = activeSession ? JSON.parse(activeSession).username : 'User';
        profileUsername.textContent = username;
      } else {
        // User is not logged in - hide dashboard link and profile dropdown
        if (loginLink) loginLink.style.display = 'block';
        if (dashboardLink) dashboardLink.style.display = 'none';
        profileContainer.style.display = 'none';
      }
    }

    // Logout function
    function logoutUser() {
      if (confirm('Are you sure you want to logout?')) {
        // Clear all authentication related data from sessionStorage
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('activeSession');
        
        alert('Logged out successfully!');
        
        // Update UI to show logged out state
        updateAuthUI();
        
        // Hide profile dropdown
        const profileMenu = document.getElementById('profileMenu');
        profileMenu.classList.remove('active');
        
        // Redirect to home
        window.location.href = 'index.html';
      }
    }

    // Profile dropdown functionality
    document.addEventListener('DOMContentLoaded', function() {
      const profileBtn = document.getElementById('profileBtn');
      const profileMenu = document.getElementById('profileMenu');
      
      if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          profileMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
            profileMenu.classList.remove('active');
          }
        });
      }
    });

    // Check auth status on page load and update UI
    updateAuthUI();