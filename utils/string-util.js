const isCaseInsensitiveEqual = (source, target) => {
    if (!target || !source) return false;
    return source.toLowerCase() === target.toLowerCase();
}

const strToArr = (str) => {
    try {
        let arr = str.replace(/'/g, '"');
        arr = JSON.parse(arr);
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        console.error("invalid string array detected")
    }
    return [];
}

module.exports = {
    strToArr,
    isCaseInsensitiveEqual
}