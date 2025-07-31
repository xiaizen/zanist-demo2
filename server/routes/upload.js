const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { requireModerator } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload single image
router.post('/image', requireModerator, upload.single('image'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      url: fileUrl,
      fullUrl: `${req.protocol}://${req.get('host')}${fileUrl}`
    }
  });
}));

// Upload multiple images
router.post('/images', requireModerator, upload.array('images', 10), asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const files = req.files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    url: `/uploads/${file.filename}`,
    fullUrl: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
  }));

  res.json({
    message: 'Files uploaded successfully',
    files
  });
}));

// Get uploaded files list (moderator only)
router.get('/files', requireModerator, asyncHandler(async (req, res) => {
  const uploadsDir = path.join(__dirname, '../../uploads');
  
  try {
    const files = await fs.readdir(uploadsDir);
    const fileStats = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(uploadsDir, filename);
        const stats = await fs.stat(filePath);
        return {
          filename,
          size: stats.size,
          created: stats.birthtime,
          url: `/uploads/${filename}`,
          fullUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`
        };
      })
    );

    res.json({
      files: fileStats.sort((a, b) => new Date(b.created) - new Date(a.created))
    });
  } catch (error) {
    res.json({ files: [] });
  }
}));

// Delete uploaded file (moderator only)
router.delete('/files/:filename', requireModerator, asyncHandler(async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../../uploads', filename);

  try {
    await fs.unlink(filePath);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: 'File not found' });
    }
    throw error;
  }
}));

// Serve uploaded files
router.use('/files', express.static(path.join(__dirname, '../../uploads')));

module.exports = router;