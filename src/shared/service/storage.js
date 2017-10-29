function encode(data) {
    return JSON.stringify(data);
}

function decode(data) {
    return JSON.parse(data);
}

function write(key, data) {
    try {
        if (data === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, encode(data));
        }
        return data;
    } catch (exception) {
        return undefined;
    }
}

function read(key) {
    try {
        const data = localStorage.getItem(key);

        if (data === null) {
            return undefined;
        }

        return decode(data);
    } catch (exception) {
        return undefined;
    }
}

export function setItem(key, data) {
    return write(`dollarbird-${key}`, data);
}

export function getItem(key) {
    return read(`dollarbird-${key}`);
}

export function setUserItem(userId, key, data) {
    return setItem(`${userId}-${key}`, data);
}

export function getUserItem(userId, key) {
    return getItem(`${userId}-${key}`);
}
