require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJWT = (token) => {
    try {
        // Verify token
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = verifiedToken;

        // If there isnt an id, token isnt verified.
        if (!id) {
            throw new Error('JWT malformed.');
        };
        return verifiedToken;

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw Error('Token has expired.');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token.');
        };

        throw new Error('Error while verifying JWT.')
    };
};

module.exports = verifyJWT