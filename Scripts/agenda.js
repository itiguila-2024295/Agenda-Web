document.addEventListener('DOMContentLoaded', function () {
    // ------------------------------------------------------------- Variables ----------------------------------------------------
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

    const contactItems = document.querySelectorAll('.contact-item');
    const contactModal = document.getElementById('contactModal');
    const contactName = document.getElementById('modalContactName');
    const contactPhone = document.getElementById('modalContactPhone');
    const contactEmail = document.getElementById('modalContactEmail');
    const contactNotes = document.getElementById('modalContactNotes');
    const contactCloseBtn = document.getElementById('closeContactModal');

//----------------------------------------------------------------- Dropdown de usuario ----------------------------------------------------

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

    // ------------------------------------------------------------ Cambio de vistas ----------------------------------------------------

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


    // ------------------------------------------------------------ Abrir y cerrar el Modal de éxito ----------------------------------------------------

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

    // --------------------------------------------------------- Modal Datos Contacto ----------------------------------------------------
    
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            document.body.style.overflow = 'hidden';
            const name = item.getAttribute('data-name');
            const phone = item.getAttribute('data-phone');
            const email = item.getAttribute('data-email');
            const notes = item.getAttribute('data-notes');
            contactName.textContent = name;
            contactPhone.textContent = phone;
            contactEmail.textContent = email;
            contactNotes.textContent = notes;
            contactModal.classList.add('active');
            contactModal.setAttribute('aria-hidden', 'false');
        });    
    });

    if (contactCloseBtn) {
        contactCloseBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
            contactModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        });
    }


});

