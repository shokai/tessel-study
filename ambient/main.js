var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['A']);

var led_green = tessel.led[0].output(true);
var led_blue  = tessel.led[1].output(true);

ambient.on('ready', function(){
  console.log('ambient-attx4 module ready!');

  var last_light = null;
  var last_sound = null;
  setInterval(function(){
    ambient.getLightLevel(function(err, light){
      if(err) return;
      console.log('light:'+light);
      if(last_light){
        if(last_light > light * 2) ambient.emit('light-down', light);
        else if(last_light * 2 < light) ambient.emit('light-up', light);
      }
      last_light = light;
    });
    ambient.getSoundLevel(function(err, sound){
      if(err) return;
      console.log('sound:'+sound);
      if(last_sound){
        if(last_sound > sound * 2) ambient.emit('sound-down', sound);
        else if(last_sound * 2 < sound) ambient.emit('sound-up', sound);
      }
      last_sound = sound;
    });
  }, 1000);

});

ambient.on('light-up', function(light){
  led_green.write(true);
  console.log('light up('+light+')');
});

ambient.on('light-down', function(light){
  led_green.write(false);
  console.log('light down('+light+')');
});

ambient.on('sound-up', function(sound){
  led_blue.write(true);
  console.log('sound up('+sound+')');
});

ambient.on('sound-down', function(sound){
  led_blue.write(false);
  console.log('sound down('+sound+')');
});
