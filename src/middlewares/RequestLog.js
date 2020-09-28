'use strict';

const uuidv1 = require('uuid/v1');

module.exports = async (ctx, next) => {
  const start = new Date();
  ctx.reqId = uuidv1();
  logger.info('req', ctx.method, '-', ctx.reqId, ctx.url);
  logger.info('headers', ctx.headers);
  logger.info('query', JSON.stringify(ctx.query));
  logger.info('body', JSON.stringify(ctx.request.body));
  await next();
  const ms = new Date() - start;
  logger.info(
    'res',
    ctx.method,
    `${ms}ms`,
    ctx.reqId,
    ctx.url,
    ctx.resAsFile ? 'res file' : JSON.stringify(ctx.body)
  );
};
