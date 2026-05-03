const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  tipe: {
    type: String,
    required: true,
    enum: ['pemasukan', 'pengeluaran']
  },
  nominal: {
    type: Number,
    required: true
  },
  keterangan: {
    type: String,
    required: true
  },
  buktiTransfer: {
    type: String,
    default: null
  },
  tanggal: {
    type: Date,
    default: Date.now
  }
});

transactionSchema.index({ tanggal: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);