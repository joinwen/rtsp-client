const net = require("net");
const checkPort = (port) => {
  let server = net.createServer();
  server.listen(port);
  return new Promise((resolve, reject) => {
    server.once("error", () => {
      reject(false);
    });
    server.once("listening", () => {
      server.close();
      resolve(true);
    });
  });
};
module.exports = {
  checkPort
};
