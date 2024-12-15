import express, { Express } from 'express';
import { espRoutes } from './routes/espRoutes';
import path from 'path';
import cors from 'cors';

export const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/esp', espRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
