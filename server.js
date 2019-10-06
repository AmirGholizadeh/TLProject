const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB connection succesful'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})