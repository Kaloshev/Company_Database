const express = require("express");
const actions = require("./actions");

var routes = express.Router();

routes.get('/users', actions.getAllUsers);
routes.get('/users/:id', actions.getSpecificUser);
routes.post('/users/create', actions.createUser);
routes.put('/users/:id', actions.updateUser);
routes.delete("/users/delete/:id", actions.deleteUser)
routes.post("/login", actions.logInUser);


module.exports = routes;