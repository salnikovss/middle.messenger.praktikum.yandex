import log from './log';

export default function openWebSocketConnection(wsUrl: string): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);

    socket.addEventListener('open', () => {
      log('WS Connection established');

      setInterval(() => {
        websocketPing(socket);
      }, 10000);

      resolve(socket);
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        log('WS The connection is closed clean');
      } else {
        log('WS Broken connection');
      }

      log(`WS Code: ${event.code} | Reason: ${event.reason}`);
    });

    socket.addEventListener('error', (ev) => {
      if (ev instanceof Error) {
        log('WS Error', ev.message);
      }
      reject(ev);
    });
  });
}

function websocketPing(socket: WebSocket) {
  if (socket && socket.readyState === 1) {
    socket.send(JSON.stringify({ type: 'ping' }));
  }
}
