const SerialPort = require("serialport");

// Mensagem: "ID F000 [R000.000] [P000.000] T000.000"

const serial = {
  porta: "/dev/pts/2",
  velocidade: 19200
};

module.exports = function initSerial(callback) {
  const port = new SerialPort(
    serial.porta,
    { baudRate: serial.velocidade },
    err => !err || console.log("Error: ", err.message)
  );

  port.on("data", function(data) {
    console.log("MSG:", data);

    const messages = data
      .toString()
      .replace("\n", "")
      .split(" ");

    const times = [];

    messages.forEach(i => {
      if (i[0] === "T" || i[0] === "P") {
        times.push(i.slice(1, i.length));
      }
    });

    callback(times);
  });
};
