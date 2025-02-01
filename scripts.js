document.addEventListener('DOMContentLoaded', function () {
    // Configuración de Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDJ9e9LtyKVbwZlfFYN9FvpOCeobWin6wo",
        authDomain: "concubinas-scan-c3fe7.firebaseapp.com",
        projectId: "concubinas-scan-c3fe7",
        storageBucket: "concubinas-scan-c3fe7.appspot.com",
        messagingSenderId: "746832829709",
        appId: "1:746832829709:web:7e93abb53b813b5b4f6444",
        measurementId: "G-SJH9JE8TRR"
    };

    // Inicializa Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore(); // Asegúrate de importar Firestore

    // Elementos del DOM
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');

    // Abrir/cerrar el menú al hacer clic en el botón de menú
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
    }

    // Cerrar el menú al hacer clic en el botón de cierre
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', function () {
            sidebar.classList.remove('active');
        });
    }

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function (event) {
        if (sidebar && !sidebar.contains(event.target) && menuBtn && !menuBtn.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Cargar los datos de Manhwas.json
    fetch('data/Manhwas.json') // Asegúrate de que la ruta sea correcta
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            return response.json();
        })
        .then(manhwasData => {
            initializeManhwaDetails(manhwasData); // Inicializa la funcionalidad con los datos cargados
        })
        .catch(error => console.error('Error al cargar los datos:', error));

    // Función para inicializar la funcionalidad de detalles del manhwa
    function initializeManhwaDetails(manhwasData) {
        const manhwaItems = document.querySelectorAll('.update-list li, .favoritos-list li, .estrenos-list li');
        const manhwaDetails = document.getElementById('manhwa-details');
        const closeDetailsBtn = document.getElementById('close-details-btn');

        if (manhwaItems.length > 0 && manhwaDetails && closeDetailsBtn) {
            manhwaItems.forEach(item => {
                item.addEventListener('click', function () {
                    const manhwaTitle = item.querySelector('h3').textContent;
                    const manhwaData = manhwasData[manhwaTitle];

                    if (manhwaData) {
                        // Cargar los datos del manhwa en la sección de detalles
                        document.getElementById('manhwa-cover').src = manhwaData.cover;
                        document.getElementById('manhwa-title').textContent = manhwaData.title;
                        document.getElementById('manhwa-synopsis').textContent = manhwaData.synopsis;

                        // Cargar la lista de capítulos
                        const chaptersList = document.getElementById('chapters');
                        if (chaptersList) {
                            chaptersList.innerHTML = ''; // Limpiar lista de capítulos
                            manhwaData.chapters.forEach(chapter => {
                                const li = document.createElement('li');
                                li.textContent = chapter;
                                chaptersList.appendChild(li);
                            });
                        }

                        // Mostrar la sección de detalles
                        manhwaDetails.classList.add('visible');
                    }
                });
            });

            // Ocultar detalles al hacer clic en el botón de cierre
            closeDetailsBtn.addEventListener('click', function () {
                manhwaDetails.classList.remove('visible');
            });
        }
    }
});