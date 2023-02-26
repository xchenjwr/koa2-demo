"use strict";

const Koa = require("koa");
const { koaBody } = require("koa-body");
const koaStatic = require("koa-static");
// const cors = require("koa2-cors");
const helmet = require("koa-helmet");

const config = require("../config");
const publicRouter = require("./routes/public");
const privateRouter = require("./routes/private");
const loggerMiddleware = require("./middlewares/logger");
const { errorHandler, responseHandler } = require("./middlewares/response");
const common = require("./middlewares/common");
// const { corsHandler } = require("./middlewares/cors");

const app = new Koa();
// console.log(process.env.NODE_ENV)
// Logger
app.use(common);

app.use(loggerMiddleware);

// Error Handler
app.use(errorHandler);

// Global Middlewares
app.use(koaBody(config.koaBody));
app.use(koaStatic(config.publicDir));

// Helmet
app.use(helmet());

// Cors 需要跨域时再进行设置
// app.use(cors(corsHandler));

// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods());
app.use(privateRouter.routes(), privateRouter.allowedMethods());

// Response
app.use(responseHandler);

module.exports = app;
