document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const errorMessage = document.getElementById("errorMessage");
            

            if (email && password) {
                const userName = email.split("@")[0];
                const initials = userName.substring(0, 2).toUpperCase();

                localStorage.setItem("userEmail", email);
                localStorage.setItem("userName", userName);
                localStorage.setItem("userInitials", initials);
                localStorage.setItem("isLoggedIn", "true");

                window.location.href = "Pages/Agenda.html";
            } else {
                errorMessage.classList.remove("hidden");
                console.log("Email o contraseña incorrectos");
            }
        });
    }

    window.seePassword = function (event) {
        const passwordInput = document.getElementById("loginPassword");
        const toggleIcon = event && event.target ? event.target : null;

        if (!passwordInput) return;

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            if (toggleIcon) toggleIcon.textContent = '👁️‍🗨️';
        } else {
            passwordInput.type = 'password';
            if (toggleIcon) toggleIcon.textContent = '👁️';
        }
    };
});


