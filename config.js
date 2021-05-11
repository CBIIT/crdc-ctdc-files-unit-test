const INDEXD = 'INDEXD';
const CLOUD_FRONT = 'CLOUD_FRONT';
const LOCAL = 'LOCAL';
const PUBLIC_S3 = 'PUBLIC_S3';

const config = {
  INDEXD,
  CLOUD_FRONT,
  LOCAL,
  PUBLIC_S3,
  source: process.env.URL_SRC,
  be_url: process.env.BACKEND_API,
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

if (!config.be_url) {
  const err = 'BACKEND_API is not set!';
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
    config.indexdUrl = process.env.INDEXD_URL;
    if (!config.indexdUrl) {
      throw "INDEXD_URL is not set!";
    }
    break;
  case CLOUD_FRONT:
    config.cf_url = process.env.CLOUD_FRONT_URL;
    config.cf_dist = process.env.CLOUD_FRONT_DIST;
    config.cf_key_id = process.env.CLOUD_FRONT_KEY_ID;
    config.cf_private_key = process.env.CLOUD_FRONT_PRIVATE_KEY;
    if (!config.cf_url) {
      throw "CLOUD_FOUNDATION_URL is not set!";
    }
    if (!config.cf_dist) {
      throw "CLOUD_FOUNDATION_DIST is not set!";
    }
    if (!config.cf_key_id) {
      throw "CLOUD_FOUNDATION_KEY_ID is not set!";
    }
    if (!config.cf_private_key) {
      throw "CLOUD_FOUNDATION_PRIVATE_KEY is not set!";
    }
    break;
  case LOCAL:
    // Todo: add local support here
    break;
  case PUBLIC_S3:
    // Todo: add public S3 support here
    break;
  default:
    const err = `Unknown Source: '${config.source}'`;
    console.error(err);
    throw err;
}

module.exports = config;
