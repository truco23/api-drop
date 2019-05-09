const express   = require('express');
const app       = express();
const path      = require('path');
const server    = require('http').Server(app);
const io        = require('socket.io')(server);
const cors      = require('cors');
const port      = process.env.PORT || 3001;
require('./src/config/database');

io.on('connection', socket => {

    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/file', express.static(path.resolve(__dirname, 'tmp')));
app.use(require('./src/routes/server.routes'));


server.listen(port, () => console.log('Servidor rodando em: http://localhost:3001'))