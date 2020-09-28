'use strict';

const Redis = require('ioredis');
const config = require('../config');

const redisClient = new Redis(config.redis.uri);

redisClient.on('connect', () => {
  console.info('redis connected');
});

redisClient.on('error', err => {
  console.error('redis error: ' + err);
});

module.exports = redisClient;
