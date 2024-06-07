const app = require('express')();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);


app.get('/',function(req,res){

    let options = {
        root : path.join(__dirname)
    }
    let filename = 'index.html';
    res.sendFile(filename,options);
})

io.on('connection',function(socket){
    console.log('a user connected');

    setTimeout(function(){
        socket.emit('myCustomEvent',{description: "A custom message from the sever side!"})
    },3000)


    // Events catching on server side
    socket.on('myCustomEvent2', function(data) {
        console.log(data.description);
    })

    socket.on('disconnect',function(){
        console.log('a user disconnected');
    });
})



http.listen(3000, function() {
    console.log('listening on port:3000');
})