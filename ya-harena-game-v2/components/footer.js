export const FooterComponent = {
    render() {
        const currentYear = new Date().getFullYear();
        
        return `
            <footer class="footer-section" style="background: linear-gradient(135deg, #1a1a2e, #0f3460); border-top: 3px solid var(--accent-color);">
                <div class="container py-5">
                    <div class="row">
                        <!-- Colonne 1 - À propos -->
                        <div class="col-lg-4 col-md-6 mb-4">
                            <h5 class="text-warning mb-3">
                                <i class="fas fa-casino me-2"></i>Casino Malagasy
                            </h5>
                            <p class="text-light opacity-75">
                                La première plateforme de jeux d'argent en ligne inspirée par la richesse culturelle de Madagascar. 
                                Jouez de manière responsable avec notre monnaie virtuelle Ariary.
                            </p>
                            <div class="social-links mt-3">
                                <a href="#" class="text-warning me-3"><i class="fab fa-facebook fa-lg"></i></a>
                                <a href="#" class="text-warning me-3"><i class="fab fa-twitter fa-lg"></i></a>
                                <a href="#" class="text-warning me-3"><i class="fab fa-instagram fa-lg"></i></a>
                                <a href="#" class="text-warning me-3"><i class="fab fa-youtube fa-lg"></i></a>
                                <a href="#" class="text-warning"><i class="fab fa-whatsapp fa-lg"></i></a>
                            </div>
                        </div>

                        <!-- Colonne 2 - Liens Rapides -->
                        <div class="col-lg-2 col-md-6 mb-4">
                            <h6 class="text-warning mb-3">Liens Rapides</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <a href="#" data-page="home" class="footer-link text-light text-decoration-none">
                                        <i class="fas fa-chevron-right me-2"></i>Accueil
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" data-page="games" class="footer-link text-light text-decoration-none">
                                        <i class="fas fa-chevron-right me-2"></i>Jeux
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" data-page="history" class="footer-link text-light text-decoration-none">
                                        <i class="fas fa-chevron-right me-2"></i>Historique
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" data-page="profile" class="footer-link text-light text-decoration-none">
                                        <i class="fas fa-chevron-right me-2"></i>Profil
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" data-page="culture" class="footer-link text-light text-decoration-none">
                                        <i class="fas fa-chevron-right me-2"></i>Culture
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Colonne 3 - Jeux Populaires -->
                        <div class="col-lg-3 col-md-6 mb-4">
                            <h6 class="text-warning mb-3">Jeux Populaires</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <a href="#" class="footer-link text-light text-decoration-none" onclick="casinoApp.gamesManager.openGame('blackjack')">
                                        <i class="fas fa-dice me-2"></i>Blackjack
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" class="footer-link text-light text-decoration-none" onclick="casinoApp.gamesManager.openGame('slots-classic')">
                                        <i class="fas fa-dice me-2"></i>Machines à Sous
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" class="footer-link text-light text-decoration-none" onclick="casinoApp.gamesManager.openGame('roulette-europeenne')">
                                        <i class="fas fa-dice me-2"></i>Roulette
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" class="footer-link text-light text-decoration-none" onclick="casinoApp.gamesManager.openGame('poker')">
                                        <i class="fas fa-dice me-2"></i>Poker Malagasy
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <a href="#" class="footer-link text-light text-decoration-none" onclick="casinoApp.gamesManager.openGame('fanorona')">
                                        <i class="fas fa-dice me-2"></i>Fanorona Bet
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Colonne 4 - Contact & Support -->
                        <div class="col-lg-3 col-md-6 mb-4">
                            <h6 class="text-warning mb-3">Contact & Support</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2 text-light">
                                    <i class="fas fa-map-marker-alt me-2 text-warning"></i>
                                    Antananarivo, Madagascar
                                </li>
                                <li class="mb-2 text-light">
                                    <i class="fas fa-phone me-2 text-warning"></i>
                                    +261 20 22 000 00
                                </li>
                                <li class="mb-2">
                                    <a href="mailto:support@casino-malagasy.mg" class="footer-link text-light text-decoration-none">
                                        <i class="fas fa-envelope me-2 text-warning"></i>
                                        support@casino-malagasy.mg
                                    </a>
                                </li>
                                <li class="mb-2 text-light">
                                    <i class="fas fa-clock me-2 text-warning"></i>
                                    Support 24/7
                                </li>
                                <li class="mb-2">
                                    <button class="btn btn-outline-warning btn-sm mt-2" onclick="document.getElementById('chatbotToggle').click()">
                                        <i class="fas fa-comments me-2"></i>Chat en Direct
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Séparateur -->
                    <hr style="border-color: rgba(255,255,255,0.1);">

                    <!-- Section Légale -->
                    <div class="row mt-4">
                        <div class="col-md-6 mb-3">
                            <div class="d-flex flex-wrap gap-3">
                                <a href="#" class="footer-link text-light text-decoration-none small">
                                    Conditions d'utilisation
                                </a>
                                <a href="#" class="footer-link text-light text-decoration-none small">
                                    Politique de confidentialité
                                </a>
                                <a href="#" class="footer-link text-light text-decoration-none small">
                                    Jeu responsable
                                </a>
                                <a href="#" class="footer-link text-light text-decoration-none small">
                                    FAQ
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <p class="text-light mb-2">
                                <i class="fas fa-shield-alt text-success me-2"></i>
                                Jeu responsable - 18+ uniquement
                            </p>
                            <div class="payment-methods">
                                <i class="fas fa-coins text-warning me-2" title="Ariary"></i>
                                <span class="badge bg-warning text-dark">Ar</span>
                                <span class="text-light ms-2">Monnaie Virtuelle Ariary</span>
                            </div>
                        </div>
                    </div>

                    <!-- Copyright -->
                    <div class="row mt-4">
                        <div class="col-12 text-center">
                            <div class="p-3" style="background: rgba(0,0,0,0.2); border-radius: 10px;">
                                <p class="mb-1 text-light">
                                    © ${currentYear} <strong>RH TECH</strong> - Tous droits réservés
                                </p>
                                <p class="mb-0 small text-muted">
                                    Casino Malagasy est une plateforme de divertissement virtuel. 
                                    Cette application utilise une monnaie fictive (Ariary virtuel) à des fins de simulation.
                                    Le jeu comporte des risques. Jouez de manière responsable.
                                </p>
                                <p class="mt-2 mb-0 small">
                                    <span class="text-warning">RH TECH</span> 
                                    <span class="text-light">|</span> 
                                    <span class="text-muted">Développement Web & Applications</span>
                                    <span class="text-light">|</span> 
                                    <span class="text-muted">${currentYear}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    },

    setupEventListeners() {
        // Animation des liens du footer
        document.querySelectorAll('.footer-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }
};