
function disableScroll(){
    document.documentElement.style.overflow = 'hidden';
  }
  function enableScroll(){
    document.documentElement.style.overflow = '';
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    const images = [
      '../media/dibujos/SI/5ACB96B5-F2D4-433C-80D2-C073CD6688FD.jpg' ,'../media/dibujos/SI/cuca.jpg', '../media/dibujos/SI/personaje-tortuga.jpg',
      '../media/dibujos/SI/espadachin pose final-Recuperado.jpg', '../media/dibujos/SI/IMG_0017.jpg', '../media/dibujos/SI/IMG_0267.jpg',
      , '../media/dibujos/SI/IMG_0427.jpg', '../media/dibujos/SI/IMG_0581.jpg', '../media/dibujos/SI/IMG_0601.jpg'
      , '../media/dibujos/SI/IMG_0614.jpg', '../media/dibujos/SI/IMG_0619.jpg', '../media/dibujos/SI/IMG_0634.jpg', '../media/dibujos/SI/jinete campo.jpg',
      '../media/dibujos/SI/jonas expresiones.jpg', '../media/dibujos/SI/lobo insta.jpg', '../media/dibujos/SI/motocicleta boceto.jpg', '../media/dibujos/SI/motorista.jpg',
      '../media/dibujos/SI/prueba definitiva.jpg', '../media/dibujos/SI/sumo ciborg.jpg', '../media/dibujos/SI/tokyo vice.jpg', '../media/dibujos/SI/trolls.jpg','../media/dibujos/SI/IMG_0036.jpg'  
  ];
  
    //para el cambio de imágenes
    let currentIndex = 0;
  
    // Referencias a elementos del DOM
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    const span = document.querySelector('.close'); 
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');
  
    function showImage(index){
      //primero ocultamos
      modalImg.style.opacity = '0';
  
      //cambiamos la imagen después de que la transición acabe
      setTimeout(() => {
        modalImg.src = images[index];
        currentIndex=index;
  
        //restauramos opacidad
        modalImg.style.opacity='1';
      }, 500)
    }
  
      //para los botones de navegación
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });
    
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
    
  
    // Funcionalidad para abrir el modal
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.classList.add('gallery-img');
      img.addEventListener('click', () => {
        showImage(index);
        modal.style.display = "block";
      });
      gallery.appendChild(img);
    });
  
    // Funcionalidad para cerrar el modal
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
  
  