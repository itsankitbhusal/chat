const express = require("express");
const chats = require("./data/data");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();


app.get("/", (req, res) => {
    res.send("Api is running");
});

// user endpoint
app.use("/api/user", userRoutes);

// error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`);
});