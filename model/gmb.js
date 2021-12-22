module.exports = `query file($file_id: String){  
    FILE (UUID: $file_id)
    {
        FILE_LOCATION
    }
}`;
