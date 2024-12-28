const { Op } = require('sequelize');
const { User } = require('../../models');
const responses = require('../../responses');
const { getPaginationParams } = require('../../util');

const searchUsersByUsername = async (req, res) => {
    const minSearchLength = 3;
    const maxLimit = 100;
    const { username, limit = 10, page = 0 } = req.query;
    const { nLimit, nOffset } = getPaginationParams({ limit, page, maxLimit })

    if (!username) {
        return res.status(400).json(
            responses.error({
                name: "InvalidQuery",
                message: "Username is missing from query."
            })
        );
    };

    if (username.length < minSearchLength) {
        return res.status(400).json(
            responses.error({
                name: "InvalidQuery",
                message: `Username query must be at least ${minSearchLength} characters.`
            })
        );
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
            return res.status(404).json(
                responses.error({
                    name: "UsersNotFound",
                    message: "No users with that username."
                })
            );
        };

        return res.status(200).json(
            responses.success({
                message: "Users fetched successfully.",
                data: {
                    users
                }
            })
        );
    } catch (error) {
        console.error(`Error while searching users: ${error}`);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while searching for users."
            })
        );
    };
};

module.exports = searchUsersByUsername;