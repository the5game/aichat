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

// pour sauvegarder l'historique des conversations
function saveChatHistory() {
    const chatBox = document.getElementById('chat-box');
    setCookie('chatHistory', chatBox.innerHTML, 7); // Sauvegarde pour 7 jours
}

// Importer la clé API
import { API_KEY } from './config.js';

async function getAIResponse(userInput) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

document.getElementById('send-button').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if (userInput.trim() !== "") {
        const userMessage = document.createElement('div');
        userMessage.textContent = "Vous: " + userInput;
        userMessage.classList.add('message', 'user-message');
        chatBox.appendChild(userMessage);

        // Obtenir la réponse de l'AI
        const aiResponse = await getAIResponse(userInput);
        const aiMessage = document.createElement('div');
        aiMessage.textContent = "AI: " + aiResponse;
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
