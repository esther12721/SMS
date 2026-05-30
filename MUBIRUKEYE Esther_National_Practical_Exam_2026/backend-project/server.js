require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

/* =========================
   DATABASE
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch((err) => {
    console.error('❌ Mongo Error:', err.message);
  });

/* =========================
   ROUTES
========================= */

app.use('/api/auth', require('./routes/auth'));

app.use('/api/products', require('./routes/products'));

app.use('/api/warehouses', require('./routes/warehouses'));

app.use('/api/transactions', require('./routes/transactions'));

app.use('/api/reports', require('./routes/reports'));

/* =========================
   HOME ROUTE
========================= */

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 SMS API Running',
  });
});

/* =========================
   404 ROUTE
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message,
  });
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});