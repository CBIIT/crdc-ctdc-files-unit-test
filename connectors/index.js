const config = require('../config');
let getUrl;

switch (config.source) {
  case config.INDEXD:
    getUrl = require('./indexdConnector');
    break;
  case config.CLOUD_FRONT:
    getUrl = require('./cloudFrontConnector');
    break;
  case config.LOCAL:
    getUrl = require('./localConnector');
    break;
  case config.PUBLIC_S3:
    getUrl = require('./publicS3Connector');
    break;
  default:
    console.error(`This shouldn't happen, invalid URL source: '${config.source}'`);
    break;
}

module.exports = getUrl;
