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

const grupoTalleres = document.getElementById("grupo-talleres");
const talleres = grupoTalleres.querySelectorAll('input[name="taller"]');
const contadorTaller = document.createElement("p");
contadorTaller.classList.add("contador");
grupoTalleres.after(contadorTaller);
const limiteTalleres = 2;

function actualizarTalleres () {
  const talleresSeleccionados = grupoTalleres.querySelectorAll('input[name="taller"]:checked');
  const cantidadSeleccionados = talleresSeleccionados.length;
  contadorTaller.textContent = "Talleres seleccionados: " + cantidadSeleccionados +  " de " + limiteTalleres;
  contadorTaller.classList.remove("contador--limite");

  if(cantidadSeleccionados === limiteTalleres) {
    contadorTaller.classList.add("contador--limite");

  }
  talleres.forEach((taller) => {
    if (cantidadSeleccionados === limiteTalleres 
      && !taller.checked
    ){
      taller.disabled = true;
      taller.parentElement.classList.add("opcion--bloqueada");
    } else {
      taller.disabled = false;
      taller.parentElement.classList.remove("opcion--bloqueada");
    }

  });
}

talleres.forEach((taller) => {
    taller.addEventListener("change", actualizarTalleres);
});

actualizarTalleres();

// 💰 FEATURE 4: cálculo del total de la inscripción

const valorTotal = document.getElementById("valor-total");
const modalidades = document.querySelectorAll('input[name="modalidad"]');
const adicionales = document.querySelectorAll('input[name="adicional"]');

function calcularTotal() {
  const modalidadSeleccionada =  document.querySelector('input[name="modalidad"]:checked');
  let total = Number(modalidadSeleccionada.dataset.precio);
  adicionales.forEach((adicional) => {
      if (adicional.checked) {
          total += Number(adicional.dataset.precio);
      }
  });

  valorTotal.textContent =
      "$" + total.toLocaleString("es-CO");
}

modalidades.forEach((modalidad) => {
    modalidad.addEventListener("change", calcularTotal);
});

adicionales.forEach((adicional) => {
    adicional.addEventListener("change", calcularTotal);
});

calcularTotal();

// 👥 FEATURE 5: registro de acompañantes
const acompananteNombre = document.getElementById("acompanante-nombre");
const acompananteParentesco = document.getElementById("acompanante-parentesco");
const botonAgregar = document.getElementById("btn-agregar-acompanante");
const listaAcompanantes = document.getElementById("lista-acompanantes");
const mensajeErrorAcomp = document.createElement("p");
mensajeErrorAcomp.classList.add("mensaje-error");
acompananteNombre.after(mensajeErrorAcomp);

function agregarAcompanante() {
  const nombre = acompananteNombre.value.trim();

  if (!nombre) {
    mensajeErrorAcomp.textContent = "Escribe el nombre del acompañante."
    return;
  }
  mensajeErrorAcomp.textContent = "";

  const item = document.createElement("li");
  const botonEliminar = document.createElement("button");

  botonEliminar.type = "button";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.classList.add("boton-mini");

  item.append(nombre + " - " + acompananteParentesco.selectedOptions[0].textContent, " ", botonEliminar);

  listaAcompanantes.append(item);

  acompananteNombre.value = "";
  acompananteNombre.focus();

  botonAgregar.disabled = listaAcompanantes.children.length >= 4;

  function eliminarAcompanante() {
    item.remove();
    botonAgregar.disabled = false;
  }

  botonEliminar.addEventListener("click", eliminarAcompanante);
}

botonAgregar.addEventListener("click", agregarAcompanante);


// 👥 FEATURE 6: 

const casillaTerminos = document.getElementById("terminos");
const botonConfirmarInscripcion = document.getElementById("btn-enviar");

function actualizarEstadoConfirmacion() {
    botonConfirmarInscripcion.disabled =
        !casillaTerminos.checked;
}

casillaTerminos.addEventListener(
    "change",
    actualizarEstadoConfirmacion
);

actualizarEstadoConfirmacion();