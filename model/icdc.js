module.exports = `query file($file_id: String){  
    file (uuid: $file_id)
    {
        file_location
    }
}`;
