require('dotenv').config();
const express = require('express');
const db = require('./models');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

const socketHandler = require('./socket');
socketHandler(io);

// Security
const cors = require('cors')
app.use(cors({
    origin: "http://localhost:5173",
}));
const helmet = require('helmet');
app.use(helmet());

const { globalLimiter } = require("./rateLimiters");
app.use(globalLimiter);

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

require("./schedulers/taskRegistry");

// Sync database and start
const PORT = process.env.SERVER_PORT
db.sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });
}).catch((error) => {
    console.error(`Error starting server: ${error}`)
});