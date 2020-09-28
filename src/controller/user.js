'use strict';

const UserService = require('../service/user');
const Joi = require('../lib/Joi');

class UserController {
  static async createUser(ctx) {
    let params = ctx.request.body;
    let schema = {
      name: Joi.string().required(),
      age: Joi.number().required(),
    };
    let data = Joi._validate(params, schema);
    ctx.body = await UserService.createUser(data);
  }


}

module.exports = UserController;
