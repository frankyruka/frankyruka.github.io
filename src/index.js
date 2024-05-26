const images = ['media/LAYOUT DEFINITIVO/home/bruja.jpg', 'media/LAYOUT DEFINITIVO/home/barbacoa.jpg', 'media/LAYOUT DEFINITIVO/home/sumo-ciborg.jpg', 'media/LAYOUT DEFINITIVO/home/sirena-malvada.jpg'
  ,'media/LAYOUT DEFINITIVO/home/alien-contrabandista.jpg'
];


let currentImageIndex = 0;
let isBgImage1Active = true;

function changeBackgroundImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  const bgImage1 = document.getElementById('bgImage1');
  const bgImage2 = document.getElementById('bgImage2');
  const nextImage = images[currentImageIndex];

  if (isBgImage1Active) {
    bgImage2.style.backgroundImage = `url('${nextImage}')`;
    bgImage2.style.opacity = 1;
    bgImage1.style.opacity = 0;
  } else {
    bgImage1.style.backgroundImage = `url('${nextImage}')`;
    bgImage1.style.opacity = 1;
    bgImage2.style.opacity = 0;
  }

  isBgImage1Active = !isBgImage1Active;
}

// Asegurarse de que la primera imagen se carga y muestra inmediatamente
window.onload = function() {
  document.getElementById('bgImage1').style.backgroundImage = `url('${images[0]}')`;
  document.getElementById('bgImage1').style.opacity = 1;

  changeBackgroundImage(); // la cambio rapido para que se note que se cambian las imagenes
  setInterval(changeBackgroundImage, 4000);
}