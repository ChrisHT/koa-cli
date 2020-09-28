'use strict';

global.Promise = require('bluebird');
global.logger = require('./lib/Logger');

const config = require('./config');
const Koa = require('koa');
const http = require('http');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true);
  await next();
});

app.use(cors());
app.use(bodyParser());

app.use(async (ctx, next) => {
  if (ctx.request.method === 'OPTIONS') {
    ctx.body = 'ok';
  } else {
    await next();
  }
});

let server;

async function init() {
  await Promise.all([require('./database/mongodb').connect()]);

  const router = require('./router');
  app.use(router.routes()).use(router.allowedMethods());

  server = http.createServer(app.callback());
  server.listen(config.port);
  console.info('=========================================');
  console.info(`server started,listen on ${config.port}`);
  console.info('=========================================');
  return server;
}

module.exports = init();
