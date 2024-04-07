describe('File Data Util Tests', () => {
  const gmb = require('./gmb'); // Adjust the path to match the location of your module

  test('getLocation returns the FILE_LOCATION when data is valid', () => {
    const mockData = {
      fILE: [
        {
          FILE_LOCATION: 'https://example.com/path/to/file'
        }
      ]
    };

    const location = gmb.getLocation(mockData);

    expect(location).toBe('https://example.com/path/to/file');
  });

  test('getLocation logs error and returns null when file is not found', () => {
    console.error = jest.fn();

    const location = gmb.getLocation({fILE: []});

    expect(console.error).toHaveBeenCalledWith("File not found in DB");
    expect(location).toBeNull();
  });

  test('getLocation returns null with undefined data', () => {
    console.error = jest.fn();

    const location = gmb.getLocation(undefined);

    expect(console.error).toHaveBeenCalledWith("File not found in DB");
    expect(location).toBeNull();
  });
});
