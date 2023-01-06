const express = require("express");
const chats = require("./data/data");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");


const app = express();
app.use(cors());
dotenv.config();
connectDB();


app.get("/", (req, res) => {
    res.send("Api is running");
});



app.get("/api/chat", (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    // console.log(req.params.id)
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`);
});