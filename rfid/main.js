// 5cmぐらい離して、木の机などを間に挟んでも読み取れる
// mifareのNFCタグのIDmも読める
// 同時に1つのタグしか読めない

var tessel = require('tessel');
var rfid = require('rfid-pn532').use(tessel.port['A']);

var led_green = tessel.led[0].output(1);
setInterval(function(){
  led_green.toggle()
}, 500);

rfid.on('ready', function(){
  console.log('RFID ready!');

  rfid.on('data', function(data){
    console.log('UID:' + data.uid.toString('hex'));
    console.log(data);
  });
});
