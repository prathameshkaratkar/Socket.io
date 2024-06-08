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

let users = 0;


io.on('connection',function(socket){
    console.log('a user connected');
    users++;
    // io.sockets.emit('broadcast',{message: users + "users connected"})  // for all users showing messages

    socket.emit('newuserconnect',{message: " Hi, Welcome Dear"});   // for users who are connected 
    socket.broadcast.emit('newuserconnect',{message: users + "users connected"});   // showing all users except those who are run as a user




    // setTimeout(function(){
    //     socket.emit('myCustomEvent',{description: "A custom message from the sever side!"})
    // },3000)


    // // Events catching on server side
    // socket.on('myCustomEvent2', function(data) {
    //     console.log(data.description);
    // })

    socket.on('disconnect',function(){
        console.log('a user disconnected');
        users--;
        //io.sockets.emit('broadcast',{message: users + ' users connected!'})
        io.socket.emit('broadcast',{message: users + " users connected!"})
    });
})



http.listen(3000, function() {
    console.log('listening on port:3000');
})