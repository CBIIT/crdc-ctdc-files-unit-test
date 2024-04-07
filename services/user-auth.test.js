jest.mock('../utils/string-util', () => ({
  isCaseInsensitiveEqual: jest.fn()
}));
jest.mock('../bento-event-logging/const/access-constant', () => ({
  APPROVED: 'approved'
}));

const { isCaseInsensitiveEqual } = require("../utils/string-util");
const { APPROVED } = require("../bento-event-logging/const/access-constant");
const { isAdminUser, getApprovedUserAcls } = require('./user-auth'); // Adjust the path to match the actual file location

describe('User Access Control Tests', () => {
  describe('isAdminUser Function', () => {
    test('returns true for active admin user', () => {
      isCaseInsensitiveEqual.mockImplementation((a, b) => a.toLowerCase() === b.toLowerCase());

      const userInfo = { role: 'admin', userStatus: 'active' };
      expect(isAdminUser(userInfo)).toBe(true);
    });

    test('returns false for inactive admin user', () => {
      isCaseInsensitiveEqual.mockImplementationOnce((a, b) => a.toLowerCase() === b.toLowerCase())
                            .mockImplementationOnce((a, b) => false);

      const userInfo = { role: 'admin', userStatus: 'inactive' };
      expect(isAdminUser(userInfo)).toBe(false);
    });

    test('returns false when role or userStatus is missing', () => {
      const userInfo = { userStatus: 'active' };
      expect(isAdminUser(userInfo)).toBe(false);
    });
  });

  describe('getApprovedUserAcls Function', () => {
    test('filters and maps acls to armIDs for approved accessStatus', () => {
      isCaseInsensitiveEqual.mockReturnValue(true);

      const acls = [
        { armID: 'arm1', accessStatus: APPROVED },
        { armID: 'arm2', accessStatus: 'pending' },
        { armID: 'arm3', accessStatus: APPROVED }
      ];

      expect(getApprovedUserAcls(acls)).toEqual(['arm1', 'arm3']);
    });

    test('returns empty array when acls are undefined or empty', () => {
      expect(getApprovedUserAcls(undefined)).toEqual([]);
      expect(getApprovedUserAcls([])).toEqual([]);
    });

    test('ignores acls with empty armID', () => {
      isCaseInsensitiveEqual.mockReturnValue(true);

      const acls = [
        { armID: '', accessStatus: APPROVED },
        { armID: 'arm2', accessStatus: APPROVED }
      ];
      expect(getApprovedUserAcls(acls)).toEqual(['arm2']);
    });
  });
});
