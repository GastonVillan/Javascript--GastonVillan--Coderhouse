 /* segunda pre-entrega Gaston Villan*/

function Producto (nombre, precio,) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
}

const n1_bujia = new Producto("Bujia", 3500);
const n2_bujiabr = new Producto("Bujiabr", 3500);
const n3_valvulas = new Producto("valvulas", 8000);
const n4_platillos = new Producto("PLATILLOS DE VALVULAS", 3100);
const n5_resortes = new Producto("Resortes de pantalla", 1500);

console.table(n1_bujia);
console.table(n2_bujiabr);
console.table(n3_valvulas);
console.table(n4_platillos);
console.table(n5_resortes);

let totalcompra = 0;
let contador1 = 0, contador2 = 0, contador3 = 0, contador4 = 0, contador5 = 0;
let producto1 = 3500, producto2 = 3500, producto3 = 8000, producto4 = 3100, producto5= 1500
let cantidad;

const carrito = [];


function producto(num1, num2){
  let resultado = (parseFloat(num1))*(parseFloat(num2));
  return resultado;
}
function cantidades(){
  let numero = false;
  while (!numero){
      cantidad = parseFloat(prompt("Ingresar cantidad"));
      numero = !isNaN(cantidad);
      if (numero && (cantidad > 0)){
          return cantidad;
          break;
      }
      else{
          alert("ingreso un numero por favor");
      }
  }
}
do{
    productos = parseFloat(prompt("Ingrese el numero del producto, por ejemplo(1,2,3,4 o 5). Para salir ingresa 0"));
    switch (productos){
        case 1:
           cantidad = cantidades();
            totalcompra+= producto(producto1, cantidad);
            let compra1 = new Producto(contador1+=cantidad);
                    carrito.push(compra1);
                    alert ("su producto ha sido sumado a su carrito")
            break;
        case 2:
            cantidad = cantidades();
            totalcompra+= producto(producto2, cantidad);
            let compra2 = new Producto(contador1+=cantidad);
                    carrito.push(compra2);
                    alert ("su producto ha sido sumado a su carrito")
            break;
        case 3:
            cantidad = cantidades();
            totalcompra+= producto(producto3, cantidad);
            let compra3 = new Producto(contador1+=cantidad);
                    carrito.push(compra3);
                    alert ("su producto ha sido sumado a su carrito")
            break;
        case 4:
            cantidad = cantidades();
            totalcompra+= producto(producto4, cantidad);
            let compra4 = new Producto(contador1+=cantidad);
                    carrito.push(compra4);
                    alert ("su producto ha sido sumado a su carrito")
            break;
        case 5:
            cantidad = cantidades();
            totalcompra+= producto(producto5, cantidad);
            let compra5 = new Producto(contador1+=cantidad);
                    carrito.push(compra5);
                    alert ("su producto ha sido sumado a su carrito")
            break;
        case 0: 
            alert("Su compra es de: bujias - (cantidad)  "+contador1+"  , bujiasbr - (cantidad)  "+contador2+"  , valvulas - (cantidad)  "+contador3+"  ,platillos de valvulas - (cantidad)  "+contador4+"  ,resortes - (cantidad)  "+contador5+"          su compra total es $"+totalcompra);
            break;
        default:
            alert("Si no quiere seguir con su compra, ingrese 0");
    }
}
while(productos!=0);

if (carrito.length === 0) {
  alert("No hay productos en el carrito");
}else{

let total=carrito.reduce((total, element) => total + element.precio, 0);
alert("el total de su compra es de :" + "$" + totalcompra); 
}