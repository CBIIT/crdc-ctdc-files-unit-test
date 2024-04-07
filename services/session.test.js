const request = require('supertest');
const express = require('express');
const router = require('../routes/files');
const config = require('../config');
const getURL = require('../connectors');

jest.mock('../config');
jest.mock('../connectors');

describe('Router tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/', router);
    // Set up any mock config here
    config.version = '1.0.0';
    config.date = '2024-01-01';
  });

  test('GET /:fileId responds with file URL', async () => {
    const fileId = 'testFileId';
    const mockResponse = { status: 200, message: 'http://example.com/file' };
    getURL.mockResolvedValue(mockResponse);

    const response = await request(app).get(`/${fileId}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('http://example.com/file');
    expect(getURL).toHaveBeenCalledWith(fileId, expect.anything(), expect.anything());
  });

  test('GET /:fileId handles errors', async () => {
    const fileId = 'badFileId';
    const mockError = new Error('File not found');
    mockError.statusCode = 404;
    getURL.mockRejectedValue(mockError);

    const response = await request(app).get(`/${fileId}`);
    expect(response.statusCode).toBe(404);
    expect(response.text).toEqual('File not found');
  });
});



// jest.mock('express-session');
// jest.mock('crypto', () => ({
//   randomBytes: jest.fn()
// }));
// jest.mock('../config', () => ({
//   cookie_secret: 'test_secret',
//   mysql_host: 'localhost',
//   mysql_port: 3306,
//   mysql_user: 'user',
//   mysql_password: 'password',
//   mysql_database: 'test_db',
//   session_timeout: 300000 // 5 minutes
// }));
// jest.mock('express-mysql-session');

// const session = require('express-session');
// const { randomBytes } = require("crypto");
// const config = require("../config");
// const MySQLStore = require('express-mysql-session')(session);
// const { createSession } = require('./session'); // Adjust the path to match the actual file location

// describe('Session Manager - createSession Function', () => {
//   test('createSession initializes session with expected options', () => {
//     const hexString = 'abcdef1234567890abcdef1234567890';
//     randomBytes.mockReturnValue(Buffer.from(hexString, 'hex'));

//     createSession();

//     expect(randomBytes).toHaveBeenCalledWith(16);
//     expect(MySQLStore).toHaveBeenCalledWith({
//       host: config.mysql_host,
//       port: config.mysql_port,
//       user: config.mysql_user,
//       password: config.mysql_password,
//       database: config.mysql_database,
//       checkExpirationInterval: 10 * 1000,
//       expiration: config.session_timeout
//     });
//     expect(session).toHaveBeenCalledWith({
//       secret: config.cookie_secret,
//       store: expect.any(Object)
//     });
//   });
// });
