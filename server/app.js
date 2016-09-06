var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
require('./routes')(app);

app.use('/*', express.static('../app'));
app.listen(3000, function() {
  console.log('listening on port 3000');
});