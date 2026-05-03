require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transaction');

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL || '*' : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
  } catch (err) {
    console.error(err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use('/transactions', transactionRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {});
}

module.exports = app;