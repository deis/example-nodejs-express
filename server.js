var app = require('express').createServer();

app.get('/', function(req, res){
  res.send('Powered by OpDemand');
});

/* Use PORT environment variable if it exists */
var port = process.env.PORT || 3000;
app.listen(port);

console.log('Server listening on port %d in %s mode', app.address().port, app.settings.env);

/* test2 */
