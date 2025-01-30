// Language Toggle
let currentLanguage = 'de';

function toggleLanguage() {
  const body = document.body;
  currentLanguage = currentLanguage === 'de' ? 'en' : 'de';
  body.classList.toggle('en');
  localStorage.setItem('language', currentLanguage);
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage === 'en') {
    document.body.classList.add('en');
    currentLanguage = 'en';
  }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = 'rgba(44, 47, 51, 0.95)';
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.backgroundColor = 'rgba(44, 47, 51, 0.8)';
    navbar.style.boxShadow = 'none';
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Join Button Click Handler
document.querySelector('.join-button').addEventListener('click', () => {
  // FiveM Protocol Handler
  window.location.href = 'fivem://connect/play.server.com';
});

// Simulated Player Count Update
function updatePlayerCount() {
  const playerCount = document.getElementById('player-count');
  const currentPlayers = Math.floor(Math.random() * 64);
  
  // Animate the counter
  const startValue = parseInt(playerCount.textContent);
  const endValue = currentPlayers;
  const duration = 1000;
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
    playerCount.textContent = `${currentValue}/64`;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Update player count every 30 seconds
setInterval(updatePlayerCount, 30000); updatePlayerCount(); // Initial update

// Scroll Indicator
document.querySelector('.scroll-indicator').addEventListener('click', () => {
  const featuresSection = document.querySelector('.features');
  featuresSection.scrollIntoView({ behavior: 'smooth' });
});

// Animation on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .news-card, .join-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  observer.observe(el);
});

// Server Status Simulation
function updateServerStatus() {
  const statusIndicator = document.querySelector('.status-indicator');
  const statusText = document.querySelector('.status-text');
  const online = Math.random() > 0.1; // 90% chance server is online

  statusIndicator.className = 'status-indicator ' + (online ? 'online' : 'offline');
  if (online) {
    statusIndicator.style.backgroundColor = 'var(--success-color)';
    statusIndicator.style.boxShadow = '0 0 10px var(--success-color)';
  } else {
    statusIndicator.style.backgroundColor = 'var(--danger-color)';
    statusIndicator.style.boxShadow = '0 0 10px var(--danger-color)';
  }
}

// Update server status every minute
setInterval(updateServerStatus, 60000);
updateServerStatus(); // Initial update

// Mobile Navigation Toggle
const createMobileNav = () => {
  const nav = document.querySelector('.nav-links');
  const burger = document.createElement('div');
  burger.className = 'burger';
  burger.innerHTML = '<i class="fas fa-bars"></i>';
  
  document.querySelector('.nav-content').prepend(burger);
  
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.querySelector('i').classList.toggle('fa-bars');
    burger.querySelector('i').classList.toggle('fa-times');
  });
};

// Initialize mobile navigation on small screens
if (window.innerWidth <= 768) {
  createMobileNav();
}

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768 && !document.querySelector('.burger')) {
    createMobileNav();
  } else if (window.innerWidth > 768 && document.querySelector('.burger')) {
    document.querySelector('.burger').remove();
    document.querySelector('.nav-links').classList.remove('active');
  }
});

// Preload images for better performance
const preloadImages = () => {
  const images = [
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1581600/ss_f7cf51f3b36ef9b1c6c7f2c96b0be69b6a70c92e.1920x1080.jpg?t=1700673896',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1581600/ss_b70e156adf9e40aed24c90484db7c8ef28381a28.1920x1080.jpg?t=1700673896'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Initialize preloading
preloadImages();