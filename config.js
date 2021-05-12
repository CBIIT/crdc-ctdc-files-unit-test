const { removeTrailingSlashes } = require('./utils');
const INDEXD = 'INDEXD';
const CLOUD_FRONT = 'CLOUD_FRONT';
const LOCAL = 'LOCAL';
const PUBLIC_S3 = 'PUBLIC_S3';
const DUMMY = 'DUMMY';

const config = {
  INDEXD,
  CLOUD_FRONT,
  LOCAL,
  PUBLIC_S3,
  DUMMY,
  source: process.env.URL_SRC || DUMMY,
  backendUrl: removeTrailingSlashes(process.env.BACKEND_API),
  version: process.env.VERSION,
  date: process.env.DATE
};

if (config.source) {
  config.source = config.source.toUpperCase();
} else {
  const err = 'URL_SRC is not set!';
  console.error(err);
  throw err;
}


if (!config.version) {
  config.version = 'Version not set'
}

if (!config.date) {
  config.date = new Date();
}

switch (config.source) {
  case INDEXD:
    config.indexDUrl = removeTrailingSlashes(process.env.INDEXD_URL);
    if (!config.indexDUrl) {
      throw "INDEXD_URL is not set!";
    }
    break;
  case CLOUD_FRONT:
    config.cfUrl = removeTrailingSlashes(process.env.CLOUD_FRONT_URL);
    config.cfDist = process.env.CLOUD_FRONT_DIST;
    config.cfKeyId = process.env.CLOUD_FRONT_KEY_ID;
    config.cfPrivateKey = process.env.CLOUD_FRONT_PRIVATE_KEY;
    config.urlExpiresInSeconds = process.env.URL_EXPIRES_IN_SECONDS
    if (!config.cfUrl) {
      throw "CLOUD_FOUNDATION_URL is not set!";
    }
    if (!config.cfDist) {
      throw "CLOUD_FOUNDATION_DIST is not set!";
    }
    if (!config.cfKeyId) {
      throw "CLOUD_FOUNDATION_KEY_ID is not set!";
    }
    if (!config.cfPrivateKey) {
      throw "CLOUD_FOUNDATION_PRIVATE_KEY is not set!";
    }
    if (!config.backendUrl) {
      const err = 'BACKEND_API is not set!';
      console.error(err);
      throw err;
    }
    break;
  case LOCAL:
    // Todo: add local support here
    break;
  case PUBLIC_S3:
    // Todo: add public S3 support here
    break;
  case DUMMY:
    break;
  default:
    const err = `Unknown Source: '${config.source}'`;
    console.error(err);
    throw err;
}

module.exports = config;
