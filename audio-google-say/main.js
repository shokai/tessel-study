var tessel = require('tessel');
var fs = require('fs');
var request = require('request');
var wifi   = require('wifi-cc3000');
var audio = require('audio-vs1053b').use(tessel.port['A']);

var led_green = tessel.led[0].output(1);
setInterval(function(){
  led_green.toggle()
}, 200);

var getAudioStream = module.exports = function(speech_text){
  return request.get({
    uri: 'http://translate.google.com/translate_tts',
    qs: {
      q: speech_text,
      tl: 'ja'
    },
    headers: {
      'User-Agent': 'Safari/1.0'
    }
  });
};

var say = function(speech_text){
  console.log('say:'+speech_text);
  getAudioStream(speech_text).pipe(audio.createPlayStream());
};

audio.on('ready', function(){
  console.log('audio ready');
  audio.setVolume(20, function(err){
    if(err) return console.error(err);
    audio.emit('ready:volume');
  });
});

audio.on('ready:volume', function(){
  console.log('audio ready:volume');
  wifi.reset();
});

wifi.on('connect', function(){
  console.log('wifi connect');
  if(err) return console.error(err);
  setInterval(function(){
    say('ざんまい');
  }, 30*1000);
  say('かずどん');
});
