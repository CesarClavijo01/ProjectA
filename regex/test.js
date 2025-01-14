const responses = require("../responses");
const { camelToSpaced } = require("../util");
const isProfane = require("./isProfane");

const test = (valueToTest, valueToConfirm, {
    field,
    lowerLength,
    upperLength,
    profane,
    confirm
}) => {
    // Capitalization (for error messaging)
    const stringedField = camelToSpaced(field);
    const upperField = stringedField.charAt(0).toUpperCase() + stringedField.slice(1);
    if (!valueToTest) {
        throw responses.error({ message: `Supply a ${stringedField}.` })
    }
    if (typeof(valueToTest) !== "string") {
        throw responses.error({ message: `\`valueToTest\` arg must be of type string.` });
    };
    // Length
    if (valueToTest.length < lowerLength || valueToTest.length > upperLength) {
        throw responses.error({ message: `${upperField} must be between ${lowerLength} and ${upperLength}` });
    };

    // Regex
    let regex;
    try {
        // Dynamic import from regexes
        regex = require(`./regexes/${field}`);
    } catch (error) {
        throw responses.error({ message: `Regex for ${stringedField} not found. Check /regex/regexes.` })
    };

    if (!regex.test(valueToTest)) {
        throw responses.error({ message: `Invalid ${stringedField} format.` });
    };

    // Profanity
    if (profane && isProfane(valueToTest)) {
        throw responses.error({ message: `${upperField} not allowed.` });
    };
    if (confirm) {
        if (valueToTest !== valueToConfirm) {
            throw responses.error({ message: `${upperField}s do not match.` })
        };
    };

    return null;
};

module.exports = test;