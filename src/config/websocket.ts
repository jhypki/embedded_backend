import { Server, Socket } from 'socket.io';
import http from 'http';

export const Events = {
    IMAGE_UPLOAD: 'image-upload',
    ALARM_TRIGGERED: 'alarm-triggered'
};

export const initWebSocket = (server: http.Server) => {
    const io = new Server(server);

    io.on('connection', (socket: Socket) => {
        console.log('Client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

export const broadcastToClients = (io: Server, data: any) => {
    io.emit('broadcast-event', data);
};
