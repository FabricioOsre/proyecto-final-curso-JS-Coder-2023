let autos = [];

fetch("./JavaScript/autos.json")
    .then(response => response.json())
    .then(data => {
        autos = data;
        cargarAutos(autos);
    })


const contenedorAutos = document.querySelector("#contenedor-autos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".auto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarAutos(autosElegidos) {

    contenedorAutos.innerHTML = "";

    autosElegidos.forEach(auto => {

        const div = document.createElement("div");
        div.classList.add("auto");
        div.innerHTML = `
            <div class="auto-detalles">
            <img class="auto-imagen" src="${auto.imagen}" alt="${auto.titulo}">
                <h3 class="auto-titulo">${auto.titulo}</h3>
                <p class="auto-precio">U$$${auto.precio}</p>
                <button class="auto-agregar" id="${auto.id}">Agregar al Carrito</button>
            </div>
        `;

        contenedorAutos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const autoCategoria = autos.find(auto => auto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = autoCategoria.categoria.nombre;
            const autosBoton = autos.filter(auto => auto.categoria.id === e.currentTarget.id);
            cargarAutos(autosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los Veículos";
            cargarAutos(autos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".auto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let autosEnCarrito;

let autosEnCarritoLS = localStorage.getItem("autos-en-carrito");

if (autosEnCarritoLS) {
    autosEnCarrito = JSON.parse(autosEnCarritoLS);
    actualizarNumerito();
} else {
    autosEnCarrito = [];
}



function agregarAlCarrito(e) {

    let autosEnCarritoLS = localStorage.getItem("autos-en-carrito");
    Toastify({
        text: `Vehículo agregado`,
        duration: 4000,
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
            y: '1.5rem' 
          },
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const autoAgregado = autos.find(auto => auto.id === idBoton);

    if(autosEnCarrito.some(auto => auto.id === idBoton)) {
        const index = autosEnCarrito.findIndex(auto => auto.id === idBoton);
        autosEnCarrito[index].cantidad++;
    } else {
        autoAgregado.cantidad = 1;
        autosEnCarrito.push(autoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("autos-en-carrito", JSON.stringify(autosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = autosEnCarrito.reduce((acc, auto) => acc + auto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
