const btnEnviar = document.querySelector("#enviar");
btnResetFormulario = document.querySelector("#resetBtn");
formulario = document.querySelector("#enviar-mail");
const email = document.querySelector("#email");
asunto = document.querySelector("#asunto");
mensaje = document.querySelector("#mensaje");

//Funciones
const iniciarApp = () => {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
};

const estilosValidacion = (condicion, e) => {
  if (condicion) {
    const error = document.querySelector("p.error") ?? false;
    if (error) {
      error.remove("error");
    }
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
  }
};

const mostrarError = (mensaje) => {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.insertBefore(mensajeError, document.querySelector(".mb-10"));
  }
};

const validarFormulario = (e) => {
  const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (e.target.value.length > 0) {
    estilosValidacion(true, e);
  } else {
    estilosValidacion(false, e);
    mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      estilosValidacion(true, e);
    } else {
      estilosValidacion(false, e);
      mostrarError("Debe ingresar email valido");
    }
  }

  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
};

const resetearFormulario = () => {
  formulario.reset();
  iniciarApp();
};

const enviarMail = (e) => {
  e.preventDefault();

  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  setTimeout(() => {
    spinner.style.display = "none";

    const mensaje = document.createElement("p");
    mensaje.textContent = "Mensaje enviado correctamente";
    mensaje.classList.add(
      "border",
      "border-green-500",
      "background-green-100",
      "text-green-500",
      "p-3",
      "mt-5",
      "mb-5",
      "text-center",
      "font-bold",
      "uppercase"
    );

    formulario.insertBefore(mensaje, spinner);

    setTimeout(() => {
      mensaje.remove();
      resetearFormulario();
    }, 3000);
  }, 3000);
};

//Listener
const eventsListener = () => {
  document.addEventListener("DOMContentLoaded", iniciarApp);

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  formulario.addEventListener("submit", enviarMail);

  btnResetFormulario.addEventListener("click", resetearFormulario);
};

eventsListener();
