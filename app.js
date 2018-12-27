var express = require('express')

var app = express();
app.use(express.static('./views'))

console.log(__dirname)
console.log('hahah')
app.listen(8082, function () {
  console.log('port 8082 is on listening')
})
