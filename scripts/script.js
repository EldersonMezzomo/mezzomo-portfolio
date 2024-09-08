// Funções compartilhadas para o menu hambúrguer

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('header nav ul');

    if (hamburgerBtn && navMenu) {
        // Função para alternar o estado do menu (abrir/fechar)
        hamburgerBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            navMenu.classList.toggle('active');
        });

        // Função para fechar o menu ao clicar fora dele
        document.addEventListener('click', function (event) {
            if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });

        // Fecha o menu ao clicar em qualquer item de navegação
        const menuItems = navMenu.querySelectorAll('li a');
        menuItems.forEach(function (menuItem) {
            menuItem.addEventListener('click', function () {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
});


// Funções compartilhadas para a alternância de temas
document.addEventListener('DOMContentLoaded', function () {
    const paletteBtn = document.getElementById('palette-btn');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const themes = ['thema-default.css', 'thema-dark.css', 'thema-light.css', 'thema-retro.css', 'thema-futuristic.css'];
    let currentThemeIndex = 0;

    // Caminho para os temas: Verifica se está na página 'projekte' para ajustar o caminho
    const isProjektePage = document.body.classList.contains('projekte');
    const themePath = isProjektePage ? '../styles/' : 'styles/';

    // Função para alternar entre os temas
    function switchTheme() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        themeStylesheet.href = `${themePath}${newTheme}`;
        localStorage.setItem('selectedTheme', newTheme);
    }

    // Verifica se o tema foi salvo no localStorage anteriormente
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        themeStylesheet.href = `${themePath}${savedTheme}`;
        currentThemeIndex = themes.indexOf(savedTheme);
    }

    // Adiciona o evento de clique no botão de alternância de temas
    if (paletteBtn) {
        paletteBtn.addEventListener('click', switchTheme);
    }
});

// Função compartilhada para o botão "Leia mais/Leia menos"
document.addEventListener('DOMContentLoaded', function () {

    // Função para alternar a seta do botão com base no estado expandido/recolhido
    function toggleButtonArrow(button, isExpanded) {
        button.textContent = isExpanded ? '▲' : '▼';
    }

    // Função para inicializar os botões de "Leia mais"
    function initReadMoreButtons() {
        document.querySelectorAll('.read-more-btn').forEach(button => {
            const projectDescription = button.previousElementSibling;

            // Define o evento de clique no botão
            button.addEventListener('click', function () {
                const isExpanded = projectDescription.classList.toggle('expanded');
                toggleButtonArrow(button, isExpanded);
            });

            // Atualiza o ícone do botão ao carregar a página, de acordo com o estado expandido ou não
            const isExpanded = projectDescription.classList.contains('expanded');
            toggleButtonArrow(button, isExpanded);
        });
    }

    // Inicializa os botões de "Leia mais" ao carregar a página
    initReadMoreButtons();
});


// Função para gerenciamento de idiomas
document.addEventListener('DOMContentLoaded', function () {
    const isIndexPage = document.body.classList.contains('index');
    const isProjektePage = document.body.classList.contains('projekte');

    // Função para obter o idioma salvo ou definir como 'de' por padrão
    function getCurrentLanguage() {
        const savedLang = localStorage.getItem('selectedLanguage');
        return savedLang ? savedLang : 'de';
    }

    // Função para salvar o idioma selecionado no localStorage
    function setCurrentLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);
    }

    // Função para alternar o idioma e recarregar as traduções
    function switchLanguage() {
        const currentLang = getCurrentLanguage();
        const langOptions = ['de', 'en', 'pt'];
        const nextLang = langOptions[(langOptions.indexOf(currentLang) + 1) % langOptions.length];

        setCurrentLanguage(nextLang);
        document.getElementById('current-lang-text').textContent = nextLang.toUpperCase();

        // Carrega as traduções de acordo com a página atual
        if (isIndexPage) {
            loadLanguageForIndex();
        } else if (isProjektePage) {
            loadLanguageForProjekte();
        }
    }

    // Função para carregar o idioma selecionado e aplicar as traduções
    function loadLanguage(langPath, callback) {
        fetch(langPath)
            .then(response => response.json())
            .then(data => {
                callback(data);
            })
            .catch(error => console.error('Erro ao carregar o arquivo de idioma:', error));
    }

    // Função que aplica as traduções na página index.html
    function loadLanguageForIndex() {
        const currentLang = getCurrentLanguage();
        const langPath = `/languages/${currentLang}.json`;

        loadLanguage(langPath, applyTranslationsForIndex);
    }

    // Aplica as traduções para a página index.html
    function applyTranslationsForIndex(translations) {
        document.getElementById('nav-about').innerHTML = translations.nav.about;
        document.getElementById('nav-fertigkeiten').innerHTML = translations.nav.fertigkeiten;
        document.getElementById('nav-projekte').innerHTML = translations.nav.projekte;
        document.getElementById('nav-kontakt').innerHTML = translations.nav.kontakt;
        document.getElementById('nav-downloads').innerHTML = translations.nav.downloads;

        // About Section
        document.getElementById('about-title').innerHTML = translations.about.title;
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
        document.getElementById('download-resume-text').textContent = translations.downloads.resumeText;
        document.getElementById('download-certificates-text').textContent = translations.downloads.certificatesText;
        document.getElementById('resume-link').href = `assets/documents/${translations.downloads.resumeFile}`;
        document.getElementById('certificates-link').href = `assets/documents/${translations.downloads.certificatesFile}`;

        // Footer
        document.getElementById('footer-about').innerHTML = translations.footer.menu.about;
        document.getElementById('footer-skills').innerHTML = translations.footer.menu.skills;
        document.getElementById('footer-projects').innerHTML = translations.footer.menu.projects;
        document.getElementById('footer-contact').innerHTML = translations.footer.menu.contact;
        document.getElementById('footer-downloads').innerHTML = translations.footer.menu.downloads;
        document.getElementById('footer-more-projects').innerHTML = translations.footer.menu.moreProjects;
        document.getElementById('footer-text').innerHTML = translations.footer.text;
    }

    // Função que aplica as traduções na página projekte.html
    function loadLanguageForProjekte() {
        const currentLang = getCurrentLanguage();
        const langPath = `./languages/${currentLang}.json`;

        loadLanguage(langPath, applyTranslationsForProjekte);
    }

    // Aplica as traduções para a página projekte.html
    function applyTranslationsForProjekte(translations) {
        document.getElementById('nav-about').innerHTML = translations.nav.about;
        document.getElementById('nav-fertigkeiten').innerHTML = translations.nav.fertigkeiten;
        document.getElementById('nav-projekte').innerHTML = translations.nav.projekte;
        document.getElementById('nav-kontakt').innerHTML = translations.nav.kontakt;
        document.getElementById('nav-downloads').innerHTML = translations.nav.downloads;

        document.getElementById('projekte-projects-title').innerHTML = translations.projects.title;
        document.getElementById('projekte-project-1-desc').innerHTML = translations.projects.project1.desc;
        document.getElementById('projekte-project-1-technologies-title').innerHTML = translations.projects.project1.technologiesTitle;
        document.getElementById('projekte-project-1-html').innerHTML = translations.projects.project1.html;
        document.getElementById('projekte-project-1-css').innerHTML = translations.projects.project1.css;
        document.getElementById('projekte-project-1-js').innerHTML = translations.projects.project1.js;
        document.getElementById('projekte-project-1-conclusion').innerHTML = translations.projects.project1.conclusion;
        document.getElementById('projekte-project-1-code-btn').innerHTML = translations.projects.project1.codeBtn;
        document.getElementById('projekte-project-1-view-btn').innerHTML = translations.projects.project1.viewBtn;

        document.getElementById('footer-about').innerHTML = translations.footer.menu.about;
        document.getElementById('footer-skills').innerHTML = translations.footer.menu.skills;
        document.getElementById('footer-projects').innerHTML = translations.footer.menu.projects;
        document.getElementById('footer-contact').innerHTML = translations.footer.menu.contact;
        document.getElementById('footer-downloads').innerHTML = translations.footer.menu.downloads;
        document.getElementById('footer-more-projects').innerHTML = translations.footer.menu.moreProjects;
        document.getElementById('footer-text').innerHTML = translations.footer.text;
    }

    // Carrega a tradução correta ao carregar a página
    if (isIndexPage) {
        loadLanguageForIndex();
    } else if (isProjektePage) {
        loadLanguageForProjekte();
    }

    // Adiciona o evento de troca de idioma
    document.getElementById('current-lang').addEventListener('click', switchLanguage);

    // Define o idioma inicial ao carregar a página
    document.getElementById('current-lang-text').textContent = getCurrentLanguage().toUpperCase();
});