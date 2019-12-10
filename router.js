var express = require("express")
var userRouter = require("./users/routes")
var branchRouter = require("./branch/routes")
var clientRouter = require("./clients/routes")
var empRouter = require("./employee/routes")

const appRouter = express.Router();

appRouter.use(userRouter);
appRouter.use(branchRouter);
appRouter.use(clientRouter);
appRouter.use(empRouter);

module.exports = appRouter;