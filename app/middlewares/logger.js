"use strict";

const fs = require("fs");
const path = require("path");
const log4js = require("log4js");

const logger = async (ctx) => {
  const logsDir = path.parse(ctx.config.logPath).dir;
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  log4js.configure({
    appenders: {
      console: { type: "console" },
      dateFile: {
        type: "dateFile",
        filename: ctx.config.logPath, // 文件名
        pattern: "yyyy-MM-dd", // 日志模式
        keepFileExt: true,
        alwaysIncludePattern: true,
        daysToKeep: 30, // 日志保留期限
      },
    },
    categories: {
      default: {
        appenders: ["console", "dateFile"],
        level: "debug",
      },
    },
    pm2: true,
  });
  ctx.logger = log4js.getLogger("[Default]");
};

const loggerMiddleware = async (ctx, next) => {
  const start = new Date();
  await logger(ctx);
  await next();
  const ms = new Date() - start;

  const remoteAddress =
    ctx.headers["x-forwarded-for"] ||
    ctx.ip ||
    ctx.ips ||
    (ctx.socket &&
      (ctx.socket.remoteAddress ||
        (ctx.socket.socket && ctx.socket.socket.remoteAddress)));
  let logText = `${ctx.method} ${ctx.status} ${
    ctx.url
  } 请求参数:${JSON.stringify(ctx.request.body)} 响应参数:${JSON.stringify(
    ctx.body
  )} - ${remoteAddress} - ${ms}ms`;
  if (process.env.NODE_ENV != "test") {
    ctx.logger.info(logText);
  }
};

module.exports = loggerMiddleware;
