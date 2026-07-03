export class Chatbot {
    constructor() {
        this.messages = [];
        this.responses = this.initializeResponses();
        this.isOpen = false;
    }

    initializeResponses() {
        return {
            'bonjour': 'Manao ahoana! Bienvenue au Casino Malagasy! Comment puis-je vous aider?',
            'salut': 'Salama! Que puis-je faire pour vous aujourd\'hui?',
            'comment jouer': 'Pour jouer, créez un compte, déposez des Ariary et choisissez parmi nos 30 jeux!',
            'règles': 'Chaque jeu a ses propres règles. Cliquez sur un jeu pour voir les règles détaillées.',
            'dépôt': 'Vous pouvez obtenir des Ariary virtuels en créant un compte (bonus de 10,000 Ar offert)!',
            'retrait': 'Il s\'agit d\'une simulation. Les gains sont conservés dans votre compte.',
            'sécurité': 'Vos données sont protégées par un cryptage AES-256. Jouez en toute sécurité!',
            'problème': 'Je suis désolé pour ce problème. Veuillez contacter notre support: support@casino-malagasy.mg',
            'merci': 'Misaotra! Merci de jouer au Casino Malagasy!',
            'au revoir': 'Veloma! À bientôt pour de nouvelles parties!',
            'bonus': 'Nous offrons un bonus de bienvenue de 10,000 Ar et des promotions régulières!',
            'jeux disponibles': 'Nous avons plus de 30 jeux: Blackjack, Roulette, Machines à sous, Poker, et des jeux traditionnels malagasy!',
            'culture malagasy': 'Découvrez notre page Culture pour en savoir plus sur Madagascar et ses traditions!',
            'ariary': 'L\'Ariary (Ar) est la monnaie officielle de Madagascar. 1 € ≈ 4,800 Ar.',
        };
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const container = document.getElementById('chatbot-container');
        container.innerHTML = `
            <div class="chatbot-toggle" id="chatbotToggle">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chatbot-container" id="chatbotWindow">
                <div class="chatbot-header">
                    <h5><i class="fas fa-robot"></i> Assistant Casino</h5>
                    <button class="btn-close btn-close-white" id="chatbotClose"></button>
                </div>
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="message bot">
                        👋 Manao ahoana! Je suis votre assistant. Comment puis-je vous aider?
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chatbotInput" placeholder="Écrivez votre message...">
                    <button id="chatbotSend">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        document.getElementById('chatbotToggle').addEventListener('click', () => this.toggle());
        document.getElementById('chatbotClose').addEventListener('click', () => this.close());
        document.getElementById('chatbotSend').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatbotInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggle() {
        const window = document.getElementById('chatbotWindow');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.add('active');
        } else {
            window.classList.remove('active');
        }
    }

    close() {
        this.isOpen = false;
        document.getElementById('chatbotWindow').classList.remove('active');
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => {
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [keyword, response] of Object.entries(this.responses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }
        
        // Réponses contextuelles supplémentaires
        if (lowerMessage.includes('gagner')) {
            return 'Pour maximiser vos gains, diversifiez vos jeux et gérez votre bankroll. La chance sourit aux audacieux!';
        }
        
        if (lowerMessage.includes('perdu')) {
            return 'Ne vous découragez pas! Chaque perte est une leçon. Fixez-vous des limites et jouez de façon responsable.';
        }
        
        // Réponse par défaut
        const defaultResponses = [
            'Je ne suis pas sûr de comprendre. Pouvez-vous reformuler?',
            'Intéressant! Pouvez-vous préciser votre question?',
            'Je suis là pour vous aider avec le casino. Quelle est votre question?',
            'Essayez de demander: "comment jouer", "règles", "bonus", ou "jeux disponibles"'
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}