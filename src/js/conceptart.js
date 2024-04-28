
function disableScroll(){
    document.documentElement.style.overflow = 'hidden';
  }
  function enableScroll(){
    document.documentElement.style.overflow = '';
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    const images = [
     '../media/LAYOUT DEFINITIVO/vis dev/concept art/columnas-y-ventanales.jpg', '../media/LAYOUT DEFINITIVO/vis dev/concept art/concept-ciudad antigua-costa.jpg',
     '../media/LAYOUT DEFINITIVO/vis dev/concept art/edificios.jpg','../media/LAYOUT DEFINITIVO/vis dev/concept art/ilustracion-ciudad-exterior.jpg',
     '../media/LAYOUT DEFINITIVO/vis dev/concept art/ilustracion-interior-ciudad.jpg','../media/LAYOUT DEFINITIVO/vis dev/concept art/taberna.jpg',
     '../media/LAYOUT DEFINITIVO/vis dev/concept art/props-taberna.jpg'];
  
  
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
  
  