const { emailRegex, emailTest } = require('./email')
const { usernameRegex, usernameTest } = require('./username')
module.exports = {
    emailRegex,
    emailTest,
    usernameRegex,
    usernameTest,
    isProfane: require('./isProfane')
}