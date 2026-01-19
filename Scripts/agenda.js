document.addEventListener('DOMContentLoaded', function () {
    var userButton = document.getElementById('userButton');
    var userDropdown = document.getElementById('userDropdown');
    var userAvatar = document.getElementById('userAvatar');
    var dropdownAvatar = document.getElementById('dropdownAvatar');
    var dropdownName = document.getElementById('dropdownName');
    var dropdownEmail = document.getElementById('dropdownEmail');

    function populateUserInfo() {
        var initials = localStorage.getItem('userInitials') || 'US';
        var name = localStorage.getItem('userName') || 'Usuario';
        var email = localStorage.getItem('userEmail') || 'usuario@email.com';

        if (userAvatar) userAvatar.textContent = initials;
        if (dropdownAvatar) dropdownAvatar.textContent = initials;
        if (dropdownName) dropdownName.textContent = name;
        if (dropdownEmail) dropdownEmail.textContent = email;
    }

    populateUserInfo();

    if (userButton && userDropdown) {
        userButton.addEventListener('click', function (e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            var isClickInside = userDropdown.contains(e.target) || userButton.contains(e.target);
            if (!isClickInside) {
                userDropdown.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                userDropdown.classList.remove('active');
            }
        });
    }

    var logoutBtn = document.getElementById('logoutBtn');


    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('userInitials');
            window.location.href = '../index.html';
        });
    }
});
