const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = 8080;

app.use(express.static(__dirname + "/"));

const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
  ws.on("message", (data, isBinary) => {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${server.address().port}`);
});
