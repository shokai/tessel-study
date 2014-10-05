// カメラで撮影してWiFi+HTTPサーバーで配信する
// 15秒間隔で撮影する

var tessel = require('tessel');
var wifi   = require('wifi-cc3000');
var router = require('tiny-router');
var camera = require('camera-vc0706').use(tessel.port['A']);
var image = null;

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

// カメラの準備ができてからwifiを再起動
camera.on('ready:capture', function(){
  wifi.reset();
});

// wifiが接続してからhttpサーバー起動
wifi.on('connect', function(){
  console.log('wifi connect');
  var port = (process.env.PORT || 80) - 0;
  router.listen(port);
  console.log('start HTTP server at PORT: '+port);
});

router.get('/', function(req, res){
  console.log(req.method + ': ' + req.url);
  res.send('camera-server.js');
});

router.get('/camera.jpg', function(req, res){
  console.log(req.method + ': ' + req.url);
  if(!image){
    res.writeHead(500);
    res.end('no capture image');
    return;
  }
  res.sendImage(image);
});
