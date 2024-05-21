import { userRouter, tokenRouter, positionsRouter } from '@/routes';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import env from 'dotenv';

env.config();
const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/assets', express.static(__dirname + '/assets'));

app.use('/api/users', userRouter);
app.use('/api/token', tokenRouter);
app.use('/api/positions', positionsRouter);

app.listen(
    PORT,
    () => {
        const ip = `127.0.0.1:${PORT}`;
        console.log(
            `Listening to ${ip} // http://${ip}/`
        );
    },
);