jest.mock('../services/file-auth', () => ({
  getFileField: jest.fn()
}));

const cds = require('./cds'); // Adjust the path to match the location of your cds module
const { getFileField } = require("../services/file-auth");

describe('cds getLocation Function Tests', () => {
  const mockData = {
    file: [
      {
        file_url_in_cds: 'https://cds.example.com/path/to/file'
      }
    ]
  };

  beforeEach(() => {
    getFileField.mockClear();
    getFileField.mockImplementation((data, callback) => callback(data));
  });

  test('getLocation extracts and returns the file_url_in_cds', () => {
    const fileURL = cds.getLocation(mockData);

    expect(fileURL).toBe('https://cds.example.com/path/to/file');
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });
});
