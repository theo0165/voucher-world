import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './router/api';
import path from 'path';

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Listening on port ${process.env.PORT ?? 3000}`);
});
