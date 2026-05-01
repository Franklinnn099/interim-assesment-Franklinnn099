const Crypto = require('../models/Crypto');

exports.getAll = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json(cryptos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } }).sort({ change24h: -1 });
    res.json(gainers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getNew = async (req, res) => {
  try {
    const newest = await Crypto.find().sort({ createdAt: -1 });
    res.json(newest);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.create = async (req, res) => {
  const { name, symbol, price, image, change24h } = req.body;

  if (!name || !symbol || price == null || !image || change24h == null) {
    return res.status(400).json({
      message: 'All fields are required: name, symbol, price, image, change24h',
    });
  }

  try {
    const crypto = await Crypto.create({ name, symbol, price, image, change24h });
    res.status(201).json({ message: 'Cryptocurrency added successfully', crypto });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
