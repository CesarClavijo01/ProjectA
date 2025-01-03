const responses = require('../responses')

const passwordTest = (reqPassword, conPassword) => {
    // Check provided
    if (!reqPassword || !conPassword) {
        return responses.error({ message: "Supply both password and confirmed password." });
    };
    
    // Check if the password has at least one digit
    if (!/\d/.test(reqPassword)) {
        return responses.error({ message: "Password must contain at least one digit."});
    };
    
    // Check if the password has at least one lowercase letter
    if (!/[a-z]/.test(reqPassword)) {
        return responses.error({ message: "Password must contain at least one lowercase letter."});
    };
    
    // Check if the password has at least one uppercase letter
    if (!/[A-Z]/.test(reqPassword)) {
        return responses.error({ message: "Password must contain at least one uppercase letter."});
    };
    
    // Check if the password has at least one special character
    if (!/[$!@#?%]/.test(reqPassword)) {
        return responses.error({ message: "Password must contain at least one special character ($!@#?%)."});
    };
    
    // Check if the password has no whitespace characters
    if (/\s/.test(reqPassword)) {
        return responses.error({ message: "Password must not contain any whitespace characters."});
    };
    
    // Check if the password length is between 8 and 255 characters
    if (reqPassword.length < 8) {
        return responses.error({ message: "Password must be at least 8 characters long."});
    };

    // Check similar
    const isSame = reqPassword === conPassword;
    if (!isSame) {
        return responses.error({ message: "Passwords do not match." });
    };
    
    return null;
};

module.exports = passwordTest;