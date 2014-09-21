var http = require('http');

var server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end('<h1>Hello!!</h1>');
});

var port = 80;
server.listen(port);
console.log('server start at PORT:'+port);
