'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { uri, options } = require('../config').mongodb;

let conn = null;

module.exports.connect = async () => {
  if (conn) {
    return conn;
  }
  return new Promise((resolve, reject) => {
    conn = mongoose.connect(uri, options);
    mongoose.connection.on('error', err => {
      err.message = `[mongoose]${err.message}`;
      console.error(err);
      reject(err);
    });

    mongoose.connection.on('disconnected', () => {
      console.error(`[mongoose] ${uri} disconnected`);
    });

    mongoose.connection.on('connected', () => {
      console.info(`[mongoose] ${uri} connected`);
    });
    resolve(conn);
  });
};

module.exports.get = () => {
  return conn;
};
