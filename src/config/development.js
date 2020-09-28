'use strict';

const config = {
  port: 15800,
  environment: 'development',
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dev',
    options: {
      poolSize: 10,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  redis: {
    uri: process.env.REDIS_URI || 'redis://localhost:6379',
  },
};

module.exports = config;
