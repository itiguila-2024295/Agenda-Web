document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorMessage = document.getElementById("errorMessage");
    const loginBox = document.getElementById("loginBox");

    // Validación simple
    if (email && password) {
        // Login exitoso
        errorMessage.classList.add("hidden");

        // Extraer información del usuario
        const userName = email.split("@")[0];
        const initials = userName.substring(0, 2).toUpperCase();

        // Guardar datos en localStorage para pasarlos a la otra página
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userInitials", initials);
        localStorage.setItem("isLoggedIn", "true");

        // Redirigir a la página principal
        window.location.href = "agenda.html";

    } else {
        // Login fallido
        errorMessage.classList.remove("hidden");
    }
});

function seePassword() {
    const passwordInput = document.getElementById("loginPassword");
    const toggleIcon = event.target;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = '👁️‍🗨️';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
        
        
    }
}


