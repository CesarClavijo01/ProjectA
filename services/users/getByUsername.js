const { User } = require('../../models');
const { Op } = require('sequelize');
const { getPaginationParams } = require('../../util');

async function getUsersByUsernameService(data) {

  const {
    username,
    limit,
    page
  } = data;

  const MIN_SEARCH_LENGTH = 3;
  const { nLimit, nOffset } = getPaginationParams({ limit, page });

  // Validate username length
  if (!username || username.length < MIN_SEARCH_LENGTH) {
    console.log("Hello")
    const clientError = {
      name: "ShortQuery",
      message: `Username query must be ${MIN_SEARCH_LENGTH} characters minimum.`,
      statusCode: 400
    };

    throw clientError;
  };

  try {
    const users = await User.scope('search').findAll({
      where: {
        username: {
          [Op.iLike]: `${username}%`
        }
      },
      limit: nLimit,
      offset: nOffset
    });

    if (users.length === 0) {
      const clientError = {
        name: "UsersNotFound",
        message: "No users found with that username.",
        statusCode: 404
      };
      throw clientError;
    };
    return users;

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
  };
};

module.exports = getUsersByUsernameService;