import http from 'http';
import { app } from './app';
import { initWebSocket } from './config/websocket';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
export const io = initWebSocket(server);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
