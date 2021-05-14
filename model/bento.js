module.exports = `query file($file_id: String){  
    file (file_id: $file_id)
    {
        file_location
    }
}`;
