import { Image } from '@prisma/client';
import { io } from '..';
import { Events } from '../config/websocket';

class ClientService {
    async broadcastImage(data: Image) {
        io.emit(Events.IMAGE_UPLOAD, data);
    }
}

export default new ClientService();
