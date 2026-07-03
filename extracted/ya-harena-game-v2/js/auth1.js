export class AuthManager {
    constructor() {
        this.storageManager = new StorageManager();
        this.users = this.storageManager.getUsers() || [];
        this.currentUser = null;
    }

    renderLoginForm() {
        return `
            <div class="auth-container animate-fade-in-up">
                <div class="auth-card">
                    <div class="auth-header">
                        <i class="fas fa-casino fa-3x" style="color: var(--accent-color);"></i>
                        <h2>Connexion</h2>
                        <p>Bienvenue au Casino Malagasy</p>
                    </div>
                    <form id="loginForm" onsubmit="return false;">
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control form-input" id="loginEmail" required>
                        </div>
                        <div class="mb-4">
                            <label class="form-label">Mot de passe</label>
                            <input type="password" class="form-control form-input" id="loginPassword" required>
                        </div>
                        <button type="submit" class="btn btn-casino w-100 mb-3">
                            Se connecter
                        </button>
                        <div class="text-center">
                            <a href="#" data-page="register" class="auth-links">Créer un compte</a>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    renderRegisterForm() {
        return `
            <div class="auth-container animate-fade-in-up">
                <div class="auth-card">
                    <div class="auth-header">
                        <i class="fas fa-user-plus fa-3x" style="color: var(--accent-color);"></i>
                        <h2>Inscription</h2>
                        <p>Rejoignez la communauté</p>
                    </div>
                    <form id="registerForm" onsubmit="return false;">
                        <div class="mb-3">
                            <label class="form-label">Nom complet</label>
                            <input type="text" class="form-control form-input" id="regName" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control form-input" id="regEmail" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Mot de passe</label>
                            <input type="password" class="form-control form-input" id="regPassword" 
                                   oninput="AuthManager.checkPasswordStrength(this.value)" required>
                            <div class="password-strength" id="passwordStrength"></div>
                        </div>
                        <div class="mb-4">
                            <label class="form-label">Confirmer le mot de passe</label>
                            <input type="password" class="form-control form-input" id="regConfirmPassword" required>
                        </div>
                        <button type="submit" class="btn btn-casino w-100 mb-3">
                            S'inscrire
                        </button>
                        <div class="text-center">
                            <a href="#" data-page="login" class="auth-links">Déjà un compte ?</a>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    static checkPasswordStrength(password) {
        const strengthBar = document.getElementById('passwordStrength');
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        
        strengthBar.className = 'password-strength';
        switch(strength) {
            case 1: strengthBar.classList.add('strength-weak'); break;
            case 2: strengthBar.classList.add('strength-medium'); break;
            case 3: strengthBar.classList.add('strength-strong'); break;
            case 4: strengthBar.classList.add('strength-very-strong'); break;
        }
    }

    async register(userData) {
        // Validation
        if (!this.validateEmail(userData.email)) {
            throw new Error('Email invalide');
        }
        
        if (userData.password !== userData.confirmPassword) {
            throw new Error('Les mots de passe ne correspondent pas');
        }
        
        if (this.users.find(u => u.email === userData.email)) {
            throw new Error('Cet email est déjà utilisé');
        }

        // Hashage du mot de passe
        const hashedPassword = CryptoJS.SHA256(userData.password).toString();
        
        // Création du compte
        const newUser = {
            id: this.generateUserId(),
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            balance: 10000, // Bonus de bienvenue en Ariary
            createdAt: new Date().toISOString(),
            gamesPlayed: 0
        };

        this.users.push(newUser);
        this.storageManager.saveUsers(this.users);
        
        // Connexion automatique
        const token = this.generateToken(newUser);
        this.storageManager.setSecureItem('auth_token', token);
        
        return newUser;
    }

    async login(email, password) {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        const user = this.users.find(u => u.email === email && u.password === hashedPassword);
        
        if (!user) {
            throw new Error('Email ou mot de passe incorrect');
        }

        const token = this.generateToken(user);
        this.storageManager.setSecureItem('auth_token', token);
        
        return user;
    }

    verifyToken(token) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            if (decoded.exp < Date.now()) {
                throw new Error('Token expiré');
            }
            return this.users.find(u => u.id === decoded.userId);
        } catch (error) {
            return null;
        }
    }

    generateToken(user) {
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };
        
        const payload = {
            userId: user.id,
            email: user.email,
            iat: Date.now(),
            exp: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
        };
        
        const base64Header = btoa(JSON.stringify(header));
        const base64Payload = btoa(JSON.stringify(payload));
        const signature = CryptoJS.HmacSHA256(
            `${base64Header}.${base64Payload}`,
            'casino-malagasy-secret-key'
        ).toString();
        
        return `${base64Header}.${base64Payload}.${signature}`;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}