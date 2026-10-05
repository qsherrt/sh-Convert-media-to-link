const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeName = Date.now() + '-' + (Math.random().toString(36).slice(2,8)) + path.extname(file.originalname);
    cb(null, safeName);
  }
});
const upload = multer({ storage, limits: { fileSize: 200 * 1024 * 1024 } }); // 限制 200MB

const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // 可放前端页面
app.use('/uploads', express.static(UPLOAD_DIR, { index: false }));

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: '没有接收到文件' });
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(req.file.filename)}`;
  res.json({ url: fileUrl, name: req.file.originalname, size: req.file.size });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
