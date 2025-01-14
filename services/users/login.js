const { User } = require('../../models');
const { regexes } = require("../../regex");
const passwordHandler = require("../password");
const { generateJWT } = require('../../auth');
const { checkMissingFields } = require('../../util');

async function loginUserService(data) {

  const {
    identifier,
    password
  } = data;

  // Check that both fields are supplied
  const requiredFields = { identifier, password };
  checkMissingFields(requiredFields);

  // Build where clause, email or username
  const whereClause = regexes.email.test(identifier)
    ? { email: identifier }
    : { username: identifier };

  try {
    // Find the user
    const foundUser = await User.scope('login').findOne({ where: whereClause });

    // Verify user credentials
    const notUser = !foundUser || !await passwordHandler.compare(password, foundUser.hash)
    if (notUser) {
      const clientError = {
        name: "InvalidCredentials",
        message: "Invalid username/email/password.",
        statusCode: 400
      };
      throw clientError
    };

    // To JSON
    const user = { ...foundUser.toJSON() };

    // Delete password hash
    delete user.hash;

    // Generate JWT
    const token = generateJWT(user.id);

    // Return user and JWT
    return { user, token };
    
  } catch (error) {
    // If it is a client error, throw it
    if (error.statusCode) throw error;

    // If not, log it
    console.error(error)

    // Throw server error
    const serverError = {
      name: "InternalServer",
      message: "Error while fetching users.",
      statusCode: 500
    };
    throw serverError;
  }
};

module.exports = loginUserService;