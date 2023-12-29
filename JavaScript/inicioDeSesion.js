const usuarioAutorizado = "jorge";
const passAutorizado = "1234";
let sesionCorrecta = false;

document.addEventListener("DOMContentLoaded", () => {
  
  const sesionAnterior = localStorage.getItem("sesionCorrecta");

  if (sesionAnterior === "true") {
    redirigirAIndex();
    return;
  }

  mostrarCuadroDialogo();
});

function mostrarCuadroDialogo() {
  Swal.fire({
    title: "Inicio de Sesión",
    html: `
      <input type="text" id="usuario" class="swal2-input" placeholder="Ingresa tu Usuario"> 
      <input type="password" id="password" class="swal2-input" placeholder="Ingresa tu Contraseña"> 
    `,
    confirmButtonText: "Enviar",
    showCancelButton: true,
    allowOutsideClick: false,
    preConfirm: () => {
      const usuario = document.getElementById("usuario").value;
      const password = document.getElementById("password").value;

      if (usuario === usuarioAutorizado && password === passAutorizado) {
        sesionCorrecta = true;
        localStorage.setItem("sesionCorrecta", "true");
        redirigirAIndex();
      } else {
        Swal.showValidationMessage("Usuario o contraseña incorrectos");
      }
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Acceso Denegado",
        text: "Inicio de Sesión Cancelado",
        icon: "error",
      }).then(() => {
        window.location.href = "./acceso-denegado-debes-iniciar-sesion-companero.html";
        // Evita el acceso a index y lo manda a cualquier lado
      });
    }
  });
}

function redirigirAIndex() {
  if (sesionCorrecta) {  // Verifica si ya esta iniciada la sesion
    Swal.fire({
      icon: "success",
      title: "Inicio de Sesión Exitoso. Bienvenido Compañero!",
      showConfirmButton: false,
      timer: 2500,
    }).then(() => {
      window.location.href = "./index.html";
    });
  }
}
