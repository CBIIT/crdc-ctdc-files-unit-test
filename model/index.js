const config = require('../config');
const bent = require('bent');

const queryBackend = bent('POST', 'json');

let query;
switch (config.project) {
  case config.projectNames.ICDC:
    query = require('./icdc');
    break;
  case config.projectNames.BENTO:
    query = require('./bento');
    break;
  default:
    throw `Unknown project "${config.project}"`;
}

module.exports = async function getFileLocation(file_id) {
  const result = await queryBackend(config.backendUrl, {
    query: query,
    variables: {
      file_id
    }
  });
  if (result && result.data && result.data.file) {
    if (result.data.file.length !== 0) {
      return result.data.file[0].file_location;
    } else {
      throw {statusCode: 404, message: 'File not found in database'}
    }
  } else {
    let message = 'Query database failed';
    if (result && result.error) {
      message = result.error.toString();
    }
    throw {statusCode: 400, message }
  }
}
