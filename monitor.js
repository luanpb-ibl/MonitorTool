var config = require('./config')
// implement socket here
var fullNodeSocket = require('socket.io-client')(config.fullnodeSocket);
var parserSocket = require('socket.io-client')(config.parserSocket);
var socketServerSocket = require('socket.io-client')(config.socketServer);
var etherCurrentBlockUrl = require('socket.io-client')(config.etherCurrentBlockUrl);

// monitor socket server   
socketServerSocket.on('connect', function(){
    console.log("socket conect server")
    // dang ky socket
   // socketServerSocket.emit('QNT');
    // cho nhan socket data
    socketServerSocket.emit('subscribe', 'new-block');  
    var tick=0;
    setInterval(function(){
        tick=tick+1;
    },1000)
    socketServerSocket.on('new-block', function(data){
        console.log('socketServerSocket receive data: ', data.number + " timestamp: " +data.timestamp + "time: " +tick +"s");
        tick=2;
      
    });

});
socketServerSocket.on('disconnect', function(){
    console.log('socketServerSocket disconnected');  
});

// monitor parser
// parserSocket.on('connect', function(){
//     // dang ky socket
//     parserSocket.emit('subscribe', 'new-block');
//     // cho nhan socket data
//     parserSocket.on('new-block', function(data){
//         console.log('parserSocket receive data: ', data);
//     });
// });
// parserSocket.on('disconnect', function(){
//     console.log('parserSocket disconnected');
// });

// monitor full node
// fullNodeSocket.on('connect', function(){
//     // dang ky socket
//     fullNodeSocket.emit('QNT');
//     // cho nhan socket data
//     fullNodeSocket.on('new-block', function(data){
//         console.log('parserSocket receive data: ', data);
//     });
// });
// fullNodeSocket.on('disconnect', function(){
//     console.log('parserSocket disconnected');
// });


// -----------------------
function start() {
    fetch('https://ropsten.etherscan.io/api?module=proxy&action=eth_blockNumber')
    .then(res=>res.json())
    .then(z=>{
        console.log(z)
    })
}
module.exports = start
