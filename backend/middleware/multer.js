import multer from 'multer';
import path from 'path';
import fs from 'fs';


const ensureDir = (dir) => {
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};


const storage = multer.diskStorage({
destination: (req, file, cb) => {
const isResume = req.baseUrl.includes('applications');
const dir = isResume ? 'uploads/resumes' : 'uploads/avatars';
ensureDir(dir);
cb(null, dir);
},
filename: (req, file, cb) => {
const ext = path.extname(file.originalname);
const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
cb(null, `${name}-${Date.now()}${ext}`);
}
});


export const upload = multer({
storage,
limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
fileFilter: (req, file, cb) => {
const allowed = [
'image/png', 'image/jpeg', 'image/jpg', 'application/pdf',
'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
if (allowed.includes(file.mimetype)) return cb(null, true);
cb(new Error('Unsupported file type'));
}
});