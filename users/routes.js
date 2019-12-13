const express = require("express");
const actions = require("./actions");
const auth = require('../middleware/authentication')

var routes = express.Router();

routes.get('/users', [auth.checkToken,auth.verifyToken,auth.checkIfAdmin], actions.getAllUsers);
routes.get('/users/:id', actions.getSpecificUser);
routes.post('/users', actions.createUser);
routes.put('/users/:id', actions.updateUser);
routes.put('/users/undosd/:id', actions.undoSoftDelete);
routes.delete("/users/delete/:id", actions.deleteUser)
routes.delete("/users/softdelete/:id", actions.softDelete)
routes.post("/login", actions.logInUser);


module.exports = routes;