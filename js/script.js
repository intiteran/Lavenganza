function enviar(){
    let name = document.getElementById('nombre').value;
    let lastname=  document.getElementById('apellido').value;
    let team = document.getElementById("grupo").value;
    let sala = document.getElementById("sala").value;
    
    fetch('https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo255',{
        headers: {"Content-Type": "application/json; charset=utf-8"},
        method: 'POST',
        body: JSON.stringify({ // Cuerpo de la petición (request)
            nombre : name,
            apellido: lastname,
            grupo: team,
            room: sala
        })
    })
    .then(response => response.json())
    .then(data => { alert ("Enviado!!!");
        document.getElementById('nombre').value="";
        document.getElementById('apellido').value="";
        document.getElementById('grupo').value="";
        document.getElementById('sala').value="";
    })

    // lista(); 
}



// ARMADO DE LA LISTA
function lista(){
    fetch('https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo255')
    .then(response => response.json())
    .then(datos => {
        let filas = "";
        
        for (let dato of datos){
            filas += `<tr>
            <td>${dato.nombre}</td>
            <td>${dato.apellido}</td>
            <td>${dato.grupo}</td>
            <td>${dato.room}</td>
            <td><img src='./img/delete.svg' alt='borrar' width=30 style='cursor: pointer;'  onclick='borrar("${dato._id}")'></td>
            </tr>`;
        }

        document.getElementById('tabla').innerHTML = filas;
    }) 
}

// FUNCION BORRAR UTILIZANDO EL METODO DELETE
function borrar(id) {
    fetch(`https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo255/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Se ha borrado correctamente");
            // lista();
        } else {
            console.error('Error al eliminar elemento');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud DELETE:', error);
    });
    
}


document.addEventListener('DOMContentLoaded', ()=> {

    document.getElementById('enviar').addEventListener('click', ()=>{
        enviar();
    })

    document.getElementById('lista').addEventListener('click', ()=>{
        lista();
    })

    lista();

    // Actualiza la lista cada 5 segundos
    setInterval(lista, 5000);
})