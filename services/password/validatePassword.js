const responses = require('../../responses')

const validatePassword = (reqPassword, conPassword) => {
    // Check provided
    try {
        
        if (!reqPassword || !conPassword) {
            throw {
                name: "MissingPassword",
                message: "Supply both password and confirmed password.",
            };
        };
        
        // Check if the password has at least one digit
        if (!/\d/.test(reqPassword)) {
            throw {
                name: "InvalidPassword",
                message: "Password must contain at least one digit.",
            };
        };
        
        // Check if the password has at least one lowercase letter
        if (!/[a-z]/.test(reqPassword)) {
            throw responses.error({
                name: "InvalidPassword",
                message: "Password must contain at least one lowercase letter.",
            });
        };
        
        // Check if the password has at least one uppercase letter
        if (!/[A-Z]/.test(reqPassword)) {
            throw responses.error({
                name: "InvalidPassword",
                message: "Password must contain at least one uppercase letter.",
            });
        };
        
        // Check if the password has at least one special character
        if (!/[$!@#?%]/.test(reqPassword)) {
            throw responses.error({
                name: "InvalidPassword",
                message: "Password must contain at least one special character ($!@#?%).",
            });
        };
        
        // Check if the password has no whitespace characters
        if (/\s/.test(reqPassword)) {
            throw responses.error({
                name: "InvalidPassword",
                message: "Password must not contain any whitespace characters.",
            });
        };
        
        // Check if the password length is between 8 and 255 characters
        if (reqPassword.length < 8) {
            throw responses.error({
                name: "InvalidPassword",
                message: "Password must be at least 8 characters long.",
            });
        };
        
        // Check similar
        const isSame = reqPassword === conPassword;
        if (!isSame) {
            throw responses.error({
                name: "PasswordMismatch",
                message: "Passwords do not match.",
            });
        };
        
        return null;
    } catch (error) {
        error.statusCode = 400;
        throw error;
    };
};

module.exports = validatePassword;