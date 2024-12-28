const camelToSpaced = (camelCaseString) => {
    return camelCaseString
        .replace(/([a-z])([A-Z])/g, '$1 $2')  // Insert space before uppercase letter
        .toLowerCase();  // Convert the whole string to lowercase
};

module.exports = camelToSpaced;