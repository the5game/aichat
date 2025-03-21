// script.js - Modified to include typing animation, new chat functionality, and user display
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

// Function to clear chat history
function clearChatHistory() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    setCookie('chatHistory', '', -1); // Remove the cookie
    
    // Check if user is logged in for personalized greeting
    const username = getCookie('activeUser');
    const isLoggedIn = getCookie('loggedIn') === 'true';
    
    // Add a welcome message to the new chat
    const welcomeMessage = document.createElement('div');
    if (isLoggedIn && username) {
        welcomeMessage.textContent = `AI: Bonjour ${username} ! Comment puis-je vous aider aujourd'hui ?`;
    } else {
        welcomeMessage.textContent = "AI: Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    }
    welcomeMessage.classList.add('message', 'ai-message');
    chatBox.appendChild(welcomeMessage);
    
    // Save this initial state
    saveChatHistory();
}

// Function to check login status and update UI
function checkLoginStatus() {
    const isLoggedIn = getCookie('loggedIn') === 'true';
    const username = getCookie('activeUser');
    
    const usernameDisplay = document.getElementById('username-display');
    const usernameValue = document.getElementById('username-value');
    const authButtons = document.getElementById('auth-buttons');
    const logoutButton = document.getElementById('logout-button');
    
    if (isLoggedIn && username) {
        // Update the username display
        usernameDisplay.style.display = 'inline-block';
        usernameValue.textContent = username;
        
        // Show logout button and hide auth buttons
        authButtons.style.display = 'none';
        logoutButton.style.display = 'flex';
    } else {
        // Hide username display and logout, show auth buttons
        usernameDisplay.style.display = 'none';
        authButtons.style.display = 'flex';
        logoutButton.style.display = 'none';
    }
}

// Function to handle logout
function logout() {
    // Clear login cookies
    setCookie('loggedIn', '', -1);
    setCookie('activeUser', '', -1);
    
    // Refresh the page
    window.location.reload();
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
    const username = getCookie('activeUser');
    const isLoggedIn = getCookie('loggedIn') === 'true';
    
    if (isLoggedIn && username) {
        return `Désolé ${username}, je ne comprends pas votre question. Pouvez-vous reformuler?`;
    } else {
        return "Désolé, je ne comprends pas votre question. Pouvez-vous reformuler?";
    }
}

// Function to simulate typing effect
function typeWriter(element, text, speed) {
    let i = 0;
    element.textContent = "AI: "; // Start with just the prefix
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Animation complete, save chat history
            saveChatHistory();
        }
    }
    
    type(); // Start the typing animation
}

// Add a loading indicator
function addLoadingIndicator(chatBox) {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'ai-message', 'loading-message');
    loadingDiv.textContent = "AI: ";
    
    const loadingDots = document.createElement('span');
    loadingDots.classList.add('loading-dots');
    loadingDots.textContent = "...";
    loadingDiv.appendChild(loadingDots);
    
    chatBox.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    return loadingDiv;
}

// Event for the send button
document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');
    
    // Get username if logged in
    const username = getCookie('activeUser');
    const isLoggedIn = getCookie('loggedIn') === 'true';

    if (userInput.trim() !== "") {
        // Display user message with username if logged in
        const userMessage = document.createElement('div');
        if (isLoggedIn && username) {
            userMessage.textContent = `${username}: ${userInput}`;
        } else {
            userMessage.textContent = "Vous: " + userInput;
        }
        userMessage.classList.add('message', 'user-message');
        chatBox.appendChild(userMessage);
        
        // Clear input field
        document.getElementById('user-input').value = "";
        
        // Show loading indicator
        const loadingIndicator = addLoadingIndicator(chatBox);
        
        // Get AI response
        const aiResponse = getAIResponse(userInput);
        
        // Simulate response delay (between 500ms and 1500ms)
        const delay = 500 + Math.random() * 1000;
        
        setTimeout(() => {
            // Remove the loading indicator
            chatBox.removeChild(loadingIndicator);
            
            // Create AI message element
            const aiMessage = document.createElement('div');
            aiMessage.classList.add('message', 'ai-message');
            chatBox.appendChild(aiMessage);
            
            // Begin typing effect
            typeWriter(aiMessage, aiResponse, 30); // 30ms per character
            
            chatBox.scrollTop = chatBox.scrollHeight;
        }, delay);
    }
});

// Handle the Enter key press in the input field
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});

// Event for the new chat button
document.getElementById('new-chat-button').addEventListener('click', function() {
    // Ask for confirmation before clearing chat history
    if (confirm("Voulez-vous vraiment commencer un nouveau chat ? Toute la conversation actuelle sera effacée.")) {
        clearChatHistory();
    }
});

// Event for the logout button
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('logout')) {
        document.getElementById('logout').addEventListener('click', function() {
            logout();
        });
    }
});

// Initialize when the page loads
window.onload = function() {
    // First, check login status and update UI
    checkLoginStatus();
    
    // Then, load chat history
    loadChatHistory();
    
    // If no chat history exists, show a welcome message
    if (document.getElementById('chat-box').innerHTML.trim() === '') {
        const welcomeMessage = document.createElement('div');
        
        // Personalize welcome message if logged in
        const username = getCookie('activeUser');
        const isLoggedIn = getCookie('loggedIn') === 'true';
        
        if (isLoggedIn && username) {
            welcomeMessage.textContent = `AI: Bonjour ${username} ! Comment puis-je vous aider aujourd'hui ?`;
        } else {
            welcomeMessage.textContent = "AI: Bonjour ! Comment puis-je vous aider aujourd'hui ?";
        }
        
        welcomeMessage.classList.add('message', 'ai-message');
        document.getElementById('chat-box').appendChild(welcomeMessage);
        saveChatHistory();
    }
    
    // Set up logout button event
    if (document.getElementById('logout')) {
        document.getElementById('logout').addEventListener('click', logout);
    }
    
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
