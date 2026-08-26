// 🎪 Encuentro Maker Medellín 2026
// Aquí vive toda la lógica del formulario.
// Arranca leyendo los dos ejemplos resueltos. Ese es el patrón. 👇


// ✅ RESUELTO 1: mostrar u ocultar los datos de facturación

const checkFactura = document.getElementById("requiere-factura");
const datosFactura = document.getElementById("datos-factura");

function alternarDatosFactura() {
  if (checkFactura.checked) {
    datosFactura.classList.remove("oculto");
  } else {
    datosFactura.classList.add("oculto");
  }
}

checkFactura.addEventListener("change", alternarDatosFactura);


// ✅ RESUELTO 2: envío del formulario y panel de confirmación

const formulario = document.getElementById("formulario-inscripcion");
const panelConfirmacion = document.getElementById("panel-confirmacion");
const confirmacionTexto = document.getElementById("confirmacion-texto");
const btnVolver = document.getElementById("btn-volver");

function enviarFormulario(evento) {
  evento.preventDefault();

  // 👀 Ojo: el valor se lee aquí adentro, no arriba. ¿Por qué?
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  confirmacionTexto.textContent =
    "Gracias " + nombre + ". Enviamos la confirmación al correo " + correo + ".";

  formulario.classList.add("oculto");
  panelConfirmacion.classList.remove("oculto");
}

function volverAlFormulario() {
  panelConfirmacion.classList.add("oculto");
  formulario.classList.remove("oculto");
}

formulario.addEventListener("submit", enviarFormulario);
btnVolver.addEventListener("click", volverAlFormulario);


// ✍️ FEATURE 1: contador de caracteres en observaciones

const observaciones = document.getElementById("observaciones");
const limiteCaracteres = 200;

observaciones.maxLength = limiteCaracteres;

const contador = document.createElement("p");
contador.classList.add("contador");

observaciones.after(contador);

function actualizarContador() {
  const caracteresEscritos = observaciones.value.length;
  contador.textContent = caracteresEscritos + " / " + limiteCaracteres;
  contador.classList.remove("contador--alerta");
  contador.classList.remove("contador--limite");

  if (caracteresEscritos === limiteCaracteres) {
    contador.classList.add("contador--limite");
  } else if (caracteresEscritos >= 150){
    contador.classList.add("contador--alerta");
  }
}

actualizarContador();

observaciones.addEventListener("input",actualizarContador);

// 📧 FEATURE 2: validación del correo electrónico

const correo = document.getElementById("correo");
const mensajeCorreo = document.createElement("p");

mensajeCorreo.classList.add("mensaje-error");
correo.after(mensajeCorreo);

function validarCorreo() {
  const valorCorreo = correo.value.trim();
  const partes = valorCorreo.split("@");
  const correoEsValido =
    partes.length === 2 &&
    partes[0] !== "" &&
    partes[1].includes(".") &&
    !partes[1].startsWith(".") &&
    !partes[1].endsWith(".");

  correo.classList.remove("campo__control--error");
  correo.classList.remove("campo__control--valido");
  
  if (valorCorreo === "") {
    mensajeCorreo.textContent = "El correo es obligatorio.";
    correo.classList.add("campo__control--error");
  } else if(!correoEsValido) {
    mensajeCorreo.textContent = "Escribe un correo válido, por ejemplo nombre@dominio.com";
    correo.classList.add("campo__control--error");
  } else {
    mensajeCorreo.textContent = "";
    correo.classList.add("campo__control--valido");
  }
}

correo.addEventListener("blur", validarCorreo);

// 🎟️ FEATURE 3: límite de talleres seleccionables




// 💰 FEATURE 4: cálculo del total de la inscripción




// 👥 FEATURE 5: registro de acompañantes
