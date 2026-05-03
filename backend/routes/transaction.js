const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bukti_transfer',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ tanggal: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', upload.single('buktiTransfer'), async (req, res) => {
  try {
    const { tipe, nominal, keterangan } = req.body;
    let buktiTransfer = null;
    
    if (req.file) {
      buktiTransfer = req.file.path;
    }
    
    const newTransaction = new Transaction({
      tipe: tipe ? tipe.toLowerCase() : '',
      nominal: Number(nominal),
      keterangan,
      buktiTransfer
    });
    
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
