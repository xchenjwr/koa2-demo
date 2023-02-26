"use strict";
const MySequelize = require("../../lib/sequelize");
const user = {
  async edit(author, content, filepath) {
    filepath = JSON.stringify(filepath);
    try {
      await MySequelize.models.blog.create({
        author,
        content,
        filepath,
      });
    } catch (err) {
      throw { code: 5001, message: err.message };
    }
    return true;
  },
};

module.exports = user;
