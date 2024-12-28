const bcrypt = require('bcrypt');

const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = comparePassword;