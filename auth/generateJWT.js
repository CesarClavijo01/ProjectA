require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1w' })
        return token;
    } catch (error) {
        throw Error('GenerateJWT: Error while generating JWT.');
    };
};

module.exports = generateJWT;