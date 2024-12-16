import express, { Express } from 'express';
import { espRoutes } from './routes/espRoutes';
import path from 'path';
import cors from 'cors';
import { imagesRoutes } from './routes/imagesRoutes';
import { activationsRoutes } from './routes/activationsRoutes';

export const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/esp', espRoutes);
app.use('/images', imagesRoutes);
app.use('/activations', activationsRoutes);
app.use(
    '/uploads',
    express.static(path.join(__dirname, '../uploads'), {
        setHeaders: (res, path) => {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
    })
);
