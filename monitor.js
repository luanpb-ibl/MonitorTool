var config = require('./config')

// implement socket here
var fullNodeSocket = require('socket.io-client')('http://172.104.57.227:8545');
var parserSocket = require('socket.io-client')('http://172.104.57.227:8888');
var socketServerSocket = require('socket.io-client')('http://172.104.32.125:4002');

var eth_blockNumber = require('socket.io-client')('https://ropsten.etherscan.io/api?module=proxy&action=eth_blockNumber');

// monitor socket server   
socketServerSocket.on('connect', function(){
    console.log("socket conect server")
    // dang ky socket
    socketServerSocket.emit('QNT');
    // cho nhan socket data
    socketServerSocket.on('new-block', function(data){
        console.log('socketServerSocket receive data: ', data);
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
    console.log('monitor tool started')
    console.log(config)
    console.log(typeof Promise);
    fetch('https://ropsten.etherscan.io/api?module=proxy&action=eth_blockNumber')
    .then(res=>res.json())
    .then(z=>{
        console.log(z)
    })
}

module.exports = start