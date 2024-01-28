import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve(), 'src', 'assets', 'images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        // console.log('file:', file);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// function uploadFile(req, res, next) {
//     const test = upload.single('imageUrl');

//     test(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             // A Multer error occurred when uploading.
//             console.log('********multer error', err)
//         } else if (err) {
//             // An unknown error occurred when uploading.
//             console.log('*****common error', err);
//         }
//         // Everything went fine. 
//         next()
//     })
// }

export default upload;