const themeToggle = document.getElementById("theme-toggle");
const sections = document.querySelectorAll("section");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.setAttribute("aria-label", document.body.classList.contains("dark-mode") ? "Toggle Light Mode" : "Toggle Dark Mode");
});

// Animation à l'entrée de chaque section
sections.forEach((section) => {
    section.style.opacity = 0;
    section.style.animation = "fadeIn 0.5s forwards";
});

// Animation au changement de section
window.addEventListener("hashchange", () => {
    sections.forEach((section) => {
        section.style.opacity = 0;
        section.style.animation = "fadeOut 0.3s forwards";
    });

    const currentSection = document.querySelector(window.location.hash);
    currentSection.style.animation = "fadeIn 0.5s forwards";
});
