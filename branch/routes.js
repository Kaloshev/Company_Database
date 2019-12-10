const express = require("express");
const actions = require("./actions");

var routes = express.Router();

routes.get('/branchs', actions.getAllBranches);
routes.get('/branches/:id', actions.getSpecificBranch);
routes.post('/branches/create', actions.createBranch);
routes.put('/branches/:id', actions.updateBranch);
routes.delete("/branches/delete/:id", actions.deleteBranch)


module.exports = routes;