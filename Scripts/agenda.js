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
    const contactModalAvatar = document.getElementById('contactModalAvatar');

    const todoModal = document.getElementById('toDoModal');
    const closeTodoModalBtn = document.getElementById('closeTodoModal');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoForm = document.getElementById('todoForm');
    const pendientesView = document.getElementById('pendientes-view');

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
    // ------------------------------------------------------------ Obtener y mostrar info de usuario ----------------------------------------------------
    function getUserInfo() {
        var initials = localStorage.getItem('userInitials') || 'US';
        var name = localStorage.getItem('userName') || 'Usuario';
        var email = localStorage.getItem('userEmail') || 'usuario@email.com';
        var shownEmail = email;

        if (userAvatar) userAvatar.textContent = initials;
        if (dropdownAvatar) dropdownAvatar.textContent = initials;
        if (dropdownName) dropdownName.textContent = name;
        if (dropdownEmail) dropdownEmail.textContent = email;
        if (userButton) userButton.textContent = initials;
        if (userName) userName.textContent = name;
        if (userEmail) userEmail.textContent = shownEmail;
    }

    getUserInfo();


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
            const initials = name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
            contactModalAvatar.textContent = initials;
        });
    });

    if (contactCloseBtn) {
        contactCloseBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
            contactModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        });
    }

    // --------------------------------------------------------- Modal ToDo List ----------------------------------------------------

    let tareas = [];
    let editandoId = null;


    addTodoBtn.addEventListener('click', () => {
        editandoId = null;
        document.getElementById('todoModalTitle').textContent = 'Agregar Tarea';
        todoForm.reset();
        todoModal.classList.add('active');
        todoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });

    closeTodoModalBtn.addEventListener('click', () => {
        todoModal.classList.remove('active');
        todoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        todoForm.reset();
        editandoId = null;
    });


    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titulo = document.getElementById('todoTitle').value;
        const fecha = document.getElementById('todoDatetime').value;
        const prioridad = document.getElementById('priorityInput').value;

        // If para ver si se esta editando o creando nueva tarea
        if (editandoId) {

            const tarea = tareas.find(t => t.id === editandoId);
            tarea.titulo = titulo;
            tarea.fecha = fecha;
            tarea.prioridad = prioridad;
        } else {

            tareas.push({
                id: Date.now(),
                titulo: titulo,
                fecha: fecha,
                prioridad: prioridad,
                completada: false
            });
        }
        // Guardar las tareas en el navegador
        localStorage.setItem('tareas', JSON.stringify(tareas));
        mostrarTareas();
        todoModal.classList.remove('active');
        todoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        todoForm.reset();
    });

    // Metodo para mostrar tareas
    function mostrarTareas() {
        let html = '<div class="space-y-3 mt-4">';

        if (tareas.length === 0) {
            html += '<p class="text-center text-gray-500 py-8">No hay tareas</p>';
        } else {
            tareas.forEach(tarea => {

                //Ordenar tareas por prioridad
                tareas.sort((a, b) => {
                    const prioridades = { baja: 1, media: 2, alta: 3 };
                    return prioridades[b.prioridad] - prioridades[a.prioridad];

                });

                //Colores dependiendo de la prioridad
                const colorPrioridad = {
                    baja: 'bg-green-100 border-green-400',
                    media: 'bg-yellow-100 border-yellow-400',
                    alta: 'bg-red-100 border-red-400'
                };

                // Se genera el html para cada tarea creada
                html += `
                <div class="bg-white rounded-lg p-4 shadow border-l-4 ${colorPrioridad[tarea.prioridad]}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3 flex-1">
                            <div>
                                <h4 class="font-semibold">${tarea.titulo}</h4>
                                <p class="text-sm text-gray-600">📅 ${tarea.fecha} - ${tarea.prioridad}</p>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="editar(${tarea.id})" 
                                    class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                <i class="ph ph-pencil text-1xl"></i>
                            </button>
                            <button onclick="eliminar(${tarea.id})" 
                                    class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                <i class="ph ph-trash text-1xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
                `;


            });
        }

        html += '</div>';

        // Mostrar las tareas en el contenedor
        const container = document.getElementById('tareas-container');
        if (container) {
            container.innerHTML = html;
        }
    }
    // Editar Tarea
    function editar(id) {
        const tarea = tareas.find(t => t.id === id);
        editandoId = id;

        document.getElementById('todoModalTitle').textContent = 'Editar Tarea';
        document.getElementById('todoTitle').value = tarea.titulo;
        document.getElementById('todoDatetime').value = tarea.fecha;
        document.getElementById('priorityInput').value = tarea.prioridad;

        todoModal.classList.add('active');
    }

    //Eliminar Tarea
    function eliminar(id) {
        if (confirm('¿Eliminar esta tarea?')) {
            tareas = tareas.filter(t => t.id !== id);
            localStorage.setItem('tareas', JSON.stringify(tareas));
            mostrarTareas();
        }
    }

    // Cargar tareas guardadas al iniciar
    window.addEventListener('DOMContentLoaded', () => {
        const guardadas = localStorage.getItem('tareas');
        if (guardadas) {
            tareas = JSON.parse(guardadas);
            mostrarTareas();
        }
    });

    
    // Funciones globales para poder editar y eliminar 
    window.editar = editar;
    window.eliminar = eliminar;
});

