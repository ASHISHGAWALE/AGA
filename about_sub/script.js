const menuToggle = document.getElementById("menu-toggle");
const menuOverlay = document.getElementById("menu-overlay");

// Toggle menu only when clicking the toggle button
menuToggle.addEventListener("click", () => {
  menuOverlay.classList.toggle("active");
});

// Close menu when clicking a link inside overlay
document.querySelectorAll(".menu-overlay a").forEach(link => {
  link.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    // Let browser navigate normally
  });
});
