var express = require('express');
var router = express.Router();

/* GET ping-ping for health checking. */
router.get('/ping', function(req, res, next) {
  res.send(`pong`);
});

/* GET file's location based on fileId. */
router.get('/:fileId', function(req, res, next) {
  const fileId = req.params.fileId;
  res.send(`${fileId}`);
});

module.exports = router;
