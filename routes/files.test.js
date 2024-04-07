// In your test file, for example, files.test.js

const request = require('supertest');
const express = require('express');
const router = require('./files');
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

  test('GET /ping responds with pong', async () => {
    const response = await request(app).get('/ping');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('pong');
  });

  test('GET /version responds with version info', async () => {
    const response = await request(app).get('/version');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      version: '1.0.0',
      date: '2024-01-01'
    });
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

  test('GET /version responds with version info', async () => {
    const response = await request(app).get('/version');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      version: '1.0.0',
      date: '2024-01-01'
    });
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


// const request = require('supertest');
// const express = require('express');
// const router = require('./files'); // Adjust the path to where your router file is located.
// const config = require('../config');
// const getURL = require('../connectors');

// jest.mock('../config');
// jest.mock('../connectors');



// describe('Router tests', () => {
//   let app;

//   beforeAll(() => {
//     app = express();
//     app.use(express.json()); // If your router needs to parse JSON bodies
//     app.use('/', router); // Adjust if your router is mounted at a different path
//     // Set up any mock config here
//     config.version = '1.0.0';
//     config.date = '2024-01-01';
//   });

//   test('GET /ping responds with pong', async () => {
//     const response = await request(app).get('/ping');
//     expect(response.statusCode).toBe(200);
//     expect(response.text).toEqual('pong');
//   });

//   test('GET /version responds with version info', async () => {
//     const response = await request(app).get('/version');
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual({
//       version: '1.0.0',
//       date: '2024-01-01'
//     });
//   });

//   test('GET /:fileId responds with file URL', async () => {
//     const fileId = 'testFileId';
//     const mockResponse = { status: 200, message: 'http://example.com/file' };
//     getURL.mockResolvedValue(mockResponse);

//     const response = await request(app).get(`/${fileId}`);
//     expect(response.statusCode).toBe(200);
//     expect(response.text).toEqual('http://example.com/file');
//     expect(getURL).toHaveBeenCalledWith(fileId, expect.anything(), expect.anything());
//   });

//   test('GET /:fileId handles errors', async () => {
//     const fileId = 'badFileId';
//     const mockError = new Error('File not found');
//     mockError.statusCode = 404;
//     getURL.mockRejectedValue(mockError);

//     const response = await request(app).get(`/${fileId}`);
//     expect(response.statusCode).toBe(404);
//     expect(response.text).toEqual('File not found');
//   });

//   // Additional tests can be written here

});
