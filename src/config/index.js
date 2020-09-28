'use strict';

let config = {
  application: 'koa-cli',
  environment: process.env.NODE_ENV || 'development',
};

switch (config.environment) {
case 'production':
  config = { ...config, ...require('./production') };
  break;
case 'test':
  config = { ...config, ...require('./test') };
  break;
default:
  config = { ...config, ...require('./development') };
}

if (['production'].includes(config.environment)) {
  config.log4js = {
    appender: {
      type: 'dateFile',
      filename: '/logs/' + config.application + '/' + config.application + '.log',
    },
    level: 'info',
  };
} else {
  config.log4js = {
    appender: { type: 'stdout' },
    level: 'debug',
  };
}


module.exports = config;
