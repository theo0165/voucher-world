import { config } from 'dotenv';

if (process.env.NODE_ENV) {
  config();
} else {
  config({ path: '../../.env' });
}

import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import router from './router/api';
import path from 'path';
import events from './events';

const app: express.Application = express();
const server = createServer(app);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
  },
});

io.on('connection', (socket) => {
  console.log('user connected');

  events(socket, io);
});

server.listen(process.env.PORT ?? 3005, () => {
  console.log(`Listening on port ${process.env.PORT ?? 3005}`);
});
