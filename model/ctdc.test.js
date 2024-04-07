jest.mock('../services/file-auth', () => ({
  getFileField: jest.fn()
}));

const ctdc = require('./ctdc'); // Make sure to replace './ctdc' with the actual path to your module
const { getFileField } = require("../services/file-auth");

describe('ctdc getLocation Function Tests', () => {
  const mockData = {
    file: [
      {
        file_location: 'https://example.com/path/to/file'
      }
    ]
  };

  beforeEach(() => {
    getFileField.mockClear();
    getFileField.mockImplementation((data, callback) => callback(data));
  });

  test('getLocation returns the file_location', () => {
    const location = ctdc.getLocation(mockData);

    expect(location).toBe('https://example.com/path/to/file');
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });
});
