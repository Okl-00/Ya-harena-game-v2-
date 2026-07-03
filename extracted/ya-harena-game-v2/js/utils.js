export class UIManager {
    constructor() {
        this.toastContainer = null;
        this.createToastContainer();
    }

    createToastContainer() {
        this.toastContainer = document.createElement('div');
        this.toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(this.toastContainer);
    }

    showToast(message, type = 'info') {
        const id = 'toast_' + Date.now();
        const bgColor = {
            'success': 'bg-success',
            'error': 'bg-danger',
            'warning': 'bg-warning',
            'info': 'bg-info'
        }[type] || 'bg-info';

        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white ${bgColor} border-0`;
        toast.id = id;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        this.toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    updateBalance(balance) {
        const balanceElements = document.querySelectorAll('.user-balance');
        balanceElements.forEach(el => {
            el.textContent = `${balance.toLocaleString()} Ar`;
        });
    }

    showUserMenu(user) {
        const menuContainer = document.querySelector('.user-menu-container');
        if (menuContainer) {
            menuContainer.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-warning dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user"></i> ${user.name}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" data-page="profile">Profil</a></li>
                        <li><a class="dropdown-item" href="#" data-page="history">Historique</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="casinoApp.authManager.logout()">Déconnexion</a></li>
                    </ul>
                </div>
            `;
        }
    }

    renderHistory(history) {
        const container = document.getElementById('history-container');
        if (!container) return;

        if (history.length === 0) {
            container.innerHTML = '<p class="text-center">Aucun historique de jeu</p>';
            return;
        }

        let html = `
            <div class="table-responsive">
                <table class="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Jeu</th>
                            <th>Mise</th>
                            <th>Résultat</th>
                            <th>Gain</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        history.forEach(game => {
            const date = new Date(game.timestamp).toLocaleString('fr-FR');
            html += `
                <tr>
                    <td>${date}</td>
                    <td>${game.gameName}</td>
                    <td>${game.bet.toLocaleString()} Ar</td>
                    <td class="${game.win ? 'text-success' : 'text-danger'}">
                        ${game.win ? '✅ Gagné' : '❌ Perdu'}
                    </td>
                    <td class="${game.win ? 'text-success' : ''}">
                        ${game.win ? '+' + game.payout.toLocaleString() : '-' + game.bet.toLocaleString()} Ar
                    </td>
                </tr>
            `;
        });

        html += '</tbody></table></div>';
        container.innerHTML = html;
    }

    renderProfile(user) {
        const container = document.getElementById('profile-container');
        if (!container) return;

        const stats = new StorageManager().getStats(user.id);

        container.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <div class="card bg-dark text-white mb-4">
                        <div class="card-body text-center">
                            <i class="fas fa-user-circle fa-4x mb-3"></i>
                            <h5>${user.name}</h5>
                            <p>${user.email}</p>
                            <p class="text-warning">
                                Membre depuis: ${new Date(user.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card bg-dark text-white mb-4">
                        <div class="card-header">
                            <h5>Statistiques de Jeu</h5>
                        </div>
                        <div class="card-body">
                            <div class="row text-center">
                                <div class="col-4">
                                    <h3 class="text-info">${stats.totalGames || 0}</h3>
                                    <p>Parties jouées</p>
                                </div>
                                <div class="col-4">
                                    <h3 class="text-success">${stats.totalWins || 0}</h3>
                                    <p>Victoires</p>
                                </div>
                                <div class="col-4">
                                    <h3 class="text-warning">${stats.totalWinnings?.toLocaleString() || 0} Ar</h3>
                                    <p>Gains totaux</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}