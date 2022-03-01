const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    block: {
        type: String,
        required: false
    },
    room: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);
module.exports = User;