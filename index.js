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
  console.log('Example app listening on port 3000!')
  monitor();
})