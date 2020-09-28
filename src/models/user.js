'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const UserModel = mongoose.model('user', userSchema, 'user');

module.exports = UserModel;
