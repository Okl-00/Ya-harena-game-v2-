export class StorageManager {
    constructor() {
        this.prefix = 'casino_malagasy_';
    }

    // Stockage sécurisé
    setSecureItem(key, value) {
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(value),
            'casino-secret-key-2024'
        ).toString();
        localStorage.setItem(this.prefix + key, encrypted);
    }

    getSecureItem(key) {
        const encrypted = localStorage.getItem(this.prefix + key);
        if (!encrypted) return null;
        
        try {
            const decrypted = CryptoJS.AES.decrypt(
                encrypted,
                'casino-secret-key-2024'
            ).toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted);
        } catch (error) {
            return null;
        }
    }

    removeSecureItem(key) {
        localStorage.removeItem(this.prefix + key);
    }

    // Gestion des utilisateurs
    getUsers() {
        return JSON.parse(localStorage.getItem(this.prefix + 'users') || '[]');
    }

    saveUsers(users) {
        localStorage.setItem(this.prefix + 'users', JSON.stringify(users));
    }

    // Gestion du solde
    async getBalance(userId) {
        const key = `balance_${userId}`;
        const balance = localStorage.getItem(this.prefix + key);
        return balance ? parseInt(balance) : 10000;
    }

    async updateBalance(userId, balance) {
        const key = `balance_${userId}`;
        localStorage.setItem(this.prefix + key, balance.toString());
    }

    // Historique des jeux
    getGameHistory(userId) {
        const key = `history_${userId}`;
        return JSON.parse(localStorage.getItem(this.prefix + key) || '[]');
    }

    async saveGameHistory(userId, gameResult) {
        const key = `history_${userId}`;
        const history = this.getGameHistory(userId);
        history.unshift(gameResult);
        
        // Garder seulement les 100 derniers jeux
        if (history.length > 100) {
            history.pop();
        }
        
        localStorage.setItem(this.prefix + key, JSON.stringify(history));
        
        // Mettre à jour les statistiques
        this.updateStats(userId, gameResult);
    }

    // Statistiques
    updateStats(userId, gameResult) {
        const key = `stats_${userId}`;
        const stats = JSON.parse(localStorage.getItem(this.prefix + key) || '{}');
        
        stats.totalGames = (stats.totalGames || 0) + 1;
        stats.totalBets = (stats.totalBets || 0) + gameResult.bet;
        
        if (gameResult.win) {
            stats.totalWins = (stats.totalWins || 0) + 1;
            stats.totalWinnings = (stats.totalWinnings || 0) + gameResult.payout;
        } else {
            stats.totalLosses = (stats.totalLosses || 0) + 1;
            stats.totalLossesAmount = (stats.totalLossesAmount || 0) + gameResult.bet;
        }
        
        localStorage.setItem(this.prefix + key, JSON.stringify(stats));
    }

    getStats(userId) {
        const key = `stats_${userId}`;
        return JSON.parse(localStorage.getItem(this.prefix + key) || '{}');
    }

    // Promotions
    getPromotions() {
        return JSON.parse(localStorage.getItem(this.prefix + 'promotions') || '[]');
    }

    savePromotion(promotion) {
        const promotions = this.getPromotions();
        promotions.push(promotion);
        localStorage.setItem(this.prefix + 'promotions', JSON.stringify(promotions));
    }
}