// Application principale
import { AuthManager } from './auth.js';
import { GamesManager } from './games-manager.js';
import { Chatbot } from './chatbot.js';
import { StorageManager } from './storage.js';
import { UIManager } from './utils.js';
import { HeaderComponent } from '../components/header.js';
import { FooterComponent } from '../components/footer.js';
import { PopupManager } from '../components/popup.js';
import { NavigationManager } from '../components/navigation.js';

class CasinoApp {
    constructor() {
        this.authManager = new AuthManager();
        this.gamesManager = new GamesManager();
        this.chatbot = new Chatbot();
        this.storageManager = new StorageManager();
        this.uiManager = new UIManager();
        this.popupManager = new PopupManager();
        this.navigationManager = new NavigationManager();
        this.currentUser = null;
        this.balance = 0;
    }

    async init() {
        console.log('🎰 Initialisation du Casino Malagasy...');
        
        // Initialiser les composants
        this.renderHeader();
        this.renderFooter();
        this.initChatbot();
        
        // Vérifier l'authentification
        await this.checkAuth();
        
        // Charger la page d'accueil
        this.loadPage('home');
        
        // Gérer les événements de navigation
        this.setupNavigation();
        
        console.log('✅ Casino Malagasy initialisé avec succès!');
    }

    async checkAuth() {
        const token = this.storageManager.getSecureItem('auth_token');
        if (token) {
            try {
                const userData = this.authManager.verifyToken(token);
                if (userData) {
                    this.currentUser = userData;
                    this.balance = await this.storageManager.getBalance(userData.id);
                    this.updateUIForAuth();
                }
            } catch (error) {
                this.storageManager.removeSecureItem('auth_token');
            }
        }
    }

    updateUIForAuth() {
        const header = document.getElementById('app-header');
        if (this.currentUser) {
            // Mettre à jour l'interface pour utilisateur connecté
            this.uiManager.updateBalance(this.balance);
            this.uiManager.showUserMenu(this.currentUser);
        }
    }

    renderHeader() {
        const headerContainer = document.getElementById('app-header');
        headerContainer.innerHTML = HeaderComponent.render(this.currentUser);
        HeaderComponent.setupEventListeners(this);
    }

    renderFooter() {
        const footerContainer = document.getElementById('app-footer');
        footerContainer.innerHTML = FooterComponent.render();
    }

    initChatbot() {
        this.chatbot.init();
    }

    async loadPage(page) {
        const contentContainer = document.getElementById('app-content');
        
        try {
            let html = '';
            
            switch(page) {
                case 'home':
                    html = await this.loadTemplate('pages/home.html');
                    break;
                case 'games':
                    html = await this.loadTemplate('pages/games.html');
                    break;
                case 'history':
                    html = await this.loadTemplate('pages/history.html');
                    break;
                case 'profile':
                    html = await this.loadTemplate('pages/profile.html');
                    break;
                case 'culture':
                    html = await this.loadTemplate('pages/malagasy-culture.html');
                    break;
                case 'login':
                    html = this.authManager.renderLoginForm();
                    break;
                case 'register':
                    html = this.authManager.renderRegisterForm();
                    break;
                default:
                    html = '<h2>Page non trouvée</h2>';
            }
            
            contentContainer.innerHTML = html;
            this.setupPageEvents(page);
            
        } catch (error) {
            console.error('Erreur de chargement:', error);
            contentContainer.innerHTML = '<h2>Erreur de chargement</h2>';
        }
    }

    async loadTemplate(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return await response.text();
    }

    setupPageEvents(page) {
        switch(page) {
            case 'games':
                this.gamesManager.init(this);
                break;
            case 'history':
                this.loadHistory();
                break;
            case 'profile':
                this.loadProfile();
                break;
        }
    }

    setupNavigation() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page]')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.loadPage(page);
            }
        });
    }

    async placeBet(gameId, amount) {
        if (!this.currentUser) {
            this.popupManager.show('error', 'Veuillez vous connecter pour jouer');
            return false;
        }

        if (amount > this.balance) {
            this.popupManager.show('error', 'Solde insuffisant');
            return false;
        }

        const result = await this.gamesManager.playGame(gameId, amount);
        
        if (result.win) {
            this.balance += result.payout;
            this.popupManager.showWin(result);
        } else {
            this.balance -= amount;
            this.popupManager.showLoss(result);
        }

        this.uiManager.updateBalance(this.balance);
        await this.storageManager.saveGameHistory(this.currentUser.id, result);
        
        return true;
    }

    showPromotion(promotion) {
        this.popupManager.showPromotion(promotion);
    }

    loadHistory() {
        if (!this.currentUser) return;
        
        const history = this.storageManager.getGameHistory(this.currentUser.id);
        this.uiManager.renderHistory(history);
    }

    loadProfile() {
        if (!this.currentUser) return;
        this.uiManager.renderProfile(this.currentUser);
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    const app = new CasinoApp();
    app.init();
    
    // Exposer l'application globalement pour le débogage
    window.casinoApp = app;
});