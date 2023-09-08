/* tercera pre-entrega Gaston Villan */


document.addEventListener('DOMContentLoaded', () => {

    const datosDeRepuestos = [
{
id : 1 ,
nombre : "valvulas de escape",
precio : 8500,
origen : "Japon",
material : "Acero",
imagen : "../imagenes/Valvulas.jpeg"
},

{
id : 2 ,
nombre : "Bujias ngk",
precio : 3500,
origen : "Brasil",
material : "Acero",
imagen : "../imagenes/bujiabrasil.jpeg"
},

{
id : 3 ,
nombre : "Arandelas de cobre",
precio : 500,
origen : "Argentina",
material : "Cobre",
imagen : "../imagenes/arandelasdecobre.jpeg"
},

{
id : 4 ,
nombre : "Resortes de Valvulas",
precio : 6500,
origen : "Argentina",
material : "Alambre de Acero",
imagen: "../imagenes/resortesdevalvulas.jpg",
}

    ];

    let carrito = [];
    const moneda = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;



    function renderizarProductos() {
        datosDeRepuestos.forEach((info) => {
            const elemento = document.createElement('div');
            elemento.classList.add('card', 'col-sm-4');

            const accionesnodo = document.createElement('div');
            accionesnodo.classList.add('card-body');

            const titulo = document.createElement('h5');
            titulo.classList.add('card-title');
            titulo.textContent = info.nombre;

            const Imagen = document.createElement('img');
            Imagen.classList.add('img-fluid');
            Imagen.setAttribute('src', info.imagen);

            const Precio = document.createElement('p');
            Precio.classList.add('card-text');
            Precio.textContent = `${info.precio}${moneda}`;
 
            const accionBoton = document.createElement('button');
            accionBoton.classList.add('btn', 'btn-primary');
            accionBoton.textContent = '+';
            accionBoton.setAttribute('marcador', info.id);
            accionBoton.addEventListener('click', sumarProductoAlCarrito);

            accionesnodo.appendChild(Imagen);
            accionesnodo.appendChild(titulo);
            accionesnodo.appendChild(Precio);
            accionesnodo.appendChild(accionBoton);
            elemento.appendChild(accionesnodo);
            DOMitems.appendChild(elemento);
        });
    }


    function sumarProductoAlCarrito(compra) {
        carrito.push(compra.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    /* productos en el carrito*/

    
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach((item) => {
            const miItem = datosDeRepuestos.filter((itemdatosDeRepuestos) => {
                return itemdatosDeRepuestos.id === parseInt(item);
            });

            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);

            const elemento = document.createElement('li');
            elemento.classList.add('list-group-item', 'text-right', 'mx-2');
            elemento.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${moneda}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            elemento.appendChild(miBoton);
            DOMcarrito.appendChild(elemento);
        });

        DOMtotal.textContent = calcularTotal();
    }


    function borrarItemCarrito(compra) {o
        const id = compra.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });

        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }


    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = datosDeRepuestos.filter((itemdatosDeRepuestos) => {
                return itemdatosDeRepuestos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }


    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});
