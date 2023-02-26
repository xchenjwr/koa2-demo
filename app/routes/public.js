"use strict";
const Router = require("koa-router");
const controllers = require("../controllers");

const router = new Router();
router.prefix("/api");


router.post("/login", controllers.login.login);
router.post("/register", controllers.login.register);

module.exports = router;
