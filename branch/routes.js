const express = require("express");
const actions = require("./actions");

var routes = express.Router();

routes.get('/branch', actions.getAllBranches);
routes.get('/branch/:id', actions.getSpecificBranch);
routes.post('/branch', actions.createBranch);
routes.put('/branch/:id', actions.updateBranch);
routes.delete("/branch/delete/:id", actions.deleteBranch)


module.exports = routes;