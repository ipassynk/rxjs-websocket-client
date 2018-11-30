const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7777 });

wss.on('connection', function connection(ws) {
  let count = 0;
  ws.on('message', function incoming(message) {
    if (count === 10) {
      ws.terminate();
    } else {
      ws.send(message);
      count++;
    }
  });
});
