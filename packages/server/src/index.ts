import express, { json } from 'express';
import cors from 'cors';

import './database/connections';
import 'reflect-metadata';

import routes from './routes';

const app = express();

app.use(cors());
app.use(json())
app.use(routes);

app.listen(3333, () => {
    console.log('Server running')
})