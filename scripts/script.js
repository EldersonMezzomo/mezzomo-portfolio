


// Script para botão "Ver mais" e "Ver menos"
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const projectDescription = button.previousElementSibling;

        projectDescription.classList.toggle('expanded');

        if (projectDescription.classList.contains('expanded')) {
            button.textContent = translations.general.readLessBtn; // Mostrar "Ver menos" conforme a tradução
        } else {
            button.textContent = translations.general.readMoreBtn; // Mostrar "Ver mais" conforme a tradução
        }
    });
});



// Script para o menu hambúrguer
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('header nav ul');
    const menuItems = navMenu.querySelectorAll('li a'); // Seleciona todos os links do menu

    // Função para abrir/fechar o menu
    hamburgerBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Impede que o clique feche imediatamente o menu
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer área fora dele
    document.addEventListener('click', function (event) {
        if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active'); // Fecha o menu se estiver aberto
            }
        }
    });

    // Fecha o menu ao clicar em um item de navegação
    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active'); // Fecha o menu ao clicar em um link
            }
        });
    });
});



// Script para carregar idiomas
document.addEventListener("DOMContentLoaded", function () {
    const currentLangButton = document.getElementById('current-lang');
    const currentLangText = document.getElementById('current-lang-text'); // Span que mostra o código do idioma
    const resumeLink = document.getElementById('resume-link');
    const certificatesLink = document.getElementById('certificates-link');
    const langOptions = ['de', 'en', 'pt']; // Ciclo de idiomas
    let currentLangIndex = 0;

    // Função para carregar o idioma selecionado
    function loadLanguage(lang) {
        fetch(`/languages/${lang}.json`)
            .then(response => response.json())
            .then(data => applyTranslations(data))
            .catch(error => console.error('Erro ao carregar o arquivo de idioma:', error));

        updateDownloadLinks(lang); // Atualiza os links conforme o idioma
    }

    function updateDownloadLinks(lang) {
        const resumeFiles = {
            'de': 'assets/documents/lebenslauf-frontend-elderson-luciano-mezzomo-v1.pdf',
            'en': 'assets/documents/resume-frontend-elderson-luciano-mezzomo-v1.pdf',
            'pt': 'assets/documents/curriculo-frontend-elderson-luciano-mezzomo-v1.pdf'
        };
        const certificatesFiles = {
            'de': 'assets/documents/diplome-und-zertifikate.zip',
            'en': 'assets/documents/certificates-and-diplomas.zip',
            'pt': 'assets/documents/diplomas-e-certificados.zip'
        };

        // Atualiza os links
        resumeLink.href = resumeFiles[lang];
        certificatesLink.href = certificatesFiles[lang];
    }

// Função para aplicar as traduções no site
function applyTranslations(translations) {
    // Navigation Links
    document.getElementById('nav-about').innerHTML = translations.nav.about;
    document.getElementById('nav-fertigkeiten').innerHTML = translations.nav.fertigkeiten;
    document.getElementById('nav-projekte').innerHTML = translations.nav.projekte;
    document.getElementById('nav-kontakt').innerHTML = translations.nav.kontakt;
    document.getElementById('nav-downloads').innerHTML = translations.nav.downloads;

    currentLangButton.setAttribute('title', translations.general.languageTooltip);

    // About Section
    document.getElementById('about-title').innerHTML = translations.about.title; // Aqui o título é atualizado corretamente
    document.querySelector('.about-text h1').innerHTML = translations.about.h1;
    document.getElementById('about-text').innerHTML = translations.about.text;

    document.querySelectorAll('.talk-btn').forEach(btn => {
        btn.innerHTML = translations.general.talkBtn;
    });

    // Skills Section
    document.getElementById('skills-title').innerHTML = translations.skills.title;
    document.getElementById('skill-1').innerHTML = translations.skills.skill1;
    document.getElementById('skill-2').innerHTML = translations.skills.skill2;
    document.getElementById('skill-3').innerHTML = translations.skills.skill3;
    document.getElementById('skill-4').innerHTML = translations.skills.skill4;
    document.getElementById('skill-5').innerHTML = translations.skills.skill5;

    // Projects Section
    document.getElementById('projects-title').innerHTML = translations.projects.title;
    document.getElementById('project-1-desc').innerHTML = translations.projects.project1.desc;
    document.getElementById('project-1-technologies-title').innerHTML = translations.projects.project1.technologiesTitle;
    document.getElementById('project-1-html').innerHTML = translations.projects.project1.html;
    document.getElementById('project-1-css').innerHTML = translations.projects.project1.css;
    document.getElementById('project-1-js').innerHTML = translations.projects.project1.js;
    document.getElementById('project-1-conclusion').innerHTML = translations.projects.project1.conclusion;
    document.getElementById('project-1-code-btn').innerHTML = translations.projects.project1.codeBtn;
    document.getElementById('project-1-view-btn').innerHTML = translations.projects.project1.viewBtn;

    document.getElementById('project-2-desc').innerHTML = translations.projects.project2.desc;
    document.getElementById('project-2-technologies-title').innerHTML = translations.projects.project2.technologiesTitle;
    document.getElementById('project-2-html').innerHTML = translations.projects.project2.html;
    document.getElementById('project-2-css').innerHTML = translations.projects.project2.css;
    document.getElementById('project-2-js').innerHTML = translations.projects.project2.js;
    document.getElementById('project-2-conclusion').innerHTML = translations.projects.project2.conclusion;
    document.getElementById('project-2-code-btn').innerHTML = translations.projects.project2.codeBtn;
    document.getElementById('project-2-view-btn').innerHTML = translations.projects.project2.viewBtn;

    document.getElementById('project-3-desc').innerHTML = translations.projects.project3.desc;
    document.getElementById('project-3-technologies-title').innerHTML = translations.projects.project3.technologiesTitle;
    document.getElementById('project-3-html').innerHTML = translations.projects.project3.html;
    document.getElementById('project-3-css').innerHTML = translations.projects.project3.css;
    document.getElementById('project-3-js').innerHTML = translations.projects.project3.js;
    document.getElementById('project-3-conclusion').innerHTML = translations.projects.project3.conclusion;
    document.getElementById('project-3-conclusion-final').innerHTML = translations.projects.project3.conclusionFinal;
    document.getElementById('project-3-code-btn').innerHTML = translations.projects.project3.codeBtn;
    document.getElementById('project-3-view-btn').innerHTML = translations.projects.project3.viewBtn;
    document.getElementById('weitere-projekte-title').innerHTML = translations.projects.weitereProjekte.title;
    document.getElementById('project-3-summary').innerHTML = translations.projects.weitereProjekte.desc;
    document.getElementById('weitere-projekte-btn').innerHTML = translations.projects.weitereProjekte.viewBtn;

    // Contact Section
    document.getElementById('contact-title').innerHTML = translations.contact.title;
    document.getElementById('contact-text').innerHTML = translations.contact.text;

    // Downloads Section
    document.getElementById('downloads-title').innerHTML = translations.downloads.title;
    document.getElementById('downloads-text').innerHTML = translations.downloads.text;

    // Footer Menu Links
    document.getElementById('footer-about').innerHTML = translations.footer.menu.about;
    document.getElementById('footer-skills').innerHTML = translations.footer.menu.skills;
    document.getElementById('footer-projects').innerHTML = translations.footer.menu.projects;
    document.getElementById('footer-contact').innerHTML = translations.footer.menu.contact;
    document.getElementById('footer-downloads').innerHTML = translations.footer.menu.downloads;
    document.getElementById('footer-more-projects').innerHTML = translations.footer.menu.moreProjects;
    document.getElementById('footer-text').innerHTML = translations.footer.text;

    // Atualiza os botões de "Ver mais" e "Ver menos" conforme a linguagem
    document.querySelectorAll('.read-more-btn').forEach(button => {
        if (button.parentElement.querySelector('.project-description').classList.contains('expanded')) {
            button.innerHTML = translations.general.readLessBtn;
        } else {
            button.innerHTML = translations.general.readMoreBtn;
        }
    });
}



    // Função para alternar para o próximo idioma no ciclo (DE -> EN -> PT)
    function switchLanguage() {
        currentLangIndex = (currentLangIndex + 1) % langOptions.length; // Cicla entre 0, 1, 2
        const newLang = langOptions[currentLangIndex];

        // Atualiza o texto do botão com o novo idioma
        currentLangText.textContent = newLang.toUpperCase(); // Atualiza para "DE", "EN" ou "PT"

        // Carrega o novo idioma
        loadLanguage(newLang);

        // Salva o idioma escolhido no localStorage
        localStorage.setItem('selectedLanguage', newLang);
    }

    // Carregar o idioma salvo no localStorage (se houver) ou usar 'de' como padrão
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && langOptions.includes(savedLang)) {
        currentLangIndex = langOptions.indexOf(savedLang);
        currentLangText.textContent = savedLang.toUpperCase(); // Define o texto correto no botão
        loadLanguage(savedLang); // Carrega o idioma salvo
    } else {
        loadLanguage('de'); // Carrega o idioma alemão por padrão
        currentLangText.textContent = 'DE'; // Define "DE" como o texto padrão
    }

    // Adiciona o evento de clique no botão de idioma para alternar o idioma
    currentLangButton.addEventListener('click', switchLanguage);
});



//alternância de temas:
document.addEventListener('DOMContentLoaded', function () {
    const paletteBtn = document.getElementById('palette-btn'); // Botão de paleta de cores
    const themeStylesheet = document.getElementById('theme-stylesheet'); // Link que carrega o tema
    const themes = ['thema-default.css', 'thema-dark.css', 'thema-light.css', 'thema-retro.css', 'thema-futuristic.css']; // Lista de temas
    let currentThemeIndex = 0; // Índice do tema atual

    // Função para alternar entre os temas
    function switchTheme() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length; // Cicla entre os temas
        const newTheme = themes[currentThemeIndex]; // Seleciona o próximo tema

        // Atualiza o href do link para carregar o novo tema a partir da pasta "styles"
        themeStylesheet.href = `styles/${newTheme}`;

        // Salva o tema selecionado no localStorage para lembrar na próxima visita
        localStorage.setItem('selectedTheme', newTheme);
    }

    // Carregar o tema salvo no localStorage, se houver
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        themeStylesheet.href = `styles/${savedTheme}`; // Aplica o tema salvo
        currentThemeIndex = themes.indexOf(savedTheme); // Define o índice do tema salvo
    }

    // Adicionar evento de clique ao botão de paleta para alternar entre os temas
    paletteBtn.addEventListener('click', switchTheme);
});