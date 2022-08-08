const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const router = require("./src/Routes/routes.js");
const datos = require("./src/Products/products.js").list();
const messages = require("./public/messages.json");
const messagesActions = require("./src/Controller/msgController").MessagesActions;

// middlewares
app.set('views', 'public');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', router)
app.use('/message', router)
app.get('/', (req, res) => {
    res.render('index', {datos});
})

io.on('connection', socket => {
    console.log('Cliente conectado')
    socket.emit('tabla', datos);
    socket.on('disconnect', () => console.log('Cliente desconectado'))
});
io.on('connection',socket => {
    socket.emit('messages', messages);
    socket.on('new-message', (data) => {
        messagesActions.add(data);
        io.sockets.emit('messages', messages);
  });
});

httpServer.listen(8080, () => {
  console.log("Server on port 8080");
});
