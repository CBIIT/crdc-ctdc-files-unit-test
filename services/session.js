const session = require('express-session');
const {randomBytes} = require("crypto");
const config = require("../config");
const MySQLStore = require('express-mysql-session')(session);

function createSession() {
    return session({
        secret: config.cookie_secret || randomBytes(16).toString("hex"),
        store: new MySQLStore({
          host: config.mysql_host,
          port: config.mysql_port,
          user: config.mysql_user,
          password: config.mysql_password,
          database: config.mysql_database,
          checkExpirationInterval: 10 * 1000, // 10 secs
          expiration: config.session_timeout,
        })
    });
}

module.exports = {
    createSession
};