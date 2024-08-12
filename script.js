document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const projectDescription = button.previousElementSibling;

        projectDescription.classList.toggle('expanded');

        if (projectDescription.classList.contains('expanded')) {
            button.textContent = 'Weniger anzeigen'; // Mostrar "Ver menos" em alemão
        } else {
            button.textContent = 'Ver mais';
        }
    });
});
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('header nav ul');

    hamburgerBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});
