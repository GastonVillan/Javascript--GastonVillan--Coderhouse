document.getElementById('formulario-contacto').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const marca = document.getElementById('marca').value;
    const cilindrada = document.getElementById('cilindrada').value;
    const detalle = document.getElementById('detalle').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    const datos = {
        nombre: nombre,
        telefono: telefono,
        marca: marca,
        cilindrada: cilindrada,
        detalle: detalle,
        correo: correo,
        mensaje: mensaje
    };

    
    fetch("../data/formulario.json", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al enviar la solicitud');
        }
        return response.json();
    })
    .then((data) => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado con éxito',
                text: 'Gracias por contactarnos. Te responderemos pronto.',
            });
            
            document.getElementById('nombre').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('marca').value = '';
            document.getElementById('cilindrada').value = '';
            document.getElementById('detalle').value = '';
            document.getElementById('correo').value = '';
            document.getElementById('mensaje').value = '';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar el mensaje',
                text: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.',
            });
        }
    })
    .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al enviar el mensaje',
            text: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.',
        });
    });
});
