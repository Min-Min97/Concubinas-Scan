document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');

    // Abrir/cerrar el menú al hacer clic en el botón de menú
    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en el botón de cierre
    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
});