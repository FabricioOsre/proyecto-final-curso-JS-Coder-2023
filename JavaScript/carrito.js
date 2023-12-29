let autosEnCarrito = localStorage.getItem("autos-en-carrito");
autosEnCarrito = JSON.parse(autosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoAutos = document.querySelector("#carrito-autos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-auto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarAutosCarrito() {
    if (autosEnCarrito && autosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoAutos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoAutos.innerHTML = "";
    
        autosEnCarrito.forEach(auto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-auto");
            div.innerHTML = `
                <img class="carrito-auto-imagen" src="${auto.imagen}" alt="${auto.titulo}">
                <div class="carrito-auto-titulo">
                    <small>Título</small>
                    <h3>${auto.titulo}</h3>
                </div>
                <div class="carrito-auto-cantidad">
                    <small>Cantidad</small>
                    <p>${auto.cantidad}</p>
                </div>
                <div class="carrito-auto-precio">
                    <small>Precio</small>
                    <p>U$$${auto.precio}</p>
                </div>
                <div class="carrito-auto-subtotal">
                    <small>Subtotal</small>
                    <p>U$$${auto.precio * auto.cantidad}</p>
                </div>
                <button class="carrito-auto-eliminar" id="${auto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoAutos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoAutos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarAutosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-auto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Auto eliminado",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #333233, #707979)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '2.5rem' 
          },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = autosEnCarrito.findIndex(auto => auto.id === idBoton);
    
    autosEnCarrito.splice(index, 1);
    cargarAutosCarrito();

    localStorage.setItem("autos-en-carrito", JSON.stringify(autosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a eliminar ${autosEnCarrito.reduce((acc, auto) => acc + auto.cantidad, 0)} autos de tu carrito.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            autosEnCarrito.length = 0;
            localStorage.setItem("autos-en-carrito", JSON.stringify(autosEnCarrito));
            cargarAutosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = autosEnCarrito.reduce((acc, auto) => acc + (auto.precio * auto.cantidad), 0);
    total.innerText = `U$$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    autosEnCarrito.length = 0;
    localStorage.setItem("autos-en-carrito", JSON.stringify(autosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoAutos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}