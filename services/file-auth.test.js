jest.mock('../utils/string-util', () => ({
  isCaseInsensitiveEqual: jest.fn()
}));

const { getFileField, isAuthorizedAccess } = require('./file-auth'); // Adjust the path to match the actual file location
const { isCaseInsensitiveEqual } = require('../utils/string-util');

describe('fileAuth Tests', () => {
  describe('getFileField Tests', () => {
    test('returns callback result when file data is present', () => {
      const mockData = { file: [{ file_location: 'https://example.com/path/to/file' }] };
      const mockCallback = jest.fn().mockReturnValue('https://example.com/path/to/file');

      const result = getFileField(mockData, mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(mockData);
      expect(result).toBe('https://example.com/path/to/file');
    });

    test('logs error and returns null when file data is not present', () => {
      console.error = jest.fn();

      const result = getFileField({}, jest.fn());

      expect(console.error).toHaveBeenCalledWith("File not found in DB");
      expect(result).toBeNull();
    });
  });

  describe('isAuthorizedAccess Tests', () => {
    beforeEach(() => {
      isCaseInsensitiveEqual.mockImplementation((a, b) => a.toLowerCase() === b.toLowerCase());
    });

    test('returns true when file ACL includes "open"', () => {
      expect(isAuthorizedAccess(['user'], ['open'])).toBe(true);
      expect(isCaseInsensitiveEqual).toHaveBeenCalledWith('open', 'open');
    });

    test('returns true when user ACL matches file ACL', () => {
      expect(isAuthorizedAccess(['user', 'admin'], ['admin', 'guest'])).toBe(true);
    });

    test('returns false when there is no match in ACLs', () => {
      expect(isAuthorizedAccess(['user'], ['admin', 'guest'])).toBe(false);
    });

    test('returns false when file ACL or user ACL is not provided', () => {
      expect(isAuthorizedAccess(null, ['admin', 'guest'])).toBe(false);
      expect(isAuthorizedAccess(['user'], null)).toBe(false);
    });
  });
});
