var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on("connection", function(socket) {
    console.log("alguien se unio")
    
    socket.on("username", function(username) {
      console.log("==>",username)
      socket.username = username;
      io.emit("is_online", "🔵 <i>" + socket.username + " se une al chat..</i>");
    });
  
    socket.on("disconnect", function(username) {
      console.log("alguien se desconecto")
      io.emit(
        "is_online",
        "🔴 <i>" + socket.username + " ha dejado el chat ..</i>"
      );
    });
  
    socket.on("chat_message", function(message) {
      console.log("Menssage: ",message)
      io.emit(
        "chat_message",
        {name:socket.username,message:message}
      );
    });
    
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});