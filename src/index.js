
function disableScroll(){
  document.documentElement.style.overflow = 'hidden';
}
function enableScroll(){
  document.documentElement.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', (event) => {
  const images = [
    'media/dibujos/BLANCO/babuino-final.jpg','media/dibujos/BLANCO/cabezas-troll.jpg','media/dibujos/BLANCO/cabra-loca.jpg',
    'media/dibujos/BLANCO/chicas-Recuperado.jpg','media/dibujos/BLANCO/elefante.png',
    'media/dibujos/BLANCO/exploracion-personajes.jpg','media/dibujos/BLANCO/frankenstain-final.jpg',
    'media/dibujos/BLANCO/gorila-mantis.jpg','media/dibujos/BLANCO/guerrero-dinamico.jpg','media/dibujos/BLANCO/IMG_0016.jpg',
    'media/dibujos/BLANCO/IMG_0024.jpg','media/dibujos/BLANCO/IMG_0054.jpg','media/dibujos/BLANCO/IMG_0468.png','media/dibujos/BLANCO/IMG_0539.jpg',
    'media/dibujos/BLANCO/IMG_0558.jpg','media/dibujos/BLANCO/IMG_0610.jpg','media/dibujos/BLANCO/IMG_0626.jpg','media/dibujos/BLANCO/IMG_0628.png',
    'media/dibujos/BLANCO/IMG_0629.png','media/dibujos/BLANCO/IMG_0630.png','media/dibujos/BLANCO/IMG_0631.png','media/dibujos/BLANCO/IMG_0632.png',
    'media/dibujos/BLANCO/IMG_0641.jpg','media/dibujos/BLANCO/insta.jpg','media/dibujos/BLANCO/link.png','media/dibujos/BLANCO/malvado-a-caballo.jpg',
    'media/dibujos/BLANCO/mosquetero.jpg','media/dibujos/BLANCO/mujer-t.jpg','media/dibujos/BLANCO/mujer-t-2.jpg','media/dibujos/BLANCO/picaro.jpg',
    'media/dibujos/BLANCO/pija.png','media/dibujos/BLANCO/pija2.png','media/dibujos/BLANCO/pirata-diseño-de-personaje.jpg','media/dibujos/BLANCO/plantilla-personajes-animal-1.jpg',
    'media/dibujos/BLANCO/pose-final-niño.jpg','media/dibujos/BLANCO/princesa-guerrera-2.jpg','media/dibujos/BLANCO/sade-love-deluxe.jpg',
    'media/dibujos/BLANCO/spidey.jpg','media/dibujos/BLANCO/tyler2.jpg','media/dibujos/BLANCO/vikingo-que-grita.jpg',
    'media/dibujos/BLANCO/serpiente-final.jpg','media/dibujos/BLANCO/soldadoo.jpg'
  ];

  //'media/dibujos/BLANCO/emperador.jpg',
  //'media/dibujos/BLANCO/robot-chapa.jpg',

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

