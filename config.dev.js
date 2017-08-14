var config = {
    fullnodeSocket: 'http://172.104.57.227:8545/',
    parserSocket: 'http://172.104.57.227:8888/',
    socketServer: 'http://172.104.32.125:4002/',
    etherCurrentBlockUrl: 'https://ropsten.etherscan.io/api?module=proxy&action=eth_blockNumber',

    smtpConfig: {
        host: "smtp.gmail.com",
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
            user: "mrdamtn1@gmail.com",
            pass: "damyur!123",
            name: "Monitoring tool report",
        }
    },
    adminEmail: 'luanpb@blockchainlabs.asia'
};
module.exports = config;