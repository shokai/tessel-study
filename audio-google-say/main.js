var tessel = require('tessel');
var fs = require('fs');
var request = require('request');
var audio = require('audio-vs1053b').use(tessel.port['A']);

var led_green = tessel.led[0].output(1);
setInterval(function(){
  led_green.toggle()
}, 500);

var getAudio = module.exports = function(speech){
  return request.get({
    uri: 'http://translate.google.com/translate_tts',
    qs: {
      q: speech,
      tl: 'ja'
    },
    headers: {
      'User-Agent': 'Safari/1.0'
    }
  })
};


audio.on('ready', function(){
  console.log('audio ready');
  audio.setVolume(20, function(err){
    if(err) return console.error(err);
    getAudio('ぺーろぺろ').pipe(audio.createPlayStream());
  });
});
