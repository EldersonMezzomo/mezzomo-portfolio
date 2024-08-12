// Script para botão "Ver mais"
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

// Script para o menu hambúrguer
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('header nav ul');

    hamburgerBtn.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });
});

// Script para carregar idiomas
document.addEventListener("DOMContentLoaded", function () {
    const currentLangButton = document.getElementById('current-lang');
    const langOptions = document.getElementById('lang-options');
    const languageButtons = document.querySelectorAll('.lang-btn');

    function loadLanguage(lang) {
        fetch(`/languages/${lang}.json`)
            .then(response => response.json())
            .then(data => applyTranslations(data))
            .catch(error => console.error('Erro ao carregar o arquivo de idioma:', error));
    }

    function applyTranslations(translations) {
        document.getElementById('nav-about').textContent = translations.nav.about;
        document.getElementById('nav-fertigkeiten').textContent = translations.nav.fertigkeiten;
        document.getElementById('nav-projekte').textContent = translations.nav.projekte;
        document.getElementById('nav-kontakt').textContent = translations.nav.kontakt;
        document.getElementById('nav-downloads').textContent = translations.nav.downloads;
        document.getElementById('about-title').textContent = translations.about.title;
        document.getElementById('about-text').textContent = translations.about.text;
        document.getElementById('skills-title').textContent = translations.skills.title;
        document.getElementById('projects-title').textContent = translations.projects.title;
        document.getElementById('contact-title').textContent = translations.contact.title;
        document.getElementById('contact-text').textContent = translations.contact.text;
        document.getElementById('downloads-title').textContent = translations.downloads.title;
        document.getElementById('downloads-text').textContent = translations.downloads.text;
        document.getElementById('footer-text').innerHTML = translations.footer.text;
        document.getElementById('project-1-desc').textContent = translations.projects.project1.desc;
        document.getElementById('project-2-desc').textContent = translations.projects.project2.desc;
        document.getElementById('project-3-desc').textContent = translations.projects.project3.desc;

        // Atualiza o texto dentro dos links de download, mantendo os atributos intactos
        document.querySelector('#download-resume a').textContent = translations.downloads.items.resume;
        document.querySelector('#download-certificates a').textContent = translations.downloads.items.certificates;
    }




    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id;
            // Atualiza o ícone da bandeira
            const imgSrc = button.querySelector('img').src;
            currentLangButton.querySelector('img').src = imgSrc;

            // Fecha as opções de idioma
            langOptions.style.display = 'none';

            // Atualiza o idioma ativo
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            loadLanguage(lang);
        });
    });

    // Exibe ou oculta as opções de idioma ao clicar na bandeira
    currentLangButton.addEventListener('click', () => {
        langOptions.style.display = langOptions.style.display === 'block' ? 'none' : 'block';
    });

    // Carrega o idioma padrão (alemão)
    loadLanguage('de');
    document.getElementById('de').classList.add('active');
});
