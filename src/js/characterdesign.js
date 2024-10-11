document.addEventListener('DOMContentLoaded', (event) => {
  const images = [
    '../media/CHARACTER DESIGN/alien-contrabandista.jpg', '../media/CHARACTER DESIGN/animales-clase.jpg', 
    '../media/CHARACTER DESIGN/barbacoa.jpg', '../media/CHARACTER DESIGN/bloodborne.jpg',
    '../media/CHARACTER DESIGN/bruja.jpg', '../media/CHARACTER DESIGN/cascos-robot.jpg',
    '../media/CHARACTER DESIGN/conejito.jpg', '../media/CHARACTER DESIGN/exploracion-leones-rock.jpg', 
    '../media/CHARACTER DESIGN/gladiador-ciborg.jpg', '../media/CHARACTER DESIGN/gorila-mantis.jpg',
    '../media/CHARACTER DESIGN/guardianes-bosque.jpg', '../media/CHARACTER DESIGN/icaro-portfolio.jpg',
    '../media/CHARACTER DESIGN/jinete-campo.jpg', '../media/CHARACTER DESIGN/minotauro-real.jpg', 
    '../media/CHARACTER DESIGN/pirata.jpg', '../media/CHARACTER DESIGN/samurais-utad.jpg',
    '../media/CHARACTER DESIGN/soldado-corto-concept.png', '../media/CHARACTER DESIGN/sumo-ciborg.jpg', 
    '../media/CHARACTER DESIGN/tuareg.jpg'
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

    // Si estamos en móvil, habilitamos el arrastre de la imagen
    if (window.innerWidth <= 768) {
      enableImagePan(modalImg);
    }
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
      } else if (event.key === 'Escape') { // Cerrar modal con tecla "Escape"
        closeModal();
      }
    }
  });

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
      setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'translateY(0)';
      }, delay);
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
  function closeModal() {
    modal.style.display = "none";
  }

  // Cerrar modal al hacer clic en la 'X' o fuera del modal
  span.addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });

  // Habilitar arrastre de la imagen en dispositivos móviles
  function enableImagePan(img) {
    let isPanning = false;
    let startX = 0;
    let startY = 0;

    img.addEventListener('touchstart', (e) => {
      isPanning = true;
      startX = e.touches[0].pageX - img.offsetLeft;
      startY = e.touches[0].pageY - img.offsetTop;
    });

    img.addEventListener('touchmove', (e) => {
      if (!isPanning) return;
      const x = e.touches[0].pageX - img.offsetLeft;
      const y = e.touches[0].pageY - img.offsetTop;
      const moveX = (x - startX);
      const moveY = (y - startY);
      img.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    img.addEventListener('touchend', () => {
      isPanning = false;
      img.style.transform = 'translate(0, 0)'; // Resetear posición después de soltar
    });
  }
});
