const config = require('../config');
const {authFileACL} = require("../services/file-auth");
const {getFileACL} = require("../model");
const {strToArr} = require("./string-util");

module.exports = function (exceptions) {
    if (config.authEnabled) {
        return async function(req, res, next) {
            if (exceptions && exceptions.includes(req.path)) {
                return next();
            }
            try {
                if (req.session && req.session.userInfo && req.path.includes("/api/files/")) {
                    // Pass if ACL authenticator not enabled
                    if (!config.authorizationEnabled) return next();
                    // Search file ACL from Bento-backend API
                    const fileId = req.path.replace("/api/files/", "");
                    const fileAcl = await getFileACL(fileId);
                    const userAcl = req.session.userInfo.acl ? req.session.userInfo.acl : [];
                    if (authFileACL(userAcl, strToArr(fileAcl))) return next();
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