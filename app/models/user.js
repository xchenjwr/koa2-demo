"use strict";

const MySequelize = require("../../lib/sequelize");
const { DataTypes } = require("sequelize");

const User = MySequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    account: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    sex: {
      type: DataTypes.ENUM("男", "女"),
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fan: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    follow: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      { unique: true, fields: ["account"] },
      { unique: true, fields: ["username"] },
    ],
  }
);

module.exports = User;
