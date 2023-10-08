document.addEventListener('DOMContentLoaded', () => {
    const miLocalStorage = window.localStorage;
    let carrito = [];

    const moneda = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonComprar = document.querySelector('#boton-comprar');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

 
    const datosDeRepuestos = [
        {
            id: 1,
            nombre: "Valvulas de escape",
            precio: 8500,
            origen: "Japon",
            material: "Acero",
            imagen: "../imagenes/Valvulas.jpeg"
        },
        {
            id: 2,
            nombre: "Bujias ngk",
            precio: 3500,
            origen: "Brasil",
            material: "Acero",
            imagen: "../imagenes/bujiabrasil.jpeg"
        },
        {
            id: 3,
            nombre: "Arandelas de cobre",
            precio: 500,
            origen: "Argentina",
            material: "Cobre",
            imagen: "../imagenes/arandelasdecobre.jpeg"
        },
        {
            id: 4,
            nombre: "Resortes de Valvulas",
            precio: 6500,
            origen: "Argentina",
            material: "Alambre de Acero",
            imagen: "../imagenes/resortesdevalvulas.jpg",
        },
        {
            id:5,
            nombre: "Filtro de Aceite",
            precio:4700,
            origen: "Japon" ,
            material: "papel de celulosa, algodón y materiales sintéticos",
            imagen: "../imagenes/filtrodeaceite.jpeg"
        },
        {
            id:6,
            nombre: "Filtro de Nafta" ,
            precio:1200,
            origen: "Argentina" ,
            material: "plástico" ,
            imagen: "../imagenes/filtrodenafta.jpeg"
        },
        {
            id:7,
            nombre: "Chicler de Alta" ,
            precio: 9000,
            origen: "Argentina",
            material: "Acero",
            imagen: "../imagenes/Chicler-de-alta-y-de-baja-para-moto.jpg"
        },
        {
            id: 8,
            nombre: "Chicler de Baja " ,
            precio: 16000,
            origen: "Argentina" ,
            material: "acero" ,
            imagen: "../imagenes/Chicler-de-alta-y-de-baja-para-moto.jpg"
        },
        {
            id: 9,
            nombre: "Flotante para carburadores" ,
            precio: 25000,
            origen: "Taiwan" ,
            material: " " ,
            imagen: "../imagenes/flotadores.jpg"
        },
        {
            id:10,
            nombre: "Agujas punzua" ,
            precio: 1700,
            origen: "Argentina" ,
            material: "metal" ,
            imagen: "../imagenes/agujas.jpeg"
        }
    ];

    function crearProductoCard(producto) {
        const card = document.createElement('div');
        card.classList.add('card', 'col-sm-4', 'carritocompra');
        card.innerHTML = `
            <div class="card-body compracarrito">
                <h5 class="card-title">${producto.nombre}</h5>
                <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                <p class="card-text compracarrito">Precio: ${producto.precio}${moneda}</p>
                <button class="btn btn-primary" data-id="${producto.id}">Agregar al Carrito</button>
            </div>
        `;
        const btnAgregar = card.querySelector('button');
        btnAgregar.addEventListener('click', () => agregarProductoAlCarrito(producto.id));
        return card;
    }

    function agregarProductoAlCarrito(id) {
        const producto = datosDeRepuestos.find(item => item.id === id);
        if (producto) {
            const productoEnCarrito = carrito.find(item => item.id === id);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad += 1;
            } else {
                carrito.push({ ...producto, cantidad: 1 });
            }
            guardarCarritoEnLocalStorage();
            renderizarCarrito();
        }
    }

    function eliminarProductoDelCarrito(id) {
        carrito = carrito.filter(producto => producto.id !== id);
        guardarCarritoEnLocalStorage();
        renderizarCarrito();
    }

    function cambiarCantidadProducto(id, incremento) {
        const productoEnCarrito = carrito.find(item => item.id === id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += incremento;
            if (productoEnCarrito.cantidad <= 0) {
                eliminarProductoDelCarrito(id);
            }
            guardarCarritoEnLocalStorage();
            renderizarCarrito();
        }
    }

    function renderizarCarrito() {
        DOMcarrito.innerHTML = '';
        carrito.forEach(producto => {
            const itemCarrito = crearItemCarrito(producto);
            DOMcarrito.appendChild(itemCarrito);
        });

DOMtotal.textContent = `Total: $${calcularTotalCarrito()}`;
;
    }

    function crearItemCarrito(producto) {
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('row', 'mb-3', 'compracarrito');
        itemCarrito.innerHTML = `
            <div class="col-6">${producto.nombre}</div>
            <div class="col-3">$${(producto.precio * producto.cantidad).toFixed(2)}</div>
            <div class="col-3">
                <button class="btn btn-danger btn-sm" data-id="${producto.id}">Eliminar</button>
                <button class="btn btn-primary btn-sm ml-2" data-id="${producto.id}">+</button>
                <span class="ml-1 mr-1">${producto.cantidad}</span>
                <button class="btn btn-warning btn-sm" data-id="${producto.id}">-</button>
            </div>
        `;
        const btnEliminar = itemCarrito.querySelector('.btn-danger');
        const btnAumentar = itemCarrito.querySelector('.btn-primary');
        const btnDisminuir = itemCarrito.querySelector('.btn-warning');
        btnEliminar.addEventListener('click', () => eliminarProductoDelCarrito(producto.id));
        btnAumentar.addEventListener('click', () => cambiarCantidadProducto(producto.id, 1));
        btnDisminuir.addEventListener('click', () => cambiarCantidadProducto(producto.id, -1));
        return itemCarrito;
    }

    function calcularTotalCarrito() {
        const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        return total.toFixed(2);
    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    const carritoGuardado = miLocalStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    renderizarProductos();

    renderizarCarrito();

    DOMbotonComprar.addEventListener('click', () => {
        if (carrito.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El carrito está vacío. Agregue productos antes de comprar.',
            });
        } else {

            carrito = [];
            guardarCarritoEnLocalStorage();
            renderizarCarrito();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su compra fue realizada con éxito',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });

    DOMbotonVaciar.addEventListener('click', () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción vaciará tu carrito de compras.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar carrito',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {

                carrito = [];
                guardarCarritoEnLocalStorage();
                renderizarCarrito();
                Swal.fire('Carrito vaciado', '', 'success');
            }
        });
    });

    DOMbotonComprar.addEventListener('click', comprar);
    
    
    function renderizarProductos() {
        DOMitems.innerHTML = '';
        datosDeRepuestos.forEach(producto => {
            const card = crearProductoCard(producto);
            DOMitems.appendChild(card);
        });
    }
});
fetch("../data/data.json")
.then(Response => Response.json())
.then(datosDeRepuestos => {
    console.log(datosDeRepuestos);
    renderServicios(datosDeRepuestos)
});

//turnero//

const formularioURL = '../pages/formulario.html';

const botonPedirTurno = document.getElementById('boton-pedir-turno');
botonPedirTurno.addEventListener('click', () => {
    window.location.href = formularioURL;
});