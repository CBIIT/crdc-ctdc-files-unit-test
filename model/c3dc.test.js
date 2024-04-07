jest.mock('../services/file-auth', () => ({
  getFileField: jest.fn()
}));

const c3dc = require('./c3dc'); // Adjust the path to match the location of your c3dc module
const { getFileField } = require("../services/file-auth");

describe('c3dc Tests', () => {
  const mockData = {
    file: [
      {
        FILE_LOCATION: 's3://bucketName/path/to/file'
      }
    ]
  };

  beforeEach(() => {
    getFileField.mockClear();
    getFileField.mockImplementation((data, callback) => callback(data));
  });

  test('getLocation returns the FILE_LOCATION', () => {
    const location = c3dc.getLocation(mockData);

    expect(location).toBe('s3://bucketName/path/to/file');
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });
});
