module.exports = async function (file_id) {
  console.log(`File id '${file_id}' requested, dummy (fixed) url will be returned.`);
  return `http://www.africau.edu/images/default/sample.pdf`;
  // return `https://fake_domain.com/fake_path/${file_id}`;
}
