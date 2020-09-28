'use strict';

const log4js = require('log4js');
const config = require('../config');

let appenders = {};

appenders[config.application] = config.log4js.appender;

log4js.configure({
  appenders,
  categories: {
    default: {
      appenders: [config.application],
      level: config.log4js.level,
    },
  },
});
let logger = log4js.getLogger();

module.exports = logger;
