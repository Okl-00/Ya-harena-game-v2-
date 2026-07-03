export class PopupManager {
    constructor() {
        this.createModalContainer();
    }

    createModalContainer() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'gameModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">Jeu</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="gameModalContent">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    show(type, message) {
        switch(type) {
            case 'win':
                this.showWin(message);
                break;
            case 'loss':
                this.showLoss(message);
                break;
            case 'promotion':
                this.showPromotion(message);
                break;
            case 'error':
                this.showError(message);
                break;
            default:
                this.showGeneric(message);
        }
    }

    showWin(result) {
        const popup = document.createElement('div');
        popup.className = 'popup-overlay';
        popup.innerHTML = `
            <div class="popup-container win-popup animate__animated animate__bounceIn">
                <div class="popup-header">
                    <i class="fas fa-trophy fa-3x text-warning"></i>
                    <h2>Félicitations!</h2>
                </div>
                <div class="popup-body">
                    <p>Vous avez gagné!</p>
                    <h3 class="text-success">+${result.payout.toLocaleString()} Ar</h3>
                    <p>Multiplicateur: x${result.multiplier.toFixed(1)}</p>
                </div>
                <button class="btn btn-casino" onclick="this.parentElement.parentElement.remove()">
                    Continuer
                </button>
            </div>
        `;
        document.body.appendChild(popup);
    }

    showLoss(result) {
        const popup = document.createElement('div');
        popup.className = 'popup-overlay';
        popup.innerHTML = `
            <div class="popup-container loss-popup animate__animated animate__fadeInUp">
                <div class="popup-header">
                    <i class="fas fa-hand-holding-heart fa-3x text-info"></i>
                    <h2>Pas de chance!</h2>
                </div>
                <div class="popup-body">
                    <p>Ne vous découragez pas!</p>
                    <p class="text-muted">La prochaine fois sera la bonne!</p>
                    <p class="mt-3">💡 Conseil: Gérez votre bankroll et fixez-vous des limites</p>
                </div>
                <button class="btn btn-outline-warning" onclick="this.parentElement.parentElement.remove()">
                    Réessayer
                </button>
            </div>
        `;
        document.body.appendChild(popup);
    }

    showPromotion(promotion) {
        const popup = document.createElement('div');
        popup.className = 'popup-overlay';
        popup.innerHTML = `
            <div class="popup-container promo-popup animate__animated animate__zoomIn">
                <div class="popup-header bg-gradient">
                    <i class="fas fa-gift fa-3x text-danger"></i>
                    <h2>Promotion Spéciale!</h2>
                </div>
                <div class="popup-body">
                    <h4>${promotion.title}</h4>
                    <p>${promotion.description}</p>
                    ${promotion.bonus ? `<h3 class="text-success">+${promotion.bonus} Ar offerts!</h3>` : ''}
                </div>
                <button class="btn btn-casino" onclick="this.parentElement.parentElement.remove()">
                    Profiter de l'offre!
                </button>
            </div>
        `;
        document.body.appendChild(popup);
    }

    showError(message) {
        new UIManager().showToast(message, 'error');
    }
}