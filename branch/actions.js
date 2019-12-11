const connection = require("../database");
const validator = require("../helper");



//Ako si admin ke mozes site useri da gi vidis
getAllBranchesQuery = () => {
    const query = "SELECT * FROM branch"
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

getAllBranches = async (req, res) => {
    try {
        const branch = await getAllBranchesQuery();
        res.status(200).send(branch);
    } catch (error) {
        res.status(500).send(error)
    }
};

getSpecificBranchQuery = (id) => {
    const query = `SELECT * FROM branch WHERE branch_id = ${id}`
    //basic sqj injection 
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

getSpecificBranch = async (req, res, next) => {
    if (req.params.id <= 0) {
        var error = new Error("Id cannot be 0 or less then 0");
        error.status = 401
        next(error)
    }
    try {
        const specificBranch = await getSpecificBranchQuery(req.params.id);
        res.status(200).send(specificBranch);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Create na branch 
createBranchQuery = (branch_name) => {
    const query = "INSERT INTO branch(branch_name) VALUES (?)"
    return new Promise((resolve, reject) => {
        connection.query(query, [branch_name], function (error, results, fields) {
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


createBranch = async (req, res) => {
    try {
        const createdBranch = await createBranchQuery(req.body.branch_name);
        res.status(200).send(createdBranch)
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

updateBranchQuery = (branch) => {
    const query = "UPDATE branch SET branch_name = ?, mgr_id = ? , mgr_start_date = now() WHERE branch_id = ?";
    return new Promise((resolve, reject) => {
        connection.query(query, [branch.branch_name, branch.mgr_id, branch.branch_id], function (error, results, fields) {
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

updateBranch = async (req, res) => {
    try {
        const update = req.body;
        const updatedBranch = await updateBranchQuery(update.branch_name, update.mgr_id, req.params.id);
        res.status(200).send(updatedBranch)
    } catch (error) {
        res.status(500).send(error)
        console.log("error");
    }
}

//DELETE branch
deleteBranchQuery = (id) => {
    const query = "DELETE FROM branch WHERE branch_id = ?";
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

deleteBranch = async (req, res) => {
    try {
        const deletedBranch = deleteBranchQuery(req.params.id);
        res.status(200).send(deletedBranch)
    } catch (error) {
        res.status(500).send(error);
        console.log("error");
    }
}


module.exports = {
    getAllBranches,
    getSpecificBranch,
    createBranch,
    updateBranch,
    deleteBranch

}