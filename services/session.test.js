jest.mock('express-session');
jest.mock('crypto', () => ({
  randomBytes: jest.fn()
}));
jest.mock('../config', () => ({
  cookie_secret: 'test_secret',
  mysql_host: 'localhost',
  mysql_port: 3306,
  mysql_user: 'user',
  mysql_password: 'password',
  mysql_database: 'test_db',
  session_timeout: 300000 // 5 minutes
}));
jest.mock('express-mysql-session');

const session = require('express-session');
const { randomBytes } = require("crypto");
const config = require("../config");
const MySQLStore = require('express-mysql-session')(session);
const { createSession } = require('./session'); // Adjust the path to match the actual file location

describe('Session Manager - createSession Function', () => {
  test('createSession initializes session with expected options', () => {
    const hexString = 'abcdef1234567890abcdef1234567890';
    randomBytes.mockReturnValue(Buffer.from(hexString, 'hex'));

    createSession();

    expect(randomBytes).toHaveBeenCalledWith(16);
    expect(MySQLStore).toHaveBeenCalledWith({
      host: config.mysql_host,
      port: config.mysql_port,
      user: config.mysql_user,
      password: config.mysql_password,
      database: config.mysql_database,
      checkExpirationInterval: 10 * 1000,
      expiration: config.session_timeout
    });
    expect(session).toHaveBeenCalledWith({
      secret: config.cookie_secret,
      store: expect.any(Object)
    });
  });
});
