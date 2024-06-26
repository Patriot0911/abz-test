import { userRouter, tokenRouter, positionsRouter } from '@/routes';
import { __dirname } from '@/constants';
import express from 'express';
import env from 'dotenv';
import cors from 'cors';

env.config();
const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(express.json());
app.use(cors());

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
        console.log(__dirname)
    },
);