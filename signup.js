document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // Simuler la création de compte en stockant les informations dans les cookies
    document.cookie = `username=${newUsername}; path=/`;
    document.cookie = `password=${newPassword}; path=/`;

    alert("Inscription réussie! Vous pouvez maintenant vous connecter.");
    // Rediriger vers la page de connexion
    window.location.href = "login.html";
});
