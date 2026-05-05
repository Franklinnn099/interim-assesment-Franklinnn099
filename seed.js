const mongoose = require('mongoose');
require('dotenv').config();

const Crypto = require('./models/Crypto');

const cryptos = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 865000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    change24h: 2.5,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 45000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    change24h: 1.8,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 2200,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    change24h: 5.3,
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    price: 9500,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    change24h: -1.2,
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 380,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    change24h: 3.1,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 65,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    change24h: -0.8,
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 24,
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    change24h: 7.2,
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    price: 120,
    image: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png',
    change24h: 4.6,
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 1800,
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    change24h: -2.1,
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 950,
    image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    change24h: 6.4,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Crypto.deleteMany({});
    await Crypto.insertMany(cryptos);
    console.log(`Seeded ${cryptos.length} cryptocurrencies`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });
