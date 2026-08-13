const header = document.querySelector('header');
const logo = document.querySelector('.logo');
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');

// Observe sections
const sections = document.querySelectorAll('section, footer');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bgColor = window.getComputedStyle(entry.target).backgroundColor;
      
      // Decide text color based on brightness
      const rgb = bgColor.match(/\d+/g);
      const brightness = (0.299*rgb[0] + 0.587*rgb[1] + 0.114*rgb[2]);

      if (brightness < 128) {
        // Dark background → make header white
        logo.style.color = '#fff';
        menuToggle.style.color = '#fff';
      } else {
        // Light background → make header black
        logo.style.color = '#000';
        menuToggle.style.color = '#000';
      }
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));

// Toggle menu overlay
menuToggle.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Counter animation function
function animateCounter(id, target, duration) {
  const element = document.getElementById(id);
  let start = 0;
  const stepTime = Math.abs(Math.floor(duration / target));

  const timer = setInterval(() => {
    start++;
    element.textContent = start;
    if (start >= target) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Trigger animation when section is visible
const statsSection = document.querySelector('.stats-section');
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter('awards-count', 271, 2000);   // 2 seconds duration
      animateCounter('countries-count', 47, 2000);
      statsObserver.unobserve(statsSection); // run only once
    }
  });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// Simple countdown to a launch date
const countdown = document.getElementById("countdown");
const launchDate = new Date("August 1, 2026 00:00:00").getTime();

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    clearInterval(timer);
    countdown.innerHTML = "We're live!";
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000*60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

