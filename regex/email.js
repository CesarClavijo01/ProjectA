const responses = require("../responses");
const { confirmEntry } = require('../util');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailTest = (reqEmail, conEmail) => {
    // Confirmation
    const isSame = confirmEntry(reqEmail, conEmail)
    if (!isSame) {
        return responses.error({ message: "Emails do not match." })
    };
    // Regex test
    if (!emailRegex.test(reqEmail)) {
        return responses.error({ message: "Please enter a valid email." });
    };
    return responses.success({});
};

module.exports = {
    emailRegex,
    emailTest
}