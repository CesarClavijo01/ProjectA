const rateLimit = require("express-rate-limit");
const responses = require("../responses")

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        const timeoutSeconds = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000) || 0;
        res.status(429).json(
            responses.error({
                name: "Request",
                message: "Too many requests.",
                data: { timeoutSeconds }
            })
        )
    }
});

module.exports = globalLimiter;