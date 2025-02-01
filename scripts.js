document.addEventListener('DOMContentLoaded', function() {
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
    const db = firebase.firestore();

    // Manejo del menú
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

    // Manejo del formulario de comentarios
    document.getElementById('commentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        // Guarda el comentario en Firestore
        db.collection('comments').add({
            name: name,
            comment: comment,
            date: new Date()
        }).then(() => {
            console.log('Comentario enviado');
            document.getElementById('commentForm').reset();
            loadComments(); // Recarga los comentarios
        }).catch((error) => {
            console.error('Error al enviar el comentario: ', error);
        });
    });

    // Función para cargar y mostrar los comentarios
    function loadComments() {
        const commentsSection = document.getElementById('comments');
        commentsSection.innerHTML = ''; // Limpia los comentarios anteriores

        db.collection('comments').orderBy('date', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const comment = doc.data();
                commentsSection.innerHTML += `
                    <div class="comment">
                        <strong>${comment.name}</strong>
                        <p>${comment.comment}</p>
                        <small>${comment.date.toDate().toLocaleString()}</small>
                    </div>
                `;
            });
        }).catch((error) => {
            console.error('Error al cargar los comentarios: ', error);
        });
    }

    // Carga los comentarios al cargar la página
    loadComments();

    // Manejo del botón de "Me gusta"
    let likes = 0;

    // Carga el número de likes desde Firestore
    db.collection('likes').doc('totalLikes').get().then((doc) => {
        if (doc.exists) {
            likes = doc.data().count;
            document.getElementById('likeCount').textContent = likes;
        }
    }).catch((error) => {
        console.error('Error al cargar los likes: ', error);
    });

    // Maneja el clic en el botón de "Me gusta"
    document.getElementById('likeButton').addEventListener('click', function() {
        likes++;
        db.collection('likes').doc('totalLikes').set({ count: likes })
            .then(() => {
                document.getElementById('likeCount').textContent = likes;
            }).catch((error) => {
                console.error('Error al actualizar los likes: ', error);
            });
    document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos de Manhwas.json
    fetch('data/Manhwas.json') // Ruta al archivo JSON
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(manhwasData => {
            // Una vez cargados los datos, inicializa la funcionalidad
            initializeManhwaDetails(manhwasData);
        })
        .catch(error => console.error('Error al cargar los datos:', error));

    // Función para inicializar la funcionalidad de detalles del manhwa
    function initializeManhwaDetails(manhwasData) {
        const manhwaItems = document.querySelectorAll('.update-list li, .favoritos-list li, .estrenos-list li');
        const manhwaDetails = document.getElementById('manhwa-details');
        const closeDetailsBtn = document.getElementById('close-details-btn');

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
                    chaptersList.innerHTML = ''; // Limpiar lista de capítulos
                    manhwaData.chapters.forEach(chapter => {
                        const li = document.createElement('li');
                        li.textContent = chapter;
                        chaptersList.appendChild(li);
                    });

                    // Mostrar la sección de detalles
                    manhwaDetails.classList.add('visible');
                }
            });
        });

        // Ocultar detalles al hacer clic en el botón de cierre
        closeDetailsBtn.addEventListener('click', function () {
            manhwaDetails.classList.remove('visible');
        });
   
});