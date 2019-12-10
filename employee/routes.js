const express = require("express");
const actions = require("./actions");

var routes = express.Router();

routes.get('/employee/:id', actions.getSpecificEmployee);
routes.get('/GroupEmpByGender', actions.getGroupEmpByGender);
routes.put('/employee/:id', actions.updateEmployee);

module.exports = routes;