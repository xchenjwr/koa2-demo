"use strict";

const config = require("../../config");
const services = require("../services");
module.exports = async (ctx, next) => {
  ctx.config = config;
  ctx.services = services;
  await next();
};
