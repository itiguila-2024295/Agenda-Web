document.addEventListener('DOMContentLoaded', function () {
    var userButton = document.getElementById('userButton');
    var userDropdown = document.getElementById('userDropdown');
    var userAvatar = document.getElementById('userAvatar');
    var dropdownAvatar = document.getElementById('dropdownAvatar');
    var dropdownName = document.getElementById('dropdownName');
    var dropdownEmail = document.getElementById('dropdownEmail');
    var userName = document.getElementById('userName');
    var userEmail = document.getElementById('userEmail');

    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('modalExito');
    const successOkBtn = document.getElementById('botonModal');

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

    // Camabio de vistas

    function changeView(viewName) {
        
        views.forEach(view => view.classList.remove('active'));
        document.getElementById(`${viewName}-view`)?.classList.add('active');

        
        navItems.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-view="${viewName}"]`)?.classList.add('active');
    }

    
    navItems.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            changeView(view);
        });
    });


    // Abrir y cerrar el Modal de éxito

    function openSuccessModal() {
        if (successModal) {
            successModal.classList.add('active');
            successModal.setAttribute('aria-hidden', 'false');
        }
    }

    function closeSuccessModal() {
        if (successModal) {
            successModal.classList.remove('active');
            successModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            openSuccessModal();
            contactForm.reset();
        });
    }

    if (successOkBtn) {
        successOkBtn.addEventListener('click', function () {
            closeSuccessModal();
        });
    }
});

