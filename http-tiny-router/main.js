var tessel = require('tessel');
var wifi   = require('wifi-cc3000');
var router = require('tiny-router');

var led_green = tessel.led[0].output(1);
setInterval(function(){
  if(wifi.isConnected()){
    led_green.toggle()
  }
}, 500);

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

wifi.on('connect', function(){
  console.log('wifi connect!!');
  var port = (process.env.PORT || 80) - 0;
  router.listen(port);
  console.log('start HTTP server at PORT: '+port);
});
wifi.reset();
