document.addEventListener('DOMContentLoaded', () => {
  const videos = [
    '../media/ANIMATION/ejercicio-final-emotional-acting.mov', '../media/ANIMATION/ejercicio-peso.mov', '../media/ANIMATION/tortuga-ciclo-caminar.mov', '../media/ANIMATION/tortuga-turnarround-clean.mov'
  ];

    let currentIndex = 0;
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('myModal');
    const modalVideo = document.getElementById('video01');
    const span = document.querySelector('.close');
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');

    // Función para mostrar videos en el modal
    function showVideo(index) {
      modalVideo.style.opacity = '0';
      setTimeout(() => {
        modalVideo.src = videos[index];
        currentIndex = index;
        modalVideo.style.opacity = '1';
      }, 500);
    }

    // Funciones para cambiar los videos en el modal
    function prevVideo() {
      currentIndex = (currentIndex - 1 + videos.length) % videos.length;
      showVideo(currentIndex);
    }

    function nextVideo() {
      currentIndex = (currentIndex + 1) % videos.length;
      showVideo(currentIndex);
    }

    // Evento para botones de navegación
    prevButton.addEventListener('click', prevVideo);
    nextButton.addEventListener('click', nextVideo);

    // Función para el teclado
    document.addEventListener('keydown', (event) => {
      if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
          prevVideo();
        } else if (event.key === 'ArrowRight') {
          nextVideo();
        }
      }
    });

    // Función para animar el video
    function animateVideo(video, delay) {
      setTimeout(() => {
        video.style.opacity = '1';
        video.style.transform = 'translateY(0)';
      }, delay);
    }

    // Función para manejar el hover en JavaScript
    function handleHover(video) {
      video.addEventListener('mouseenter', () => {
        video.play();  // Reproduce el video cuando se pasa el ratón por encima
        video.style.transform = 'scale(1.05)';
        video.style.opacity = '0.8';
      });

      video.addEventListener('mouseleave', () => {
        video.pause();  // Pausa el video cuando se retira el ratón
        video.currentTime = 0; // Reinicia el video
        video.style.transform = 'scale(1)';
        video.style.opacity = '1';
      });
    }

    // Crear la galería dinámicamente
    videos.forEach((src, index) => {
      const video = document.createElement('video');
      video.src = src;
      video.classList.add('gallery-video');
      video.muted = true; // Muestra los videos silenciados en la galería
      video.loop = true; // El video se reiniciará si termina
      
      // Aplicar estilo inicial de opacidad y transform
      video.style.opacity = '0';
      video.style.transform = 'translateY(20px)';
      video.style.transition = 'opacity 1s ease, transform 1s ease';

      // Añadir el video a la galería
      gallery.appendChild(video);

      // Cuando el video haya cargado, ejecutamos la animación con un retraso
      video.onloadeddata = () => {
        const delay = index * 200;
        animateVideo(video, delay);
      };

      // Añadir el evento hover
      handleHover(video);

      // Añadir evento de clic para abrir el video en el modal
      video.addEventListener('click', () => {
        showVideo(index);
        modal.style.display = "block";
      });
    });

    // Cerrar modal
    span.addEventListener('click', () => {
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.currentTime = 0;
    });

    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    });

    //prevenimos el comportamiento por defecto que abre "ventana emergente"
    modalVideo.addEventListener('click', (event) => {
      event.preventDefault();  // Evita el comportamiento predeterminado
    });
  });


  