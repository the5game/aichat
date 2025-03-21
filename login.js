document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simuler une vérification de connexion
    if (username === "admin" && password === "password") {
        alert("Connexion réussie!");
        // Rediriger vers la page principale
        window.location.href = "index.html";
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
});
