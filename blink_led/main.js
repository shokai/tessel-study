var tessel = require('tessel');

var led_a = tessel.led[0].output(1);
var led_b = tessel.led[1].output(0);

setInterval(function(){
  led_a.toggle();
  led_b.toggle();
}, 100);
