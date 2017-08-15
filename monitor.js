var Web3 = require('web3');

var sendEmail = require('./mail');



var config = require('./config')
var configURLs = require('./config').ROPSTEN_TESTNET; //testnest
// implement socket here
//var fullNodeSocket = require('socket.io-client')(configURLs.fullnodeSocket);
var web3 = new Web3(new Web3.providers.HttpProvider(configURLs.fullnodeSocket));
var parserSocket = require('socket.io-client')(configURLs.parserSocket);
var socketServerSocket = require('socket.io-client')(configURLs.socketServer);

var fullNodeBlock = null; // number
var parserBlock = null; // number
var socketBlock = null; // number

var fullNodeTimestamp = null; // timestamp in milisecond
var parserTimestamp = null; // timestamp in milisecond
var socketTimestamp = null; // timestamp in milisecond

var expectedTimestamp = 5 * 60 * 1000; // timestamp in milisecond 5 minus

var ethRequestTime = 10 * 1000; // timestamp in milisecond

// monitor socket server   
socketServerSocket.on('connect', function () {
    console.log("socket conect server")
    // dang ky socket
    socketServerSocket.emit('subscribe', 'new-block');
    // cho nhan socket data
    socketServerSocket.on('new-block', function (data) {
        if (data && data.number) {
            var num = (typeof data.number === 'string' && data.number.slice(0, 2) === '0x' ? parseInt(data.number.toString(16)) : parseInt(data.number));
            if (!isNaN(num) && num > 0) {
                socketBlock = num;
                socketTimestamp = (new Date().getTime());
                console.log('==============================================================================');
                console.log('[DEBUG] socketBlock: ', socketBlock);
                console.log('[DEBUG] socketTimestamp: ', new Date(socketTimestamp));
            }
        }
    })

});


socketServerSocket.on('disconnect', function () {
    console.log('socketServerSocket disconnected');
});

// monitor parser
parserSocket.on('connect', function () {
    // dang ky socket
    parserSocket.emit('subscribe', 'new-block');
    // cho nhan socket data
    parserSocket.on('new-block', function (data) {
        if (data && data.number) {
            var num = (typeof data.number === 'string' && data.number.slice(0, 2) === '0x' ? parseInt(data.number.toString(16)) : parseInt(data.number));
            if (!isNaN(num) && num > 0) {
                parserBlock = num;
                parserTimestamp = (new Date().getTime());
                console.log('==============================================================================');
                console.log('[DEBUG] parserBlock: ', parserBlock);
                console.log('[DEBUG] parserTimestamp: ', new Date(parserTimestamp));
            }
        }
    });
});
parserSocket.on('disconnect', function () {
    console.log('parserSocket disconnected');
});

// monitor full node
//can be 'latest' or 'pending'
var filter = web3.eth.filter({
    fromBlock: 'latest',
    toBlock: 'latest',
});
//watch for changes
filter.watch(function (error, result) {
    console.log('error from full-node: ', error);
    if (!error && result && result.blockNumber) {
        var num = (typeof result.blockNumber === 'string' && result.blockNumber.slice(0, 2) === '0x' ? parseInt(result.blockNumber.toString(16)) : parseInt(result.blockNumber));
        if (!isNaN(num) && num > 0) {
            fullNodeBlock = num;
            fullNodeTimestamp = (new Date().getTime());
            console.log('==============================================================================');
            console.log('[DEBUG] fullNodeBlock: ', fullNodeBlock);
            console.log('[DEBUG] fullNodeTimestamp: ', new Date(fullNodeTimestamp));
        }
    }
});

// request Etherscan
function startETH() {
    setInterval(function () {
        fetch(configURLs.etherCurrentBlockUrl)
            .then(res => res.json())
            .then(data => {
                console.log('[DEBUG] fetch data: ', data);
                if (data && data.result) {
                    var num = (typeof data.result === 'string' && data.result.slice(0, 2) === '0x' ? parseInt(data.result.toString(16)) : parseInt(data.result));
                    if (!isNaN(num) && num > 0) {
                        var ethTimestamp = (new Date().getTime());
                        console.log('==============================================================================');
                        console.log('[DEBUG] ethBlock: ', num);
                        console.log('[DEBUG] ethTimestamp: ', new Date(ethTimestamp));

                        var activeSendMail = function (subject, content) {
                            sendEmail(config.adminEmail, subject, content, function (sErr, sResult) {
                                console.log('==============================================================================');
                                console.log('[DEBUG] send email error: ', sErr);
                                console.log('[DEBUG] send email result: ', sResult);
                            });
                        }
                        // check compare to full-node
                        if (fullNodeBlock !== null && num > fullNodeBlock && ethTimestamp - expectedTimestamp > fullNodeTimestamp) {
                            // send email to notify that fullnode delay
                            console.log('==============================================================================');
                            console.log('[DEBUG] send email to notify that fullnode delay ');
                            activeSendMail("fullnodeError", "Fullnode error");
                        }

                        // check compare to parser
                        if (parserBlock !== null && num > parserBlock && ethTimestamp - expectedTimestamp > parserTimestamp) {
                            // send email to notify that parser delay
                            console.log('==============================================================================');
                            console.log('[DEBUG] send email to notify that parser delay ');
                            activeSendMail("parserBlockError", "parserBlock error");
                        }

                        // check compare to socket
                        if (socketBlock !== null && num > socketBlock && ethTimestamp - expectedTimestamp > socketTimestamp) {
                            // send email to notify that socket server delay
                            console.log('==============================================================================');
                            console.log('[DEBUG] send email to notify that socket server delay ');
                            activeSendMail("socketBlockError", "socketBlock error");
                        }
                    }
                }
            })
    }, ethRequestTime)
}
// -----------------------
function start() {
    startETH();
}
// -----------------------
module.exports = start;