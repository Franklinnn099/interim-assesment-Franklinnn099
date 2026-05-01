const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    symbol: { type: String, required: true, uppercase: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    // 24-hour price change percentage, e.g. +2.5 or -1.3
    change24h: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Crypto', cryptoSchema);
