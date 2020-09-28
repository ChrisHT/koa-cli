'use strict';

const UserModel = require('../models/user');
const ErrorCode = require('../lib/ErrorCode');

const createUser = async data => {
  let user = await UserModel.findOne({ name: data.name });
  if (user) {
    throw ErrorCode.USER_EXISTS;
  }
  let _user = await UserModel.create({
    name: data.name,
    age: data.age,
  });
  return {
    id: _user._id,
  };
};

module.exports = {
  createUser,
};
