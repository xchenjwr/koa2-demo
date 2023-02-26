"use strict";
const MySequelize = require("../../lib/sequelize");
const login = {
  async login(account) {
    const [results, metadata] = await MySequelize.query(
      `select id,password from users where account=${account}`
    );
    return results;
  },
  async register(account, password, username) {
    const [results, metadata] = await MySequelize.query(
      `select account from users where account=${account}`
    );
    if (results.length != 0) {
      return false;
    }
    try {
      await MySequelize.models.user.create({
        account,
        password,
        username,
      });
    } catch (err) {
      throw { code: 5001, message: err.message };
    }
    return true;
  },
};

module.exports = login;
