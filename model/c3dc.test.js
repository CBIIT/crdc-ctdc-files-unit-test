const { getLocation } = require('./c3dc'); // Adjust the path to match the actual file location
const { getFileField } = require("../services/file-auth");

jest.mock('../services/file-auth', () => ({
  getFileField: jest.fn()
}));


describe('c3dc getLocation Function Tests', () => {
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
    const location = getLocation(mockData);

    expect(location).toBe('s3://bucketName/path/to/file');
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });
});