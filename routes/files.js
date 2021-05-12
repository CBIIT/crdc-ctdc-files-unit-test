const express = require('express');
const router = express.Router();
const config = require('../config');
const getURL = require('../connectors');
console.log(config);

/* GET ping-ping for health checking. */
router.get('/ping', function(req, res, next) {
  res.send(`pong`);
});

/* GET version for health checking and version checking. */
router.get('/version', function(req, res, next) {
  res.json({
    version: config.version,
    date: config.date
  });
});


/* GET file's location based on fileId. */
router.get('/:fileId', async function(req, res, next) {
  const fileId = req.params.fileId;
  try {
    res.send(await getURL(fileId));
  } catch (e) {
    console.error(e);
    let status = 400;
    if (e.statusCode) {
      status = e.statusCode;
    }
    let message = `Error retrieving data for ${fileId}`
    if (e.message) {
      message = e.message;
    }
    res.status(status).send(message);
  }
});

module.exports = router;
