var tessel = require('tessel');
var fs = require('fs');
var audio = require('audio-vs1053b').use(tessel.port['A']);

audio.on('ready', function(){
  console.log('audio ready');
  audio.setVolume(20, function(err){
    if(err) return console.error(err);
    var data = fs.readFileSync('cabbage.mp3');
    setInterval(function(){
      audio.play(data, function(err){
        if(err) return console.error(err);
        console.log('audio done');
      });
    }, 2000);
  });
});
