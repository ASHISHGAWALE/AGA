// Header elements
const logo = document.querySelector('.logo');
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');
const lines = document.querySelectorAll('.line');

// Force black color for logo and menu lines
logo.style.color = '#000';
lines.forEach(line => line.style.backgroundColor = '#000');

// Toggle menu overlay
menuToggle.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Counter animation function
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = Math.ceil(target / (duration / 16)); // ~60fps
  function update() {
    start += increment;
    if (start >= target) {
      element.textContent = target;
    } else {
      element.textContent = start;
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// Observe all counters
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      animateCounter(el, target, 1000); // 1 second duration
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Zoom animation for hero/slide sections
const zoomSections = document.querySelectorAll(
  '.hero, .hero1, .hero2, .hero3, .slide, .slide1, .slide2, .slide3, .slide4, .slide5'
);

zoomSections.forEach(section => section.classList.add('zoom-bg'));

const zoomObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active'); // trigger zoom-out
    } else {
      entry.target.classList.remove('active'); // reset when out of view
    }
  });
}, { threshold: 0.3 });

zoomSections.forEach(section => zoomObserver.observe(section));

// Social links click logging
document.querySelectorAll(".social-links a").forEach(link => {
  link.addEventListener("click", function () {
    console.log("Opening:", this.getAttribute("aria-label"));
  });
});

// Simple countdown to a launch date
const countdown = document.getElementById("countdown");
if (countdown) {
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
}
