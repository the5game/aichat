document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérifier les informations de connexion avec les cookies
    const storedUsername = getCookie('username');
    const storedPassword = getCookie('password');

    if (username === storedUsername && password === storedPassword) {
        // Stocker le status de connexion et le nom d'utilisateur actif
        setCookie('loggedIn', 'true', 7); // Stocker pour 7 jours
        setCookie('activeUser', username, 7); // Stocker le nom d'utilisateur actif
        
        alert("Connexion réussie!");
        // Rediriger vers la page principale
        window.location.href = "index.html";
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
});

function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
