const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');




app.get('/',function(req,res) {
    let options = {
        root : path.join(__dirname)
    }
    let filename = 'index.html'

    res.sendFile(filename,options);
})




const cnsp = io.of('/custom-namespaces')

const cnsp1 = io.of('/modified')

cnsp.on('connection',function(socket){
    console.log('a user connected')


    cnsp.emit('testCustomEvent', 'Tester event call')

    socket.on('disconnect',function() {
        console.log('a user disconnected')
    })
})


cnsp1.on('connection',function(socket) {
    console.log(' a user connected ')


    cnsp1.emit('testEvent2','a modified user connection')

    socket.on('disconnect', function() {
        console.log('a user disconnected')
    })
})

http.listen(8080, () =>{
    console.log('listening on port 8080');
})