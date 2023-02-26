"use strict";
const fs = require("fs");
const files = fs.readdirSync(__dirname).filter((file) => file !== "index.js");
const MySequelize = require("../../lib/sequelize");
let models = {};

for (const file of files) {
  if (file.toLowerCase().endsWith("js")) {
    const model = require(`./${file}`);
    models[`${file.replace(/\.js/, "")}`] = model;
  }
}

MySequelize.sync({ alter: true });

module.exports = models;
