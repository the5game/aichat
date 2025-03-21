// script.js - Modified to use local QA pairs instead of external AI
// Function to get a cookie by name
function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to load chat history
function loadChatHistory() {
    const chatBox = document.getElementById('chat-box');
    const chatHistory = getCookie('chatHistory');
    if (chatHistory) {
        chatBox.innerHTML = chatHistory;
    }
}

// Function to save chat history
function saveChatHistory() {
    const chatBox = document.getElementById('chat-box');
    setCookie('chatHistory', chatBox.innerHTML, 7); // Save for 7 days
}

// Load QA pairs data
let qaPairsData = [];
// This will be populated when qa_pairs.js is loaded

// Function to get AI response from local data
function getAIResponse(userInput) {
    // Convert input to lowercase for better matching
    const userQuestion = userInput.toLowerCase().trim();
    
    // Try to find an exact match in our QA pairs
    for (const pair of qaPairsData) {
        if (pair.question.toLowerCase().trim() === userQuestion) {
            return pair.answer;
        }
    }
    
    // If no exact match, look for keywords
    for (const pair of qaPairsData) {
        const keywords = pair.question.toLowerCase().split(' ');
        // Count how many keywords match
        const matchCount = keywords.filter(word => userQuestion.includes(word)).length;
        // If more than 50% of keywords match, return this answer
        if (matchCount >= keywords.length * 0.5) {
            return pair.answer;
        }
    }
    
    // Default response if no match found
    return "Désolé, je ne comprends pas votre question. Pouvez-vous reformuler?";
}

// Event for the send button
document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if (userInput.trim() !== "") {
        const userMessage = document.createElement('div');
        userMessage.textContent = "Vous: " + userInput;
        userMessage.classList.add('message', 'user-message');
        chatBox.appendChild(userMessage);

        // Get AI response (synchronous now since we're using local data)
        const aiResponse = getAIResponse(userInput);
        const aiMessage = document.createElement('div');
        aiMessage.textContent = "AI: " + aiResponse;
        aiMessage.classList.add('message', 'ai-message');
        chatBox.appendChild(aiMessage);

        document.getElementById('user-input').value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        // Save chat history
        saveChatHistory();
    }
});

// Handle the Enter key press in the input field
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});

// Initialize when the page loads
window.onload = function() {
    // First, load chat history
    loadChatHistory();
    
    // Then, load QA pairs 
    // This assumes the QA pairs have been loaded via qa_pairs.js
    // And made available as a global variable
    if (typeof window.qaPairsData !== 'undefined') {
        qaPairsData = window.qaPairsData;
        console.log('QA pairs loaded successfully:', qaPairsData.length, 'pairs');
    } else {
        console.error('QA pairs not found! Make sure qa_pairs.js is loaded before script.js');
    }
};
