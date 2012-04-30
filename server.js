var app = require('express').createServer();

app.get('/', function(req, res){
  res.send('Powered by OpDemand');
});

var port = process.env.PORT
app.listen(port);

console.log('Server listening on port %d in %s mode', app.address().port, app.settings.env);
