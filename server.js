const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index.html');
});

io.on('connection', (socket) => {
  console.log(`socket conectado ${socket.id}`);
  socket.on('sendMessage', data => {
      console.log(data);
      socket.broadcast.emit('receivedMessage', data);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
