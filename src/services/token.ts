import { ITokenPayLoad } from "@/utils/interfaces";
import jwt from 'jsonwebtoken';
import dbServices from "./db";

export const TOKEN_SECRET = process.env.TOKEN_SECRET ?? '75d62d7dde57baedd70d8cd1588f53adc189a352f5ca36fb1703c45133e1c9611316e075c00e3e1ac4029919274e63161335778d05702b43aade5c86952534df';

const tokenManager = {
    create: async () => {
        const { data, message } = await dbServices.token.create();
        if(message || !data)
            return {
                success: false,
                message: message ?? 'Internal Error',
            };
        const expires = {
            expiresIn: '40m',
        };
        const content: ITokenPayLoad = {
            ...data,
        };
        const token = jwt.sign(content, TOKEN_SECRET, expires);
        return {
            success: true,
            token,
        };
    },
};

export default tokenManager;
