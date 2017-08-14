// print log for promise that unhandle rejection
process.on('unhandledRejection', (e) => {
  console.log('unhandledRejection', e);
});

// require libs
require('./polifill')

//
var express = require('express')
var app = express()

var monitor = require('./monitor')

app.get('/*', function (req, res) {
  res.send('Hi there!')
})
app.listen(3000, function () {
  monitor();
})