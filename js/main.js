let usuario=prompt ("ingrese su nombre y apellido");

let edad=parseInt (prompt ("ingrese su edad"))
if (edad >=18) {
    alert("Bienvenido/a " + usuario + " a nuestro sitio web"); 

}else if (edad <18){
    alert(usuario + " No realices compras en nuestro sitio web sin la tutoria de un mayor.")
};


alert ("Selecciona los productos que quieras comprar y luego le daremos el valor total de lo que usted selecciono. \n n1 - Porta patente ($1.500) \n n2 - Casco ($17.500) \n n3 - Lubricante de cadena ($5.300) \n n4 - Bujia NGK Japon ($1.900) \n n5 - Aceite de motor ($4.000)")

const Portapatente = 1500, Casco = 17500, Lubricante = 5300, Bujia = 1900, Aceitemotor = 4000;
let totalcompra = 0;
let contador1 = 0, contador2 = 0, contador3 = 0, contador4 = 0, contador5 = 0;
let productos = 0;
let cantidad;

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
            totalcompra+= producto(Portapatente, cantidad);
            contador1+=cantidad;
            break;
        case 2:
            cantidad = cantidades();
            totalcompra+= producto(Casco, cantidad);
            contador2+=cantidad;
            break;
        case 3:
            cantidad = cantidades();
            totalcompra+= producto(Lubricante, cantidad);
            contador3+=cantidad;
            break;
        case 4:
            cantidad = cantidades();
            totalcompra+= producto(Bujia, cantidad);
            contador4+=cantidad;
            break;
        case 5:
            cantidad = cantidades();
            totalcompra+= producto(Aceitemotor, cantidad);
            contador5+=cantidad;
            break;
        case 0: 
            alert("Su compra es de: portapatente - (cantidad)  "+contador1+"  , casco - (cantidad)  "+contador2+"  , lubricante para cadena - (cantidad)  "+contador3+"  ,bujias - (cantidad)  "+contador4+"  ,aceite para motor - (cantidad)  "+contador5+"          su compra total es $"+totalcompra);
            break;
        default:
            alert("Si no quiere seguir con su compra, ingrese 0");
    }
}
while(productos!=0);

alert("Gracias por confiar en nosotros " + usuario + ". Le deseamos un buen dia");