var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['B']);
var audio = require('audio-vs1053b').use(tessel.port['A']);
var textspeech = require('audio-vs1053b-textspeech').use(audio);
var led_green = tessel.led[0].output(true);

audio.on('ready', function(){
  audio.setVolume(20, function(err){
    console.log('audio setup');
  });
});

var last_light = null;
var checkLight = function(){
  ambient.getLightLevel(function(err, light){
    if(err) return;
    console.log('light:'+light);
    if(last_light){
      if(last_light > light * 2) ambient.emit('light-down', light);
      else if(last_light * 2 < light) ambient.emit('light-up', light);
    }
    last_light = light;
    setTimeout(checkLight, 1000);
  });
};

ambient.on('ready', function(){
  console.log('ambient-attx4 module ready!');
  checkLight();
});

ambient.on('light-up', function(light){
  led_green.write(true);
  console.log('light up('+light+')');
  textspeech.speech('電気ついた');
});

ambient.on('light-down', function(light){
  led_green.write(false);
  console.log('light down('+light+')');
  textspeech.speech('電気消えた');
});
