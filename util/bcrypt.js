const bcrypt = require("bcrypt");

exports.hash = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

exports.validateHash = async function(password, hash) {
    return bcrypt.compare(password, hash)
}