var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
serialPort = new SerialPort("COM7", {
  baudrate: 9600,
  parser: serialport.parsers.readline("close")
});
var fs = require('fs');
serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ',data);
    fs.writeFile('test.txt', data, function(err) {
        if(err) {
            return console.log('file save error : ',err);
        }
        console.log("The file was saved!");
    });
  });
});
