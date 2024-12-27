const { User } = require('../../models');
const { emailRegex } = require("../../regex");
const responses = require("../../responses");
const passwordHandler = require("../../password");
const { generateJWT } = require('../../auth');

const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json(
            responses.error({
                name: "LoginUser",
                message: "Please supply both fields."
            })
        );
    };
    const whereClause = emailRegex.test(identifier) ? { email: identifier } : { username: identifier };

    try {
        const foundUser = await User.scope("login").findOne({ where: whereClause });

        if (!foundUser || !passwordHandler.compare(password, foundUser.hash)) {
            return res.status(404).json(
                responses.error({
                    name: "LoginUser",
                    message: "Invalid username/email/password."
                })
            );
        };

        const user = { ...foundUser.toJSON() };
        delete user.hash;

        const token = generateJWT(user.id)

        return res.status(200).json(
            responses.success({
                message: "Logged in.",
                data: {
                    user,
                    token
                }
            })
        );

    } catch (error) {
        return res.status(500).json(
            responses.error({
                name: "LoginUser",
                message: "Internal server error."
            })
        );
    };
};

module.exports = loginUser;