const responses = require("../responses");
const camelToSpaced = require("../util/camelToSpaced");
const isProfane = require("./isProfane");

const test = (valueToTest, {
    field,
    type,
    lowerLength,
    upperLength,
    checkProfane
}) => {
    // Parameter Type Checks
    if (typeof(field) !== type) {
        return responses.error({ message: `\`field\` arg must be of type ${type}.` });
    };
    // Capitalization (for error messaging)
    const stringedField = camelToSpaced(field);
    const upperField = stringedField.charAt(0).toUpperCase() + stringedField.slice(1);
    if (!valueToTest) {
        return responses.error({ message: `Supply a ${stringedField}.` })
    }
    if (typeof(valueToTest) !== "string") {
        return responses.error({ message: `\`valueToTest\` arg must be of type ${type}.` });
    };
    if (typeof(lowerLength) !== "number") {
        return responses.error({ message: "`lowerLength` arg must be whole number." });
    };
    if (typeof(upperLength) !== "number") {
        return responses.error({ message: "`upperLength` arg must be whole number." });
    };
    if (typeof(checkProfane) !== "boolean") {
        return responses.error({ message: "`checkProfane` arg must be boolean." });
    };
    // Length
    if (valueToTest.length < lowerLength || valueToTest.length > upperLength) {
        return responses.error({ message: `${upperField} must be between ${lowerLength} and ${upperLength}` });
    };

    // Regex
    let regex;
    try {
        // Dynamic import from regexes
        regex = require(`./regexes/${field}`);
    } catch (error) {
        return responses.error({ message: `Regex for ${stringedField} not found. Check /regex/regexes.` })
    };

    if (!regex.test(valueToTest)) {
        return responses.error({ message: `Invalid ${stringedField} format.` });
    };

    // Profanity
    if (checkProfane && isProfane(valueToTest)) {
        return responses.error({ message: `${upperField} not allowed.` });
    };

    return null;
};

module.exports = test;