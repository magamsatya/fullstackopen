const express = require('express');
const router = express.Router();

const configs = require('../util/config');
const { getAsync } = require('../redis');

/* GET statistics */
router.get('/', async (_req, res) => {
  const currentInt = parseInt(await getAsync(configs.REDIS_ADDED_TODOS_KEY));
  const value = isNaN(currentInt) ? 0 : currentInt;
  res.send({
    'added_todos': value
  });
});

module.exports = router;
