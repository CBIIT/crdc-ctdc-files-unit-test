const config = require('../config');
const bent = require('bent');
const AWS = require('aws-sdk');

const signer = new AWS.CloudFront.Signer(config.cfKeyId, config.cfPrivateKey);

const queryBackend = bent('POST', 'json');

async function getFileLocation(file_id) {
  const result = await queryBackend(config.backendUrl, {
    query: `{ 
      file (uuid: "${file_id}") {
        uuid
        file_location
        md5sum
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
  const expiresInSeconds = config.urlExpiresInSeconds || (60 * 60 * 24) // default to 24 hours
  return Math.floor((new Date()).getTime() / 1000) + expiresInSeconds; //Current Time in UTC + expiresInSeconds
}

function transformToCloudFrontUrl(file_location) {
  //Todo: transform to CloudFront URL
  return file_location;
}

async function getSignedURL(file_location) {
  const url = signer.getSignedUrl({
    url: transformToCloudFrontUrl(file_location),
    expires: getExpiration()
  });
  return url;
}

module.exports = async function (file_id) {
  const location = await getFileLocation(file_id);
  return await getSignedURL(location);
}

