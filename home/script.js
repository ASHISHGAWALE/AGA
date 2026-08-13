const header = document.querySelector('header');
const logo = document.querySelector('.logo');
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');

// Observe sections for header color change
const sections = document.querySelectorAll('section, footer');

const headerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bgColor = window.getComputedStyle(entry.target).backgroundColor;
      
      // Decide text color based on brightness
      const rgb = bgColor.match(/\d+/g);
      const brightness = (0.299*rgb[0] + 0.587*rgb[1] + 0.114*rgb[2]);

      if (brightness < 128) {
        logo.style.color = '#fff';
        menuToggle.style.color = '#fff';
      } else {
        logo.style.color = '#000';
        menuToggle.style.color = '#000';
      }
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => headerObserver.observe(section));

// Toggle menu overlay
menuToggle.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Counter animation function (fast)
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
      animateCounter(el, target, 1000); // fast: 1 second duration
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


document.querySelectorAll(".social-links a").forEach(link => {

    link.addEventListener("click", function () {
        console.log("Opening:", this.getAttribute("aria-label"));
    });

});