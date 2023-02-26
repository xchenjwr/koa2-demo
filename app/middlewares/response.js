"use strict";
// 这个middleware用于将ctx.result中的内容最终回传给客户端
// 回传的格式遵循这样的格式：{ code: 0, msg: any data: any }
const responseHandler = (ctx) => {
  if (ctx.data !== undefined) {
    ctx.type = "json";
    ctx.body = {
      code: 200,
      msg: ctx.msg || "",
      data: ctx.data,
    };
  }
};

const errorHandler = (ctx, next) => {
  return next().catch((err) => {
    if (err.code == null) {
      ctx.logger.error(err.stack);
    }
    ctx.body = {
      code: err.code || -1,
      data: null,
      msg: err.message,
    };
    ctx.status = 200;
    return Promise.resolve();
  });
};

module.exports = {
  responseHandler,
  errorHandler,
};
