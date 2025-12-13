const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = 0;

wss.on('connection', ws => {
  clients++;
  broadcast({ type: 'count', count: clients });

  ws.on('close', () => {
    clients--;
    broadcast({ type: 'count', count: clients });
  });
});

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
