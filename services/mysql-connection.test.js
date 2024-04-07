jest.mock('mysql');
jest.mock('../config.js', () => ({
  mysql_host: 'localhost',
  mysql_user: 'user',
  mysql_password: 'password',
  mysql_database: 'test_db'
}));

const mysql = require('mysql');
const { getToken } = require('./authService'); // Adjust the path to match the actual file location
const config = require('../config.js');

describe('Auth Service - getToken Function', () => {
  const mockJson = jest.fn();
  const mockRes = { json: mockJson };
  const mockReq = { headers: { cookie: 'sessionId=123' } };
  let mockConnection;

  beforeEach(() => {
    mockJson.mockClear();
    mockConnection = {
      query: jest.fn(),
      release: jest.fn()
    };
    mysql.createPool.mockReturnValue({
      getConnection: jest.fn((cb) => cb(null, mockConnection))
    });
  });

  test('getToken responds with token when session is valid', async () => {
    const expectedToken = 'valid-token';
    mockConnection.query.mockImplementation((sql, values, cb) => {
      cb(null, [{ data: { token: expectedToken } }]);
    });

    await getToken(mockReq, mockRes);
    
    expect(mysql.createPool).toHaveBeenCalledWith({
      host: config.mysql_host,
      user: config.mysql_user,
      password: config.mysql_password,
      database: config.mysql_database,
      insecureAuth: false
    });
    expect(mockConnection.query).toHaveBeenCalled();
    expect(mockJson).toHaveBeenCalledWith({ token: expectedToken });
  });

  test('getToken responds with error when database connection fails', async () => {
    mysql.createPool().getConnection.mockImplementation((cb) => cb(new Error("Connection failed"), null));

    await getToken(mockReq, mockRes);

    expect(mockJson).toHaveBeenCalledWith({ error: "Could not establish a connection to the session database, see logs for details" });
  });

  test('getToken responds with error when session ID is not found', async () => {
    // Simulating absence of session ID
    const req = { headers: { cookie: '' } };
    
    await getToken(req, mockRes);

    expect(mockJson).toHaveBeenCalledWith({ error: "An internal server error occurred, please contact the administrators" });
  });

  test('getToken responds with error when query fails', async () => {
    mockConnection.query.mockImplementation((sql, values, cb) => {
      cb(new Error("Query failed"), null);
    });

    await getToken(mockReq, mockRes);

    expect(mockJson).toHaveBeenCalledWith({ error: "An error occurred while querying the database, see logs for details" });
  });

  test('getToken responds with session expires when session is not found', async () => {
    mockConnection.query.mockImplementation((sql, values, cb) => {
      cb(null, []);
    });

    await getToken(mockReq, mockRes);

    expect(mockJson).toHaveBeenCalledWith({ error: "Session expires" });
  });
});
