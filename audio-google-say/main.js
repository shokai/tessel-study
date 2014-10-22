var tessel = require('tessel');
var stream = require('stream');
var audio = require('audio-vs1053b').use(tessel.port['A']);
var textspeech = require('audio-vs1053b-textspeech').use(audio);

var led_green = tessel.led[0].output(1);
setInterval(function(){
  led_green.toggle()
}, 200);

audio.on('ready', function(){
  console.log('audio ready');
  audio.setVolume(20, function(err){
    if(err) return console.error(err);
    audio.emit('ready:volume');
  });
});

audio.on('ready:volume', function(){
  console.log('audio ready:volume');
  if(err) return console.error(err);
  setInterval(function(){
    textspeech.speech('うどん居酒屋 かずどん');
  }, 30*1000);
  textspeech.speech('焼肉ざんまい');
});
