const app = require('express')();
const http = require('http').Server(app);
const io  = require('socket.io')(http);
const path = require('path');

app.get('/',(req,res) =>{
    let options = {
        root : path.join(__dirname)
    }
    let fileName = 'index.html';

    res.sendFile(fileName,options);
})

io.on('connection',(socket) =>{
    console.log('a user connected')


    socket.on('disconnect', () =>{
        console.log('a use disconnected')
    })
})


http.listen(8080, () =>{
    console.log(`The server is listening on port 8080`)
})