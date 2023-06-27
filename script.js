const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    nav.classList.toggle('open');
});

// Animation à l'entrée de chaque section
sections.forEach((section) => {
    section.style.opacity = 0;
    section.style.animation = 'fadeIn 0.5s forwards';
});

// Animation au changement de section
window.addEventListener('hashchange', () => {
    sections.forEach((section) => {
        section.style.opacity = 0;
        section.style.animation = 'fadeOut 0.3s forwards';
    });

    const currentSection = document.querySelector(window.location.hash);
    currentSection.style.animation = 'fadeIn 0.5s forwards';
});
