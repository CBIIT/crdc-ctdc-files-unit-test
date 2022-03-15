const config = require('../config');
const bent = require('bent');

module.exports = function (exceptions) {
    if (config.authEnabled) {
        return async function(req, res, next) {
            if (exceptions && exceptions.includes(req.path)) {
                return next();
            }
            try {
                const cookie = req.headers.cookie;
                if (cookie) {
                    const auth = bent('POST',  'json',  {Cookie: cookie});
                    const result = await auth(config.authUrl);
                    if (result && result.status) {
                        if (result.status) {
                            return next();
                        }
                    }
                }
                return res.status(403).send('Not authenticated!');
            } catch (e) {
                console.log(e);
                return res.status(500).send(e);
            }
        }
    } else {
        return function (req, res, next) {
            return next();
        }
    }
}