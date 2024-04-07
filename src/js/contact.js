const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

const images = [
    '../media/dibujos/antiguo/SI/pirata.jpg' ,'../media/dibujos/antiguo/SI/cuca.jpg', '../media/dibujos/antiguo/SI/personaje-tortuga.jpg',
    '../media/dibujos/antiguo/SI/espadachin pose final-Recuperado.jpg', '../media/dibujos/antiguo/SI/akira.jpg', '../media/dibujos/antiguo/SI/taliban.jpg',
    '../media/dibujos/antiguo/SI/ninopropulsa.jpg', '../media/dibujos/antiguo/SI/patines.jpg', '../media/dibujos/antiguo/SI/bruja.jpg'
    , '../media/dibujos/antiguo/SI/medusa.jpg', '../media/dibujos/antiguo/SI/reyes.jpg', '../media/dibujos/antiguo/SI/rey.jpg', '../media/dibujos/antiguo/SI/jinete campo.jpg',
    '../media/dibujos/antiguo/SI/jonas expresiones.jpg', '../media/dibujos/antiguo/SI/lobo insta.jpg', '../media/dibujos/antiguo/SI/motocicleta boceto.jpg', '../media/dibujos/antiguo/SI/motorista.jpg',
    '../media/dibujos/antiguo/SI/prueba definitiva.jpg', '../media/dibujos/antiguo/SI/sumo ciborg.jpg', '../media/dibujos/antiguo/SI/tokyo vice.jpg', '../media/dibujos/antiguo/SI/trolls.jpg','../media/dibujos/antiguo/SI/rosalia.jpg'  
];



function sendMail(){
    const bodyMessage = `Full Name: ${fullName.value}<br>Email: ${email.value}<br>Phone Number: ${phone.value}<br>Subject: ${subject.value}<br>Message: ${message.value}<br>`;

    Email.send({
        SecureToken :"448495d6-ceb7-4b16-b33f-cf0a15cdf5b8",
        To : 'frankyruka@gmail.com',
        From : "frankyruka@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if(message == "OK"){
            Swal.fire({
                title: "Success!",
                text: "Message sent!",
                icon: "success"
            });
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                });
        }
      }
    );
}

function checkInputs(){
    let isFormValid = true;
    const items = document.querySelectorAll(".item");

    for(const item of items){
        if(item.value.trim() === ""){ // Verifica si el campo está vacío
            item.classList.add("error");
            item.parentElement.classList.add("error");
            isFormValid = false; // Marca el formulario como inválido
        } else {
            item.classList.remove("error");
            item.parentElement.classList.remove("error");
        }

        if(items[1].value != ""){
            checkEmail();
        }   
    }

    return isFormValid; // Devuelve si el formulario es válido o no
}

function checkEmail(){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const errorTxtEmail = document.querySelector(".error-txt.email");

    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");
        errorTxtEmail.innerText = "Enter a valid email address";
        return false;
    }
    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
        return true;
    }
}

document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("keyup", () => {
        if (item.id !== "email") {
            // Validar si los campos que no son de email están vacíos o no
            if (item.value.trim() === "") {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            } else {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
        } else {
            // Para el campo de email, llama a checkEmail
            checkEmail();
        }
    });
});


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(checkInputs()){ // Solo envía el correo si el formulario es válido
        sendMail();
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }
});


function addImagesToCarousel() {
    const container = document.getElementById('carousel-container');

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Descripción'; // Añade una descripción adecuada para cada imagen
        container.appendChild(img);
    });
}


function animateCarousel() {
    const container = document.getElementById('carousel-container');
    let scrollSpeed = 1; // Píxeles que se desplazarán en cada frame, ajusta según la suavidad deseada.
  
    function step() {
      // Si el contenedor se ha desplazado más allá de la anchura de la primera imagen, reubica la primera imagen al final.
      if (Math.abs(container.scrollLeft) >= container.firstChild.offsetWidth) {
        container.appendChild(container.firstChild);
        container.scrollLeft -= container.firstChild.offsetWidth; // Ajusta el scroll para compensar la imagen que se movió.
      }
  
      // Desplaza el carrusel
      container.scrollLeft += scrollSpeed;
  
      // Continúa el ciclo
      window.requestAnimationFrame(step);
    }
  
    // Inicia el bucle de animación
    window.requestAnimationFrame(step);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    addImagesToCarousel();
    animateCarousel();
  });


//   Función para barajar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
  }
  
  function addImagesToCarousel() {
    const container = document.getElementById('carousel-container');
  
    // Primero baraja el array de imágenes
    shuffleArray(images);
  
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Descripción'; // Añade una descripción adecuada para cada imagen
      container.appendChild(img);
    });
  }
  
  document.addEventListener('DOMContentLoaded', addImagesToCarousel);