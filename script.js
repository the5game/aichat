// Fonction pour obtenir un cookie par nom
function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Fonction pour définir un cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Fonction pour charger l'historique des conversations
function loadChatHistory() {
    const chatBox = document.getElementById('chat-box');
    const chatHistory = getCookie('chatHistory');
    if (chatHistory) {
        chatBox.innerHTML = chatHistory;
    }
}

// Fonction pour sauvegarder l'historique des conversations
function saveChatHistory() {
    const chatBox = document.getElementById('chat-box');
    setCookie('chatHistory', chatBox.innerHTML, 7); // Sauvegarde pour 7 jours
}

document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if (userInput.trim() !== "") {
        const userMessage = document.createElement('div');
        userMessage.textContent = "Vous: " + userInput;
        userMessage.classList.add('message', 'user-message');
        chatBox.appendChild(userMessage);

        // Simuler une réponse AI
        const aiMessage = document.createElement('div');
        aiMessage.textContent = "AI: " + "Je suis une réponse automatique.";
        aiMessage.classList.add('message', 'ai-message');
        chatBox.appendChild(aiMessage);

        document.getElementById('user-input').value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        // Sauvegarder l'historique des conversations
        saveChatHistory();
    }
});

// Charger l'historique des conversations au chargement de la page
window.onload = loadChatHistory;

#signup-container {
    width: 300px;
    background-color: #1e1e1e;
    border: 1px solid #333;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

#signup-form {
    display: flex;
    flex-direction: column;
}

#signup-form label {
    margin-bottom: 5px;
}

#signup-form input {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #333;
    color: white;
    border: 1px solid #333;
}

#signup-form button {
    padding: 10px;
    background-color: #0a74da;
    color: white;
    border: none;
    cursor: pointer;
}

#signup-form button:hover {
    background-color: #005bb5;
}
