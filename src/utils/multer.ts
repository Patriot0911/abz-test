import fs from 'node:fs/promises';
import multer from 'multer';
import tinify from 'tinify';
import path from 'path';
import { __dirname } from '../constants';

tinify.key = process.env.TINY_KEY as string;

export const toTinyFile = (file: Express.Multer.File) => {
    const source = tinify.fromFile(file.path);
    const resized = source.resize({
        method: "fit",
        width: 70,
        height: 70,
    });
    resized.toFile(file.path);
};
const dStorage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            if(!file)
                return;
            cb(null, path.join(__dirname, '/assets'));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + `${file.filename}.jpg`);
        },
    },
);

export const fileSize = 1024 * 1024 * 5;

export const upload = multer({
    storage: dStorage,
    limits: {
        fileSize,
    },
});

export const deleteFile = async(file: Express.Multer.File) => {
    try {
        await fs.unlink(file.path);
        return {
            success: true,
        };
    } catch(e) {
        return {
            success: false,
        };
    };
};

export const fileTypes = [
    "image/jpeg",
    "image/jpg",
];
