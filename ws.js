const { createServer } = require("https");
const { WebSocketServer } = require("ws");
const fs = require("fs");

const options = {
  key: fs.readFileSync("D:/nginx-1.16.1/rsa/server-key.pem"),
  cert: fs.readFileSync("D:/nginx-1.16.1/rsa/server-cert.pem"),
  ca: fs.readFileSync("D:/nginx-1.16.1/rsa/ca.pem")
};
const server = createServer(options);    // placed options as parameter to support https

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", function connection(ws, request, client) {
  ws.on("message", function message(data) {
    console.log(`Received message ${data} from user ${client}`);
  });
});

server.on("upgrade", function upgrade(request, socket, head) {
  // This function is not defined on purpose. Implement it with your own logic.
  authenticate(request, function next(err, client) {
    if (err || !client) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request, client);
    });
  });
});

// Here is my authentication
const authenticate = (request, next) => {
  if(request.headers["Token"]) {
    // upgrade http/1.1 to websocket
    next(null, request.remoteAddress);
  } else {
    // reject upgrade http/1.1 to websocket
    next("Token error", request.remoteAddress);
  }
};
server.listen(23445);
