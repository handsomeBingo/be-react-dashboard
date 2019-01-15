let express = require('express');
let cookieParser = require('cookie-parser');
let cookieSession = require('cookie-session');
let bodyParser = require('body-parser');
let routes = require('./routers');

var app = express();

app.use(express.static('./views'));
app.use(cookieParser());

app.use(bodyParser.json({extended: true}));
app.use(cookieSession({
  secret: 'games',
  signed: true
}));

app.use(routes);
app.listen(8082, function () {
  console.log('port 8082 is on listening')
})
