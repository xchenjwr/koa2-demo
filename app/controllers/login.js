"use strict";
const jwt = require("jsonwebtoken");

const login = {
  async index(ctx, next) {
    ctx.data = "测试";
    return next();
  },
  async login(ctx, next) {
    const results = await ctx.services.login.login(ctx.request.body.account);
    if (results.length == 0) {
      ctx.data = false;
      ctx.msg = "账号不存在";
    } else if (ctx.request.body.password !== results[0].password) {
      ctx.data = false;
      ctx.msg = "账号或密码错误";
    } else {
      const token = jwt.sign({ userid: results[0].id }, ctx.config.secret, {
        expiresIn: "30d",
      });
      ctx.data = token;
      ctx.msg = "登录成功";
    }
    return next();
  },
  async register(ctx, next) {
    if (ctx.request.body.password !== ctx.request.body.repassword) {
      ctx.data = false;
      ctx.msg = "两次密码输入不一致";
    } else {
      const username = "用户" + Date.parse(new Date()) / 1000;
      const result = await ctx.services.login.register(
        ctx.request.body.account,
        ctx.request.body.password,
        username
      );
      ctx.data = result;
      ctx.msg = result? "注册成功" : "注册失败,账号重复";
    }
    return next();
  },
};

module.exports = login;
