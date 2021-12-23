module.exports = {
    query: `query file($file_id: String){  
        file (UUID: $file_id)
        {
            FILE_LOCATION
        }
    }`,
    getLocation: data => {
        if (data && data.file && data.file.length > 0) {
            return data.file[0].FILE_LOCATION;
        } else {
            console.error("File not found in DB");
            return null;
        }
    }
};
