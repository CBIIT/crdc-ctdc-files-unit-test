module.exports = `query file($file_id: String){  
    File (UUID: $file_id)
    {
        FILE_LOCATION
    }
}`;
