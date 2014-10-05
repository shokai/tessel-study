var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);

var led_green = tessel.led[0];

camera.on('ready', function() {
  camera.setResolution('vga', function(err, res){
    if(err) throw 'setting camera resolution failed!';
    camera.emit('ready:capture');
  });
});

camera.on('ready:capture', function(){
  led_green.high();

  camera.takePicture(function(err, image) {
    if(err){
      console.log('error taking image', err);
      return;
    }

    led_green.low();
    var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
    console.log('Picture saving as', name, '...');
    process.sendfile(name, image);
    console.log('done.');
    camera.disable();
  });
});

camera.on('error', function(err){
  console.error(err);
});
