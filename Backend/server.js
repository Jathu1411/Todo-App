const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const todoRouter = require('./routes/todoRoute');

app.use('/api/todos', todoRouter);

const PORT = process.env.PORT || 8081;
const URI = process.env.MONGODB_URI;


mongoose.connect(URI).then(() => {
    console.log("MongoDB database connection established successfully");
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});