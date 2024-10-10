document.addEventListener('DOMContentLoaded', (event) => {
    const images = [
      '../media/SKETCHBOOK/boceto01.JPG', '../media/SKETCHBOOK/boceto02.JPG', '../media/SKETCHBOOK/boceto03.JPG',
        '../media/SKETCHBOOK/boceto04.JPG', '../media/SKETCHBOOK/boceto05.jpg', '../media/SKETCHBOOK/boceto06.jpg',
        '../media/SKETCHBOOK/boceto07.jpg', '../media/SKETCHBOOK/boceto08.jpg', '../media/SKETCHBOOK/boceto09.jpg',
        '../media/SKETCHBOOK/boceto10.jpg', '../media/SKETCHBOOK/boceto11.jpg', '../media/SKETCHBOOK/boceto12.jpg',
        '../media/SKETCHBOOK/boceto13.jpg', '../media/SKETCHBOOK/boceto14.jpg', '../media/SKETCHBOOK/boceto15.jpg'
    ];
  
    let currentIndex = 0;
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    const span = document.querySelector('.close'); 
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');
  
    // Función para mostrar imágenes en el modal
    function showImage(index) {
      modalImg.style.opacity = '0';
      setTimeout(() => {
        modalImg.src = images[index];
        currentIndex = index;
        modalImg.style.opacity = '1';
      }, 500);
    }
  
    // Funciones para cambiar las imágenes en el modal
    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }
  
    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }
  
    // Evento para botones de navegación
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);
  
    // Función para el teclado
    document.addEventListener('keydown', (event) => {
      if (modal.style.display === 'block') { // Solo cambiar si el modal está abierto
        if (event.key === 'ArrowLeft') {
          prevImage();
        } else if (event.key === 'ArrowRight') {
          nextImage();
        }
      }
    });
  
    // Función para animar la imagen
    function animateImage(img, delay) {
      setTimeout(() => {
        img.style.opacity = '1';   // Cambia la opacidad para mostrar la imagen
        img.style.transform = 'translateY(0)';  // Devuelve la imagen a su posición normal
      }, delay);
    }
  
    // Función para manejar el hover en JavaScript
    function handleHover(img) {
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)'; // Escalar ligeramente
        img.style.opacity = '0.8';           // Cambiar opacidad al hacer hover
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';    // Volver al tamaño normal
        img.style.opacity = '1';             // Restaurar opacidad
      });
    }
  
    // Crear la galería dinámicamente
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.classList.add('gallery-img');
      
      // Aplicar estilo inicial de opacidad y transform
      img.style.opacity = '0';  // Ocultamos la imagen inicialmente
      img.style.transform = 'translateY(20px)';  // Inicialmente la movemos hacia abajo
      img.style.transition = 'opacity 1s ease, transform 1s ease'; // Añadimos una transición suave
  
      // Añadir la imagen a la galería
      gallery.appendChild(img);
  
      // Cuando la imagen haya cargado, ejecutamos la animación con un retraso
      img.onload = () => {
        const delay = index * 200;  // 200ms de retraso entre cada imagen
        animateImage(img, delay);
      };
  
      // Añadir el evento hover
      handleHover(img);
  
      // Añadir evento de clic para abrir la imagen en el modal
      img.addEventListener('click', () => {
        showImage(index);
        modal.style.display = "block";
      });
    });
  
    // Cerrar modal
    span.addEventListener('click', () => {
      modal.style.display = "none";
      enableScroll();
    });
  
    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
        enableScroll();
      }
    });
  });
  