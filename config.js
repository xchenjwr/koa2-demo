"use strict";

const path = require("path");
const fs = require("fs");

module.exports = {
  baseUrl: "127.0.0.1:3001/",
  port: "3001",
  secret: "xchenjwr",
  publicDir: path.resolve(__dirname, "./app/public"),
  logPath: path.resolve(__dirname, "./logs/log.log"),
  mysql: {
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "myapp",
  },
  koaBody: {
    multipart: true, // 支持文件上传
    // encoding: "gzip",
    formidable: {
      uploadDir: path.join(__dirname, "/app/public/upload/"), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 20 * 1024 * 1024, // 文件上传大小
    },
  },
};
