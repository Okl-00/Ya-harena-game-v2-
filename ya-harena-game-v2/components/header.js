export const HeaderComponent = {
    render(user) {
        return `
            <nav class="navbar navbar-expand-lg fixed-top" style="background: rgba(26, 26, 46, 0.95); backdrop-filter: blur(10px);">
                <div class="container">
                    <a class="navbar-brand" href="#" data-page="home">
                        <i class="fas fa-casino" style="color: var(--accent-color);"></i>
                        <span class="ms-2" style="color: var(--accent-color); font-weight: bold;">
                            Casino Malagasy
                        </span>
                    </a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-page="home">
                                    <i class="fas fa-home"></i> Accueil
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-page="games">
                                    <i class="fas fa-gamepad"></i> Jeux
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-page="history">
                                    <i class="fas fa-history"></i> Historique
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-page="culture">
                                    <i class="fas fa-landmark"></i> Culture
                                </a>
                            </li>
                        </ul>
                        
                        <div class="d-flex align-items-center">
                            ${user ? `
                                <div class="me-3">
                                    <span class="badge bg-warning text-dark p-2">
                                        <i class="fas fa-coins"></i>
                                        <span class="user-balance">${user.balance?.toLocaleString() || '0'} Ar</span>
                                    </span>
                                </div>
                                <div class="user-menu-container"></div>
                            ` : `
                                <button class="btn btn-outline-warning me-2" data-page="login">
                                    <i class="fas fa-sign-in-alt"></i> Connexion
                                </button>
                                <button class="btn btn-casino" data-page="register">
                                    <i class="fas fa-user-plus"></i> Inscription
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </nav>
        `;
    },

    setupEventListeners(app) {
        // Les événements sont gérés par la navigation dans app.js
    }
};