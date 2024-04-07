
jest.mock('../services/file-auth', () => ({
  getFileField: jest.fn()
}));


const { getLocation } = require('./gmb');

describe('getLocation function', () => {
  test('returns the file location when data is valid', () => {
    const mockData = {
      fILE: [
        {
          FILE_LOCATION: 'https://example.com/path/to/file'
        }
      ]
    };

    const location = getLocation(mockData);

    expect(location).toBe('https://example.com/path/to/file');
  });

  test('logs error and returns null when file is not found', () => {
    console.error = jest.fn();

    const location = getLocation({ fILE: [] });

    expect(console.error).toHaveBeenCalledWith("File not found in DB");
    expect(location).toBeNull();
  });

  test('returns null with undefined data', () => {
    console.error = jest.fn();

    const location = getLocation(undefined);

    expect(console.error).toHaveBeenCalledWith("File not found in DB");
    expect(location).toBeNull();
  });
});