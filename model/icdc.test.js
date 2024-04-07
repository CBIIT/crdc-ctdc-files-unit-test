jest.mock('../services/file-auth', () => ({
  getFileField: jest.fn()
}));

const icdc = require('./icdc'); // Adjust the path to match the actual file location
const { getFileField } = require("../services/file-auth");

describe('icdc Tests', () => {
  const mockData = {
    file: [
      {
        file_location: 'https://example.com/path/to/file'
      }
    ]
  };

  beforeAll(() => {
    getFileField.mockImplementation((data, callback) => callback(data));
  });

  test('getLocation returns the file_location from data', () => {
    const expectedFileLocation = 'https://example.com/path/to/file';
    const fileLocation = icdc.getLocation(mockData);

    expect(fileLocation).toBe(expectedFileLocation);
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });

  test('getFileField callback function retrieves file_location correctly', () => {
    const result = getFileField(mockData, data => data.file[0].file_location);

    expect(result).toBe(mockData.file[0].file_location);
  });
});
