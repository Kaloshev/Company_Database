const express = require("express");
const actions = require("./actions");

var routes = express.Router();

routes.get('/clients', actions.getAllClients);
routes.get('/clients/:id', actions.getSpecificClient);
routes.post('/clients/create', actions.createClient);
routes.put('/clients/:id', actions.updateClient);
routes.delete("/clients/delete/:id", actions.deleteClient)


module.exports = routes;