jest.mock('bent');
jest.mock('../config', () => ({
  project: 'ICDC',
  backendUrl: 'https://backend.example.com',
  projectNames: {
    ICDC: 'ICDC',
    BENTO: 'BENTO',
    GMB: 'GMB',
    C3DC: 'C3DC',
    CTDC: 'CTDC',
    CDS: 'CDS',
  }
}));
jest.mock('./icdc', () => ({
  query: 'query for icdc',
  getLocation: jest.fn().mockImplementation(data => data.file[0].file_location),
  getAcl: jest.fn().mockImplementation(data => data.file[0].acl)
}));

const bent = require('bent');
const { getFileLocation, getFileACL } = require('./index');
const icdcModel = require('./icdc');

describe('queryBackendService Tests', () => {
  beforeAll(() => {
    bent.mockImplementation(() => async () => ({
      data: [{ file_location: 'https://file.location', acl: 'public' }]
    }));
  });

  test('getFileLocation returns the file location', async () => {
    const fileLocation = await getFileLocation('file_id_123', 'cookie_abc');
    
    expect(fileLocation).toBe('https://file.location');
    expect(icdcModel.getLocation).toHaveBeenCalledWith([{ file_location: 'https://file.location', acl: 'public' }]);
  });

  test('getFileACL returns the file ACL', async () => {
    const fileACL = await getFileACL('file_id_123', 'cookie_abc');
    
    expect(fileACL).toBe('public');
    expect(icdcModel.getAcl).toHaveBeenCalledWith([{ file_location: 'https://file.location', acl: 'public' }]);
  });

  test('getFileInfo throws error if file not found', async () => {
    bent.mockImplementation(() => async () => ({
      data: []
    }));

    await expect(getFileLocation('file_id_123', 'cookie_abc')).rejects.toEqual({
      statusCode: 404,
      message: 'File not found in database'
    });
  });

  test('getFileInfo throws error if query fails', async () => {
    bent.mockImplementation(() => async () => ({
      errors: [{message: 'Query failed'}]
    }));

    await expect(getFileLocation('file_id_123', 'cookie_abc')).rejects.toEqual({
      statusCode: 400,
      message: 'Query failed'
    });
  });
});
