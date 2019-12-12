const connection = require("../database");
const validator = require("../helper");



//Ako si admin ke mozes site useri da gi vidis
getAllClientsQuery = () => {
    const query = "SELECT * FROM client"
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
};

getAllClients = async (req, res) => {
    try {
        const clients = await getAllClientsQuery();
        res.status(200).send(clients);
    } catch (error) {
        res.status(500).send(error)
    }
};

getSpecificClientQuery = (id) => {
    const query = "SELECT * FROM client WHERE client_id = ?"
    return new Promise((resolve, reject) => {
        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
};

getSpecificClient = async (req, res, next) => {
    if (req.params.id <= 0) {
        var error = new Error("Id cannot be 0 or less then 0");
        error.status = 401
        next(error)
    }
    try {
        const specificClient = await getSpecificClientQuery(req.params.id);
        res.status(200).send(specificClient);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Create na client 
createClientQuery = (client_id, client_name, branch_id) => {
    const query = "INSERT INTO client(client_id,client_name, branch_id) VALUES (?,?,?)"
    return new Promise((resolve, reject) => {
        connection.query(query, [client_id, client_name, branch_id], function (error, results, fields) {
            if (error) {
                reject(error)
                console.log(error);

            } else {
                resolve(results)
                console.log(resolve);

            }
        })
    })
}


createClient = async (req, res) => {
    try {
        const createdClient = await createClientQuery(req.body.client_id, req.body.client_name, req.body.branch_id);
        res.status(200).send(createdClient)
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

updateClientQuery = (client) => {
    const query = "UPDATE client SET client_name = ?, branch_id = ? WHERE client_id = ?";
    return new Promise((resolve, reject) => {
        connection.query(query, [client.client_name, client.branch_id, client.client_id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                if (results.affectedRows == 0) {
                    reject("Nema branch so takvo ID")
                    console.log(results);

                } else {
                    resolve(results)
                }
            }
        })
    })
}

updateClient = async (req, res) => {
    try {
        const update = req.body;
        const updatedClient = await updateClientQuery(update.client_name, update.branch_id, req.params.id);
        res.status(200).send(updatedClient)
    } catch (error) {
        res.status(500).send(error)
        console.log("error");
    }
}
//Soft Delete client
softDeleteQuery = (id) => {
    const query = "UPDATE client SET deleted_at = now() where client_id = ?"
    return new Promise((resolve, reject) => {
        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                if (results.affectedRows == 0) {
                    reject(`No client found with client_id -> ${id}`)
                } else {
                    resolve(results)
                }
            }
        })
    })
}

softDelete = async (req, res) => {
    try {
        const softDeletedClient = await softDeleteQuery(req.params.id)
        res.status(200).send(softDeletedClient)
    } catch (error) {
        res.status(500).send(error)
    }
}

undoSoftDeleteQuery = (id) => {
    const query = "UPDATE client SET deleted_at = null where client_id = ?"
    return new Promise((resolve, reject) => {
        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                if (results.affectedRows == 0) {
                    reject(`No client found with id -> ${id}`)
                } else {
                    resolve(results)
                }
            }
        })
    })
}

undoSoftDelete = async (req, res) => {
    try {
        const undoSoftDeletedClient = await undoSoftDeleteQuery(req.params.id)
        res.status(200).send(undoSoftDeletedClient)
    } catch (error) {
        res.status(500).send(error)
    }
}


//DELETE client
deleteClientQuery = (id) => {
    const query = "DELETE FROM client WHERE client_id = ?";
    return new Promise((resolve, reject) => {
        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

deleteClient = async (req, res) => {
    try {
        const deletedClient = deleteClientQuery(req.params.id);
        res.status(200).send(deletedClient)
    } catch (error) {
        res.status(500).send(error);
        console.log("error");
    }
}


module.exports = {
    getAllClients,
    getSpecificClient,
    createClient,
    updateClient,
    deleteClient,
    undoSoftDelete,
    softDelete
}