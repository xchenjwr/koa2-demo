"use strict";

const MySequelize = require("../../lib/sequelize");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Blog = MySequelize.define(
  "blog",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: User,
        key: "id",
      },
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    comment: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Blog;
