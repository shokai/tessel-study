var fs     = require('fs');
var tessel = require('tessel');
var wifi   = require('wifi-cc3000');

var streamBuffers = require('stream-buffers');
var Gyazo = require('gyazo-api');
var gyazo_token = process.argv[2];
var gyazo = new Gyazo(gyazo_token);

// var Yo = require('yo-api');
// var yo_token = process.argv[3];
// var yo = new Yo(yo_token);

var camera = require('camera-vc0706').use(tessel.port['A']);
var led_green = tessel.led[0].output(1);
setInterval(function(){
  if(wifi.isConnected()) led_green.toggle()
}, 500);

// 解像度設定
camera.on('ready', function() {
  console.log('camera ready');
  camera.setResolution('qqvga', function(err, res){
    if(err) throw 'setting camera resolution failed!';
    camera.emit('ready:capture');
  });
});

camera.on('ready:capture', function(){
  console.log('ready:capture');
  wifi.reset();
});

wifi.on('connect', function(){
  console.log('wifi connect');
  capture_gyazo_yo();
});

var capture_gyazo_yo = function(){
  camera.takePicture(function(err, picture){
    if(err){
      console.error(err);
      return;
    }
    console.log('upload size:'+picture.length);
    setTimeout(function(){
      console.log('upload start');
      gyazo.upload(picture)
      .then(function(res){
        console.log('upload success');
        console.log(res.data.image_id);
      })
      .catch(function(err){
        console.error(err.stack);
      });
    }, 10000);
  });
};
