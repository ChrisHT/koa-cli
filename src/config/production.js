'use strict';

const config = {
  port: 9800,
  environment: 'production',
  mongodb: {
    uri: process.env.MONGODB_URI || '',
    options: {
      poolSize: 10,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  redis: {
    uri: process.env.REDIS_URI || '',
  },
};

module.exports = config;
