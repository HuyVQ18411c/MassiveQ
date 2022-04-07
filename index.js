const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const logger = require("./modules/logger");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/"));

const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
  ws.on("message", (data, isBinary) => {
    var rawData = JSON.parse(data);
    if (rawData.type === "message") {
      logger.info(
        `${rawData.owner} (${rawData.type}) sent: ${rawData.message}`
      );
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.on("error", (ws, err) => {
    logger.error(err);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${server.address().port}`);
});
