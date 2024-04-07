jest.mock('../services/file-auth', () => ({
  getFileField: jest.fn()
}));

const bento = require('./bento'); // Adjust the path to match the location of your bento module
const { getFileField } = require("../services/file-auth");

describe('bento Tests', () => {
  const mockData = {
    file: [
      {
        file_location: 's3://bucketName/path/to/file',
        acl: 'public-read'
      }
    ]
  };

  beforeEach(() => {
    getFileField.mockImplementation((data, callback) => callback(data));
  });

  test('getLocation returns the file location', () => {
    const location = bento.getLocation(mockData);

    expect(location).toBe('s3://bucketName/path/to/file');
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });

  test('getAcl returns the acl', () => {
    const acl = bento.getAcl(mockData);

    expect(acl).toBe('public-read');
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });
});
