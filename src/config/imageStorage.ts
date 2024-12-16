import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const storage = multer.memoryStorage();

const imageStorage = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|avif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

export const upload = imageStorage.single('file');
