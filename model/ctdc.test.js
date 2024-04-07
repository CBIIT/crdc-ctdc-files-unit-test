jest.mock('../services/file-auth', () => ({
  getFileField: jest.fn()
}));


const { getFileField } = require("../services/file-auth");
const { query, getLocation } = require("./ctdc");


describe('icdc Tests', () => {
  const mockData = {
    file: [
      {
        file_location: 'https://cds.example.com/path/to/file'
      }
    ]
  };

  beforeEach(() => {
    getFileField.mockClear();
    getFileField.mockImplementation((data, callback) => callback(data));
  });

  test('getLocation retrieves the file_url_in_cds from the data', () => {
    const fileURL = getLocation(mockData);

    expect(fileURL).toBe('https://cds.example.com/path/to/file');
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });
});