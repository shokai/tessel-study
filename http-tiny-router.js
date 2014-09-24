var router = require('tiny-router');

router.get('/', function(req, res){
  console.log(req.method + ': ' + req.url);
  res.send('index page');
});

router.get('/hello', function(req, res){
  console.log(req.method + ': ' + req.url);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hello');
});

router.get('/hello/{arg}', function(req, res){
  console.log(req.method + ': ' + req.url);
  res.send('hello ' + req.body.arg);
});

var port = (process.env.PORT || 80) - 0;
router.listen(port);
console.log('start server at PORT: '+port);
