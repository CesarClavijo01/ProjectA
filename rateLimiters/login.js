const rateLimit = require("express-rate-limit");
const responses = require("../responses")

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        const timeoutSeconds = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000) || 0;
        res.status(429).json(
            responses.error({
                name: "Request",
                message: "Too many login attempts.",
                data: { timeoutSeconds }
            })
        )
    }
});

module.exports = loginLimiter;