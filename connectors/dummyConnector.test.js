// Assuming the module is saved in a file named 'dummyUrlGenerator.js'
const dummyUrlGenerator = require('./dummyConnector');

describe('Dummy URL Generator', () => {
  test('returns the fixed URL for a numeric file ID', async () => {
    const fileID = 123;
    const expectedUrl = 'http://www.africau.edu/images/default/sample.pdf';
    await expect(dummyUrlGenerator(fileID)).resolves.toBe(expectedUrl);
  });

  test('returns the fixed URL for a string file ID', async () => {
    const fileID = 'abc';
    const expectedUrl = 'http://www.africau.edu/images/default/sample.pdf';
    await expect(dummyUrlGenerator(fileID)).resolves.toBe(expectedUrl);
  });

  test('returns the fixed URL for a complex string file ID', async () => {
    const fileID = '123-abc_xyz';
    const expectedUrl = 'http://www.africau.edu/images/default/sample.pdf';
    await expect(dummyUrlGenerator(fileID)).resolves.toBe(expectedUrl);
  });

  // Optionally, you might want to test how it handles unexpected inputs
  test('returns the fixed URL even for unexpected input types', async () => {
    const fileID = { complex: 'object', with: ['array', 'and', 123] };
    const expectedUrl = 'http://www.africau.edu/images/default/sample.pdf';
    await expect(dummyUrlGenerator(fileID)).resolves.toBe(expectedUrl);
  });
});
