import { WebSocketServer } from 'ws';

const wsServer = new WebSocketServer({ port: 8080 });
const users = new Set();

wsServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'newUser') {
            ws.name = data.name;
            users.add(ws.name);
            console.log(`User connected: ${ws.name}`);
            broadcastUserList();
            wsServer.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify({ type: 'info', message: `${ws.name} joined` }));
                }
            });
        } else if (data.type === 'message') {
            console.log(`Received message from ${ws.name}: ${data.message}`);
            wsServer.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify({ type: 'message', message: data.message, name: ws.name }));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected', ws.name);
        users.delete(ws.name);
        broadcastUserList();
        wsServer.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({ type: 'info', message: `${ws.name} logout` }));
            }
        });
    });

    function broadcastUserList() {
        const userList = Array.from(users);
        wsServer.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({ type: 'userList', users: userList }));
            }
        });
    }
});

console.log('WebSocket server is running on ws://localhost:8080');
