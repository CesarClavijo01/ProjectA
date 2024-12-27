const responses = require('../responses');
const isProfane = require('./isProfane');
const usernameRegex = /^[a-zA-Z0-9._-]+$/;

const usernameTest = (username) => {
    if (username.length < 8 || username.length > 16) {
        return responses.error({ message: "Username must be between 8 - 16 characters."})
    }
    if (!usernameRegex.test(username)) {
        return responses.error({ message: "Username contains invalid characters."})
    };
    // Profanity check
    if (isProfane(username)) {
        return responses.error({ message: "Username is not allowed." })
    };
    return responses.success({});
};

module.exports = {
    usernameRegex,
    usernameTest
}