const responses = require("../responses");
const camelToSpaced = require("../util/camelToSpaced");
const isProfane = require("./isProfane");

const test = ({field, stringToTest, lowerLength, upperLength, confirmed = "", canProfane = false}) => {
    // Parameter Type Checks
    if (typeof(field) !== "string") {
        return responses.error({ message: "`field` arg must be string." });
    };
    if (typeof(stringToTest) !== "string") {
        return responses.error({ message: "`stringToTest` arg must be a string of characters." });
    };
    if (typeof(lowerLength) !== "number") {
        return responses.error({ message: "`lowerLength` arg must be whole number." });
    };
    if (typeof(upperLength) !== "number") {
        return responses.error({ message: "`upperLength` arg must be whole number." });
    };
    if (confirmed && typeof(confirmed) !== "string") {
        return responses.error({ message: "`confirmed` must be a string of characters." });
    };
    if (typeof(canProfane) !== "boolean") {
        return responses.error({ message: "`canProfane` arg must be boolean." });
    };
    // Capitalization (for error messaging)
    const stringedField = camelToSpaced(field);
    const upperField = stringedField.charAt(0).toUpperCase() + stringedField.slice(1);
    
    // If stringToTest needs to be confirmed
    if (confirmed !== "") {
        // Confirm
        const isSame = stringToTest === confirmed;
        if (!isSame) {
            return responses.error({ message: `${upperField}s do not match.` });
        };
    };

    // Length
    if (stringToTest.length < lowerLength || stringToTest.length > upperLength) {
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

    if (!regex.test(stringToTest)) {
        return responses.error({ message: `Invalid ${stringedField} format.` });
    };

    // Profanity
    if (!canProfane && isProfane(stringToTest)) {
        return responses.error({ message: `${upperField} not allowed.` });
    };

    return null;
};

module.exports = test;