const express = require("express");
const sendmail = require("./sendEmail");

var routes = express.Router();

routes.get('/sendmail', sendmail.sendEmail);



module.exports = routes;