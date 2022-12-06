const mongoose = require("mongoose");

const CredsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: { type: String, required: true },
});

module.exports = mongoose.model("creds", CredsSchema);
