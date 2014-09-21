// カメラで撮影してWiFi+HTTPサーバーで配信する
// 15秒間隔で撮影する

var tessel = require('tessel');
var http = require('http');
var camera = require('camera-vc0706').use(tessel.port['A']);
var image = null;

http.createServer(function(req, res){
  if(!image){
    res.writeHead(500);
    res.end('no capture image');
    return;
  }
  res.writeHead(200, {'Content-Type': 'image/jpeg'});
  res.end(image);
}).listen(80);
console.log('server start - PORT: 80');


// 解像度設定
camera.on('ready', function() {
  console.log('camera ready');
  camera.setResolution('qqvga', function(err, res){
    if(err) throw 'setting camera resolution failed!';
    camera.emit('ready:capture');
  });
});

// 撮影準備完了
camera.on('ready:capture', function(){
  console.log('camera ready:capture');
  camera.startCapture(function(err, res){
    if(err) return console.error(err);
    image = res;
    console.log('capture done');
  }, 15000); // 15 sec interval
});

// 定期的に撮影する
camera.startCapture = function(callback, interval){
  if(typeof interval !== 'number' || interval < 1){
    throw 'interval must be number (msec)';
  }
  camera.takePicture(function(err, res){
    if(typeof callback === 'function') callback(err, res);
    setTimeout(function(){
      camera.startCapture(callback, interval);
    }, interval);
  });
};
