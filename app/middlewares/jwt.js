"use strict";

const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
  // 解密的同时进行验证
  try {
    if (typeof ctx.request.headers.authorization === "string") {
      const token = ctx.request.headers.authorization.slice(7);
      ctx.jwtData = jwt.verify(token, ctx.config.secret);
    } else {
      throw { code: 403, message: "没有权限" };
    }
  } catch (err) {
    throw { code: 403, message: "没有权限" };
  }
  await next();
};
