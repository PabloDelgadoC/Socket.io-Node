const express = require('express');
const app = express();

//La variable server se la pasa a Socket.io para que entienda que va estar trabajando con sockets dentro de la conexion http que se genere por aqui
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/home', (req, res) => {
    res.status(200).send('HOLA MUNDO!');
});

const messages = [{
    id: 1,
    text: "Mensaje de prueba",
    nickname: "MrPenetroid"
}];

//Abriendo conexion al socket
//on permite lanzar eventos
io.on('connection', (socket) => {
    //Este evento se encarga de recibir las conexiones de los clientes
    console.log("El cliente/nodo con IP: "+socket.handshake.address+" se ha conectado...");//Desde aqui se puede detectar las ip de los clientes conectados

    socket.emit('messages',messages);

    socket.on('add-message', (data) => {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
}); 

server.listen(6677, () => {
    console.log('Servidor activo en http://localhost:6677');
}); //listen(puerto,callback)
