const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 4;
    return await bcrypt.hash(password, SALT_ROUNDS);
};

module.exports = hashPassword;