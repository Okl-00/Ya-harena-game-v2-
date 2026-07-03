export class GamesManager {
    constructor() {
        this.games = this.initializeGames();
        this.currentGame = null;
    }

    initializeGames() {
        return [
            // Jeux de cartes
            { id: 'blackjack', name: 'Blackjack', category: 'cartes', icon: '♠️', minBet: 100, maxBet: 10000 },
            { id: 'poker', name: 'Poker Malagasy', category: 'cartes', icon: '🃏', minBet: 200, maxBet: 20000 },
            { id: 'baccarat', name: 'Baccarat', category: 'cartes', icon: '🎴', minBet: 100, maxBet: 15000 },
            { id: 'punto-banco', name: 'Punto Banco', category: 'cartes', icon: '🂡', minBet: 150, maxBet: 12000 },
            { id: 'blackjack-switch', name: 'Blackjack Switch', category: 'cartes', icon: '🂦', minBet: 200, maxBet: 15000 },
            
            // Machines à sous
            { id: 'slots-classic', name: 'Machines à Sous Classic', category: 'slots', icon: '🎰', minBet: 50, maxBet: 5000 },
            { id: 'slots-video', name: 'Video Slots', category: 'slots', icon: '🎮', minBet: 50, maxBet: 5000 },
            { id: 'slots-progressif', name: 'Jackpot Progressif', category: 'slots', icon: '💎', minBet: 100, maxBet: 10000 },
            { id: 'slots-3d', name: 'Slots 3D', category: 'slots', icon: '🎯', minBet: 75, maxBet: 7500 },
            { id: 'slots-fruit', name: 'Fruit Slots', category: 'slots', icon: '🍒', minBet: 25, maxBet: 2500 },
            
            // Roulettes
            { id: 'roulette-europeenne', name: 'Roulette Européenne', category: 'roulette', icon: '🎡', minBet: 100, maxBet: 20000 },
            { id: 'roulette-americaine', name: 'Roulette Américaine', category: 'roulette', icon: '🎪', minBet: 100, maxBet: 20000 },
            { id: 'roulette-francaise', name: 'Roulette Française', category: 'roulette', icon: '🗼', minBet: 200, maxBet: 25000 },
            
            // Dés
            { id: 'craps', name: 'Craps', category: 'des', icon: '🎲', minBet: 100, maxBet: 10000 },
            { id: 'sic-bo', name: 'Sic Bo', category: 'des', icon: '🎯', minBet: 50, maxBet: 8000 },
            { id: 'yams', name: 'Yams Casino', category: 'des', icon: '🎳', minBet: 75, maxBet: 7500 },
            
            // Jeux spéciaux
            { id: 'keno', name: 'Keno', category: 'special', icon: '🎱', minBet: 50, maxBet: 5000 },
            { id: 'bingo', name: 'Bingo', category: 'special', icon: '🎉', minBet: 50, maxBet: 5000 },
            { id: 'scratch', name: 'Cartes à Gratter', category: 'special', icon: '💳', minBet: 25, maxBet: 2500 },
            { id: 'wheel-fortune', name: 'Roue de la Fortune', category: 'special', icon: '☸️', minBet: 100, maxBet: 10000 },
            { id: 'hi-lo', name: 'Hi-Lo', category: 'special', icon: '📈', minBet: 50, maxBet: 5000 },
            
            // Jeux malagasy
            { id: 'fanorona', name: 'Fanorona Bet', category: 'malagasy', icon: '🏝️', minBet: 200, maxBet: 10000 },
            { id: 'moraingy', name: 'Moraingy Fight', category: 'malagasy', icon: '🥊', minBet: 300, maxBet: 15000 },
            { id: 'savika', name: 'Savika (Tauromachie)', category: 'malagasy', icon: '🐂', minBet: 250, maxBet: 12000 },
            { id: 'diamanga', name: 'Diamanga', category: 'malagasy', icon: '💠', minBet: 150, maxBet: 8000 },
            { id: 'tolon-omby', name: 'Tolon\'omby', category: 'malagasy', icon: '🏟️', minBet: 200, maxBet: 10000 },
            
            // Poker variants
            { id: 'texas-holdem', name: 'Texas Hold\'em', category: 'poker', icon: '♣️', minBet: 500, maxBet: 50000 },
            { id: 'omaha', name: 'Omaha Poker', category: 'poker', icon: '♦️', minBet: 500, maxBet: 50000 },
            { id: 'stud-poker', name: '7-Card Stud', category: 'poker', icon: '♥️', minBet: 300, maxBet: 30000 }
        ];
    }

    init(app) {
        this.app = app;
        this.renderGamesList();
        this.setupEventListeners();
    }

    renderGamesList() {
        const container = document.getElementById('games-container');
        if (!container) return;

        const categories = this.getCategories();
        
        let html = '<div class="container mt-4">';
        
        // Filtres par catégorie
        html += `
            <div class="row mb-4">
                <div class="col-12">
                    <div class="btn-group flex-wrap" role="group">
                        <button class="btn btn-outline-warning active" data-filter="all">Tous</button>
                        ${categories.map(cat => `
                            <button class="btn btn-outline-warning" data-filter="${cat.id}">${cat.name}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Grille de jeux
        html += '<div class="row" id="games-grid">';
        this.games.forEach(game => {
            html += `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 game-item" data-category="${game.category}">
                    <div class="game-card h-100" onclick="casinoApp.gamesManager.openGame('${game.id}')">
                        <div class="game-card-content">
                            <div class="game-icon">${game.icon}</div>
                            <div class="game-title">${game.name}</div>
                            <div class="game-description">
                                Mise: ${game.minBet} - ${game.maxBet} Ar
                            </div>
                            <span class="game-badge">${game.category}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div></div>';

        container.innerHTML = html;
        this.setupFilters();
    }

    getCategories() {
        const categories = {};
        this.games.forEach(game => {
            if (!categories[game.category]) {
                categories[game.category] = {
                    id: game.category,
                    name: this.getCategoryName(game.category)
                };
            }
        });
        return Object.values(categories);
    }

    getCategoryName(category) {
        const names = {
            'cartes': '🃏 Cartes',
            'slots': '🎰 Machines à Sous',
            'roulette': '🎡 Roulette',
            'des': '🎲 Dés',
            'special': '⭐ Spéciaux',
            'malagasy': '🇲🇬 Jeux Malagasy',
            'poker': '♠️ Poker'
        };
        return names[category] || category;
    }

    setupFilters() {
        document.querySelectorAll('[data-filter]').forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                
                // Mise à jour des boutons
                document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filtrage des jeux
                document.querySelectorAll('.game-item').forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    openGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) return;

        this.currentGame = game;
        
        const modal = new bootstrap.Modal(document.getElementById('gameModal'));
        const modalContent = document.getElementById('gameModalContent');
        
        modalContent.innerHTML = this.renderGameInterface(game);
        modal.show();
        
        this.setupGameEvents(game);
    }

    renderGameInterface(game) {
        switch(game.category) {
            case 'slots':
                return this.renderSlotMachine(game);
            case 'roulette':
                return this.renderRoulette(game);
            case 'cartes':
                return this.renderCardGame(game);
            case 'des':
                return this.renderDiceGame(game);
            default:
                return this.renderGenericGame(game);
        }
    }

    renderSlotMachine(game) {
        return `
            <div class="slot-machine">
                <h3 class="mb-4">${game.name}</h3>
                <div class="slot-reels">
                    <div class="slot-reel" id="reel1">🍒</div>
                    <div class="slot-reel" id="reel2">💎</div>
                    <div class="slot-reel" id="reel3">7️⃣</div>
                </div>
                <div class="mt-4">
                    <label class="form-label">Mise en Ariary</label>
                    <input type="number" class="form-control form-input" id="betAmount" 
                           min="${game.minBet}" max="${game.maxBet}" value="${game.minBet}">
                </div>
                <button class="btn btn-casino mt-3" onclick="casinoApp.gamesManager.spinSlots()">
                    🎰 LANCER
                </button>
                <div id="slotResult" class="mt-3"></div>
            </div>
        `;
    }

    async spinSlots() {
        const betAmount = parseInt(document.getElementById('betAmount').value);
        const result = await this.app.placeBet(this.currentGame.id, betAmount);
        
        if (result) {
            const reels = document.querySelectorAll('.slot-reel');
            const symbols = ['🍒', '💎', '7️⃣', '🎰', '⭐', '🍀', '💰', '👑'];
            
            document.querySelector('.slot-machine').classList.add('slot-spinning');
            
            // Animation des rouleaux
            setTimeout(() => {
                document.querySelector('.slot-machine').classList.remove('slot-spinning');
                
                const results = [];
                reels.forEach((reel, index) => {
                    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
                    reel.textContent = symbol;
                    results.push(symbol);
                });
                
                this.checkSlotWin(results, betAmount);
            }, 2000);
        }
    }

    checkSlotWin(results, betAmount) {
        let win = false;
        let multiplier = 0;
        
        if (results[0] === results[1] && results[1] === results[2]) {
            win = true;
            multiplier = 10;
        } else if (results[0] === results[1] || results[1] === results[2]) {
            win = true;
            multiplier = 2;
        }
        
        const payout = betAmount * multiplier;
        
        if (win) {
            document.getElementById('slotResult').innerHTML = `
                <div class="alert alert-success animate-fade-in-up">
                    🎉 Félicitations! Vous gagnez ${payout} Ar!
                </div>
            `;
        } else {
            document.getElementById('slotResult').innerHTML = `
                <div class="alert alert-warning">
                    Pas de chance! Réessayez!
                </div>
            `;
        }
    }

    renderRoulette(game) {
        return `
            <div class="roulette-game text-center">
                <h3>${game.name}</h3>
                <div class="roulette-wheel" id="rouletteWheel">
                    <div class="roulette-pointer"></div>
                </div>
                <div class="mt-4">
                    <label class="form-label">Choisissez un numéro (0-36)</label>
                    <input type="number" class="form-control form-input d-inline-block w-auto" 
                           id="rouletteNumber" min="0" max="36">
                </div>
                <div class="mt-2">
                    <label class="form-label">Mise en Ariary</label>
                    <input type="number" class="form-control form-input d-inline-block w-auto" 
                           id="rouletteBet" min="${game.minBet}" max="${game.maxBet}" value="${game.minBet}">
                </div>
                <button class="btn btn-casino mt-3" onclick="casinoApp.gamesManager.spinRoulette()">
                    🎡 LANCER LA BOULE
                </button>
                <div id="rouletteResult" class="mt-3"></div>
            </div>
        `;
    }

    async spinRoulette() {
        const chosenNumber = parseInt(document.getElementById('rouletteNumber').value);
        const betAmount = parseInt(document.getElementById('rouletteBet').value);
        
        const result = await this.app.placeBet(this.currentGame.id, betAmount);
        
        if (result) {
            const wheel = document.getElementById('rouletteWheel');
            const winningNumber = Math.floor(Math.random() * 37);
            const rotation = 360 * 5 + (winningNumber * (360 / 37));
            
            wheel.style.transform = `rotate(${rotation}deg)`;
            
            setTimeout(() => {
                if (chosenNumber === winningNumber) {
                    document.getElementById('rouletteResult').innerHTML = `
                        <div class="alert alert-success animate-fade-in-up">
                            🎉 Numéro ${winningNumber}! Vous gagnez ${betAmount * 35} Ar!
                        </div>
                    `;
                } else {
                    document.getElementById('rouletteResult').innerHTML = `
                        <div class="alert alert-info">
                            Numéro ${winningNumber}. Pas de chance!
                        </div>
                    `;
                }
            }, 5000);
        }
    }

    renderCardGame(game) {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        return `
            <div class="card-game">
                <h3 class="text-center mb-4">${game.name}</h3>
                <div class="blackjack-table text-center">
                    <h5>Main du Croupier</h5>
                    <div id="dealer-hand" class="mb-4"></div>
                    <div class="my-4"></div>
                    <h5>Votre Main</h5>
                    <div id="player-hand" class="mb-4"></div>
                </div>
                <div class="text-center mt-3">
                    <label class="form-label">Mise en Ariary</label>
                    <input type="number" class="form-control form-input d-inline-block w-auto" 
                           id="cardBet" min="${game.minBet}" max="${game.maxBet}" value="${game.minBet}">
                </div>
                <div class="text-center mt-3">
                    <button class="btn btn-casino mx-2" onclick="casinoApp.gamesManager.hitCard()">Carte</button>
                    <button class="btn btn-outline-warning mx-2" onclick="casinoApp.gamesManager.standCard()">Rester</button>
                </div>
                <div id="cardResult" class="text-center mt-3"></div>
            </div>
        `;
    }

    renderDiceGame(game) {
        return `
            <div class="dice-game text-center">
                <h3>${game.name}</h3>
                <div class="dice-container my-4">
                    <div class="dice" id="dice1">⚀</div>
                    <div class="dice" id="dice2">⚁</div>
                </div>
                <div>
                    <label class="form-label">Mise en Ariary</label>
                    <input type="number" class="form-control form-input d-inline-block w-auto" 
                           id="diceBet" min="${game.minBet}" max="${game.maxBet}" value="${game.minBet}">
                </div>
                <div class="mt-3">
                    <label class="form-label">Parier sur la somme (2-12)</label>
                    <input type="number" class="form-control form-input d-inline-block w-auto" 
                           id="diceGuess" min="2" max="12">
                </div>
                <button class="btn btn-casino mt-3" onclick="casinoApp.gamesManager.rollDice()">
                    🎲 LANCER LES DÉS
                </button>
                <div id="diceResult" class="mt-3"></div>
            </div>
        `;
    }

    renderGenericGame(game) {
        return `
            <div class="generic-game text-center p-5">
                <div class="game-icon" style="font-size: 5rem;">${game.icon}</div>
                <h3>${game.name}</h3>
                <p>Jeu en cours de développement</p>
                <label class="form-label">Mise en Ariary</label>
                <input type="number" class="form-control form-input d-inline-block w-auto" 
                       id="genericBet" min="${game.minBet}" max="${game.maxBet}" value="${game.minBet}">
                <button class="btn btn-casino mt-3" onclick="casinoApp.gamesManager.playGeneric()">
                    JOUER
                </button>
                <div id="genericResult" class="mt-3"></div>
            </div>
        `;
    }

    async playGame(gameId, amount) {
        // Logique de jeu générique
        const win = Math.random() < 0.45; // 45% de chance de gagner
        const multiplier = win ? (Math.random() * 2 + 1) : 0;
        
        return {
            gameId: gameId,
            gameName: this.games.find(g => g.id === gameId)?.name || 'Jeu inconnu',
            bet: amount,
            win: win,
            payout: win ? Math.floor(amount * multiplier) : 0,
            multiplier: multiplier,
            timestamp: new Date().toISOString()
        };
    }
}