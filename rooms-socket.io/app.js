const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path  = require('path')

app.get('/',(req,res) =>{
    let options = {
        root : path.join(__dirname)
    }
    let fileName = "index.html";

    res.sendFile(fileName, options);
})

let roomno = 1;
let full = 0;

io.on('connection',(socket) =>{
    console.log('a user connected')

    socket.join('room-' + roomno)
    io.sockets.in("room-" + roomno).emit('connectedRoom',"You are connected to room no." + roomno)
    full++;
    if(full>=2){
        full = 0;
        roomno++;
    }

    socket.on('disconnect',() =>{
        console.log('a user disconnected')
    })
})


http.listen(8080,() =>{
    console.log(`the server listening on port 8080`)
})