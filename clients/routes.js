const express = require("express");
const actions = require("./actions");

var routes = express.Router();

routes.get('/clients', actions.getAllClients);
routes.get('/clients/:id', actions.getSpecificClient);
routes.post('/clients', actions.createClient);
routes.put('/clients/:id', actions.updateClient);
routes.put('/clients/undosd/:id', actions.undoSoftDelete);
routes.delete("/clients/delete/:id", actions.deleteClient)
routes.delete("/clients/softdelete/:id", actions.softDelete)


module.exports = routes;