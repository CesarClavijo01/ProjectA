require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models')

// Security
const cors = require('cors')
app.use(cors())
const helmet = require('helmet')
app.use(helmet())

const { attachUser } = require('./auth');
app.use(attachUser);

// JSON Formatting
app.use(express.json());

// API Routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes)

// False route handling
const responses = require("./responses")
app.use('*', (req, res) => {
    return res.status(404).json(
        responses.error({
            name: "Server",
            message: "The route you are looking for does not exist."
        })
    );
});

// Sync database and start
const PORT = process.env.SERVER_PORT
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });
}).catch((error) => {
    console.error(`Error starting server: ${error}`)
})