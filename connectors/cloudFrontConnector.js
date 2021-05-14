const config = require('../config');
const bent = require('bent');
const AWS = require('aws-sdk');

const DEFAULT_EXPIRATION_SECONDS = 60 * 60 * 24; // 24 hours

const signer = new AWS.CloudFront.Signer(config.cfKeyPairId, config.cfPrivateKey);

const queryBackend = bent('POST', 'json');

async function getFileLocation(file_id) {
  const result = await queryBackend(config.backendUrl, {
    query: `{ 
      file (file_id: "${file_id}") {
        file_location
      } 
    }`
  });
  if (result && result.data && result.data.file) {
    if (result.data.file.length !== 0) {
      return result.data.file[0].file_location;
    } else {
      throw {statusCode: 404, message: 'File not found in database'}
    }
  } else {
    throw {statusCode: 400, message: 'Query database failed'}
  }

}

function getExpiration() {
  const expiresInSeconds = config.urlExpiresInSeconds || DEFAULT_EXPIRATION_SECONDS;
  return Math.floor((new Date()).getTime() / 1000) + expiresInSeconds; //Current Time in UTC + expiresInSeconds
}

function transformToCloudFrontUrl(file_location) {
  const url = new URL(file_location);
  const newUrl = new URL(url.pathname, config.cfUrl);
  return newUrl.toString();
}

async function getSignedURL(file_location) {
  const signedUrl = signer.getSignedUrl({
    url: transformToCloudFrontUrl(file_location),
    expires: getExpiration()
  });
  return signedUrl;
}

module.exports = async function (file_id) {
  const location = await getFileLocation(file_id);
  return await getSignedURL(location);
}

