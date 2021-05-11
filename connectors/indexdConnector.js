const bent = require('bent');
const config = require('../config');

const getJSON = bent(config.indexdUrl, 'json')

module.exports = async function (file_id) {
  let result = await getJSON(`${file_id}`);
  return result.url;
}
