const dummyUrlGenerator = require('./dummyConnector');

describe('Dummy URL Generator', () => {
  test('returns the fixed URL for a numeric file ID', async () => {
    const fileID = 123;
    const expectedUrl = 'http://www.africau.edu/images/default/sample.pdf';
    expect(await dummyUrlGenerator(fileID)).toBe(expectedUrl);
  });

  test('returns the fixed URL for a string file ID', async () => {
    const fileID = 'abc';
    const expectedUrl = 'http://www.africau.edu/images/default/sample.pdf';
    expect(await dummyUrlGenerator(fileID)).toBe(expectedUrl);
  });

  test('returns the fixed URL for a complex string file ID', async () => {
    const fileID = '123-abc_xyz';
    const expectedUrl = 'http://www.africau.edu/images/default/sample.pdf';
    expect(await dummyUrlGenerator(fileID)).toBe(expectedUrl);
  });
});