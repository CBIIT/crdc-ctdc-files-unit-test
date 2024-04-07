jest.mock('../services/file-auth', () => ({
  getFileField: jest.fn()
}));


const { getFileField } = require("../services/file-auth");
const { getLocation, getAcl } = require("./index");

describe('getLocation and getAcl Function Tests', () => {
  const mockData = {
    file: [
      {
        file_location: 'https://example.com/path/to/file',
        acl: 'public'
      }
    ]
  };

  beforeEach(() => {
    getFileField.mockClear();
    getFileField.mockImplementation((data, callback) => callback(data));
  });

  test('getLocation retrieves the file_location from the data', () => {
    const fileLocation = getLocation(mockData);

    expect(fileLocation).toBe('https://example.com/path/to/file');
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });

  test('getAcl retrieves the acl from the data', () => {
    const fileAcl = getAcl(mockData);

    expect(fileAcl).toBe('public');
    expect(getFileField).toHaveBeenCalledWith(mockData, expect.any(Function));
  });
});