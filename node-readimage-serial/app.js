var serialport = require('serialport');
var SerialPort = serialport.SerialPort; // localize object constructor
var chunks = [];
var count = 0;
serialPort = new SerialPort('COM5', {
  baudrate: 1200,
  parser: serialport.parsers.raw,
});
var fs = require('fs');
serialPort.on('open', function () {
  console.log('open');
  serialPort.on('data', function(data) {
    count += data.length;
    if(data.indexOf('close') > 0){
      const file =  Buffer.concat(chunks);
      console.log(file.length);
      console.log('\u0007');
      fs.writeFile('1_4.jpg', file ,'binary', function(err) {
          if(err) {
              return console.log('file save error : ',err);
          }
      });
    }
    else {
     chunks.push(data);
    }
    console.log(count);
  });
});

serialPort.on('error', function() {
  console.log('error');
});
