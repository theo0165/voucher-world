import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import apiRouter from './router/api';
import webRouter from './router/web';
import path from 'path';

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/game', express.static(path.join(__dirname, 'game')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', webRouter);
app.use('/api', apiRouter);

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Listening on port ${process.env.PORT ?? 3000}`);
});
