const express = require('express');
const router = express.Router();
const { getAll, getGainers, getNew, create } = require('../controllers/cryptoController');

router.get('/gainers', getGainers);
router.get('/new', getNew);
router.get('/', getAll);
router.post('/', create);

module.exports = router;
