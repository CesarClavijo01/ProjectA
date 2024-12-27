require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1w' })
        return token;
    } catch (error) {
        console.log(error)
        throw Error('Error while generating JWT.');
    };
};

module.exports = generateJWT;