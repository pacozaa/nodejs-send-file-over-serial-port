var serialport = require('serialport');
var SerialPort = serialport.SerialPort; // localize object constructor
var chunks = [];

serialPort = new SerialPort('COM5', {
  baudrate: 1200,
  parser: serialport.parsers.raw,
});
var fs = require('fs');
serialPort.on('open', function () {
  console.log('open');
  serialPort.on('data', function(data) {
    if(data.indexOf("close") > 0){
      const file =  Buffer.concat(chunks);
      console.log(file.length);
      fs.writeFile('1', file ,'binary', function(err) {
          if(err) {
              return console.log('file save error : ',err);
          }
      });
    }
    else {
     chunks.push(data);
    }
  });
});

serialPort.on('error', function() {
  console.log('error');
});
