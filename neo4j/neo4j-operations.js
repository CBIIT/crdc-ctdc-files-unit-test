const {neo4jConnection} = require('./neo4j-connection');
const {DownloadEvent} = require("../bento-event-logging/model/download-event");
const {logEvent, getFileByID} = require("../bento-event-logging/neo4j/neo4j-operations");
const ANONYMOUS_USER = "Anonymous User";
const storeDownloadEvent = async function(userInfo, fileID){
    let userID, email, idp;
    if (userInfo === undefined || !userInfo.userID){
        userID = ANONYMOUS_USER;
        email = ANONYMOUS_USER;
        idp = ANONYMOUS_USER;
    }
    else{
        userID = userInfo.userID;
        email = userInfo.email;
        idp = userInfo.IDP;
    }
    let file = await getFileByID(neo4jConnection, fileID);
    const downloadEvent = new DownloadEvent(userID, email, idp, file.properties.file_format, fileID, file.properties.file_name, file.properties.file_size);
    await logEvent(neo4jConnection, downloadEvent);
};

module.exports = {
    storeDownloadEvent
}

