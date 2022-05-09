import { config } from 'dotenv';
config({ path: '../../.env' });

import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import router from './router/api';
import path from 'path';

const app: express.Application = express();
const server = createServer(app);

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log(socket);
  console.log('user connected');
});

server.listen(process.env.PORT ?? 3005, () => {
  console.log(`Listening on port ${process.env.PORT ?? 3005}`);
});
