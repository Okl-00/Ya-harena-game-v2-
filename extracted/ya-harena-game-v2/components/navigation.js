export class NavigationManager {
    constructor() {
        this.currentPage = 'home';
        this.pageHistory = [];
        this.setupNavigationEvents();
    }

    setupNavigationEvents() {
        // Gestion du bouton retour du navigateur
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                this.navigateTo(event.state.page, false);
            }
        });
    }

    navigateTo(page, addToHistory = true) {
        if (this.currentPage === page) return;

        // Animation de sortie
        const content = document.getElementById('app-content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
        }

        setTimeout(async () => {
            // Charger la nouvelle page
            await window.casinoApp.loadPage(page);
            
            // Animation d'entrée
            if (content) {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
                content.style.transition = 'all 0.3s ease';
            }

            // Mettre à jour l'historique
            if (addToHistory) {
                this.pageHistory.push(page);
                history.pushState({ page }, '', `#${page}`);
            }

            // Mettre à jour les liens actifs
            this.updateActiveLinks(page);
            
            // Fermer le menu mobile si ouvert
            this.closeMobileMenu();

            this.currentPage = page;
        }, 150);
    }

    updateActiveLinks(page) {
        document.querySelectorAll('[data-page]').forEach(link => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    closeMobileMenu() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }

    goBack() {
        if (this.pageHistory.length > 1) {
            this.pageHistory.pop(); // Retirer la page actuelle
            const previousPage = this.pageHistory[this.pageHistory.length - 1];
            this.navigateTo(previousPage, false);
        }
    }

    getCurrentPage() {
        return this.currentPage;
    }

    loadPageFromHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            this.navigateTo(hash, false);
        } else {
            this.navigateTo('home', false);
        }
    }
}