'use strict';

module.exports = async (ctx, next) => {
  try {
    await next();
    if (ctx.resAsFile) {
      return;
    }
    ctx.body = {
      code: 0,
      msg: 'success',
      data: ctx.body || {},
    };
  } catch (err) {
    if (err.isValid) {
      let msg = err.message;
      logger.info('joi validate err:', msg);
      ctx.status = 400;
      ctx.body = {
        code: 400,
        msg,
      };
    } else if (err instanceof Error) {
      logger.error(err);
      ctx.status = 500;
      ctx.body = {
        code: 500,
        msg: '服务器错误',
      };
    } else {
      ctx.body = {
        code: err.code,
        msg: err.msg,
      };
    }
  }
};
