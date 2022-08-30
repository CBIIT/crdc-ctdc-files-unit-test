const {isCaseInsensitiveEqual} = require("../utils/string-util");

const ADMIN_ROLE= 'admin';
const ACTIVE_STATUS = 'active';

const isAdminUser = (userInfo) => {
    if (!userInfo.role || !userInfo.userStatus) return false;
    const isActiveUser = isCaseInsensitiveEqual(userInfo.userStatus, ACTIVE_STATUS);
    const isAdmin = isCaseInsensitiveEqual(userInfo.role, ADMIN_ROLE);
    if (isActiveUser && isAdmin) return true;
    return false;
}

module.exports = {
    isAdminUser
};