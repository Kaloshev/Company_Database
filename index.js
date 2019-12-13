const express = require("express");
const bodyParser = require("body-parser");
require("dotenv/config");
const appRouter = require("./router");
const middleware = require("./middleware/common");
const errorHandler = require("./middleware/errorHandler");
var unless = require('express-unless');
var jwt = require('express-jwt');

const app = express()

app.use(middleware.logger)


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const poublicRoutePaths = ["/login", "/users/create"]
app.use(jwt({ secret: "aaaa" }).unless({ path: poublicRoutePaths }))

app.use(appRouter);

app.use(middleware.wrongRoute);
app.use(errorHandler.errHandler);


var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`API is listening on port ${port}!`)
})