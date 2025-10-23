const argon2 = require('argon2');

async function hashValue(value) {
    return await argon2.hash(value);
}
async function verifyHash(hash, plainValue) {
    return await argon2.verify(hash, plainValue)
}

module.exports = { hashValue, verifyHash};
