import { fileURLToPath } from 'url';
import { dirname } from 'node:path';
import fs from 'node:fs/promises';
import multer from 'multer';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dStorage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../assets'));
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
