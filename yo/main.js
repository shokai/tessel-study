var tessel = require('tessel');
var wifi   = require('wifi-cc3000');
var Yo     = require('yo-api');

var yo_token = process.argv[2];
var yo = new Yo(yo_token);

var led_green = tessel.led[0].output(1);
setInterval(function(){
  if(wifi.isConnected()) led_green.toggle()
}, 500);

// wifiを再起動
wifi.reset();

wifi.on('connect', function(){
  console.log('wifi connect');
  yo.yo('SHOKAI', function(err, res, body){
    console.log(err);
    console.log(body.toString());
  });
});

