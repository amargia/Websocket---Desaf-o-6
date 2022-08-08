const socket = io.connect();

let html = ``

//Mostrar productos
function render(datos) {
    if (datos.length === 0) {
        html = `<tr>
        <td colspan="3">
            <center>No hay productos para mostrar</center>
        </td>
    </tr>`
    } else {
        html = ``
        datos.forEach(producto => {
            html += `<tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td><img src='${producto.thumbnail}' alt="imagen" class="img-thumbnails" ></td>
        </tr>`
        });
    }
    let tabla = `
    <table class="table" style="margin: 0 auto; width: 50%;">
        <thead>
            <tr>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Thumbnail</th>
            </tr>
        </thead>
        <tbody>
            ${html}
        </tbody>
    </table>
    `
    document.getElementById('tabla').innerHTML = tabla;
}

//Renderizado y adición de mensajes
function renderMessages(data) {
    const html = data.map((el, index) => {
        return(`<div>
            <p>${el.email}</p>
            <p>[${el.text}]:</p>
            <p>${el.date}</p> </div>`)
    }).join(" ");
    document.getElementById('texto').innerHTML = html;
}
  
function addMessage() {
    const mensaje = {
        author: document.getElementById('email').value,
        text: document.getElementById('text').value,
        date: `${(new Date).toLocaleDateString()} - ${(new Date).toLocaleTimeString()}`
    };  
    socket.emit('new-message', mensaje);
    return false;
}

socket.on('tabla', datos => {
    fetch('products.json')
        .then(response => response.json())
        .then(render(datos))
        .catch(error => console.log(error))
});
socket.on('messages', data => renderMessages(data))