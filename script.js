const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// ---------- Theme Handling ----------
function applyTheme(theme) {
  if (theme === 'light') {
    html.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.textContent = '🌙';
  } else {
    html.removeAttribute('data-theme');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
}

function loadThemePreference() {
  const storedTheme = window.EvoFitStorage?.getTheme
    ? window.EvoFitStorage.getTheme()
    : 'dark';
  applyTheme(storedTheme);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadThemePreference);
} else {
  loadThemePreference();
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    window.EvoFitStorage?.setTheme?.(nextTheme);
  });
}

// ---------- Mobile Navigation ----------
if (mobileMenuBtn && navLinks) {
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
}

// ---------- Auth Helpers ----------
const EvoFitAuth = {
  isLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  },
  getActiveSession() {
    try {
      const raw = sessionStorage.getItem('activeSession');
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn('EvoFitAuth: invalid session', error);
      sessionStorage.removeItem('activeSession');
      sessionStorage.removeItem('isLoggedIn');
      return null;
    }
  },
  getActiveUsername() {
    const session = this.getActiveSession();
    return session?.username || null;
  },
  clearSession() {
    sessionStorage.removeItem('activeSession');
    sessionStorage.removeItem('isLoggedIn');
  }
};

window.EvoFitAuth = EvoFitAuth;

// ---------- Navbar Auth UI ----------
function updateAuthUI() {
  const loginLink = document.getElementById('loginLink');
  const dashboardLink = document.getElementById('dashboardLink');
  const profileContainer = document.getElementById('profileContainer');
  const profileUsername = document.getElementById('profileUsername');

  if (EvoFitAuth.isLoggedIn()) {
    if (loginLink) loginLink.style.display = 'none';
    if (dashboardLink) dashboardLink.style.display = 'block';
    if (profileContainer) profileContainer.style.display = 'block';
    if (profileUsername) profileUsername.textContent = EvoFitAuth.getActiveUsername() || 'User';
  } else {
    if (loginLink) loginLink.style.display = 'block';
    if (dashboardLink) dashboardLink.style.display = 'none';
    if (profileContainer) profileContainer.style.display = 'none';
  }
}

// ---------- Logout ----------
function logoutUser() {
  if (!confirm('Are you sure you want to logout?')) {
    return;
  }

  EvoFitAuth.clearSession();
  updateAuthUI();

  const profileMenu = document.getElementById('profileMenu');
  if (profileMenu) {
    profileMenu.classList.remove('active');
  }

  window.location.href = 'login.html';
}

window.logoutUser = logoutUser;

// ---------- Profile Dropdown ----------
document.addEventListener('DOMContentLoaded', () => {
  const profileBtn = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');

  if (profileBtn && profileMenu) {
    profileBtn.addEventListener('click', e => {
      e.stopPropagation();
      profileMenu.classList.toggle('active');
    });

    document.addEventListener('click', e => {
      if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.remove('active');
      }
    });
  }

  updateAuthUI();
});