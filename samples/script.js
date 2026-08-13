const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');

menuToggle.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
  menuToggle.classList.toggle('active');
});
