"use strict";

const Router = require("koa-router");
const jwtMiddleware = require("../middlewares/jwt");
const controllers = require("../controllers");
const router = new Router();

router.prefix("/api");
router.use(jwtMiddleware);

router.get("/", controllers.login.index);
router.post("/edit", controllers.user.edit);
module.exports = router;
