var LindaClient = require('linda').Client;
var socket = require('socket.io-client').connect('http://linda-server.herokuapp.com');

var linda = new LindaClient().connect(socket);
var ts = linda.tuplespace('tessel');

linda.io.on('connect', function(){
  console.log('connect!!!');

  ts.watch({}, function(err, tuple){
    console.log(tuple);
  });

});

setInterval(function(){
  ts.write({name: "tessel"});
}, 5000);
