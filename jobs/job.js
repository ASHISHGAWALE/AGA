// Select elements
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');

// Toggle menu overlay
menuToggle.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Button hover animation
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.05)';
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
});

document.querySelectorAll(".social-links a").forEach(link => {

    link.addEventListener("click", function () {
        console.log("Opening:", this.getAttribute("aria-label"));
    });

});