let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));

app.post('/sendbug', function(req, res){
  console.log('recieved request');
  console.log(req.body);
  res.json(req.body);
});

app.listen(3000);
