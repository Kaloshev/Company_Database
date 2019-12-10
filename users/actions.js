const connection = require("../database");
const validator = require("../helper");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');


//Ako si admin ke mozes site useri da gi vidis
getAllUsersQuery = () => {
    const query = "SELECT * FROM user"
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

getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error)
    }
};

getSpecificUserQuery = (id) => {
    const query = "SELECT * FROM user WHERE id = ?"
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

getSpecificUser = async (req, res, next) => {
    if (req.params.id <= 0) {
        var error = new Error("Id cannot be 0 or less then 0");
        error.status = 401
        next(error)
    }
    try {
        const specificUser = await getSpecificUserQuery(req.params.id);
        res.status(200).send(specificUser);
    } catch (error) {
        res.status(500).send(error);
    }
};


//Create na user 
createUserQuery = (email, password) => {
    const query = "INSERT INTO user(email, password , created_on) VALUES (?,?, NOW())"
    return new Promise((resolve, reject) => {
        connection.query(query, [email, password], function (error, results, fields) {
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
//Da smislam podobar validator da vidam dali ima i dali ima potreba voopsto za validator na email
createUser = async (req, res) => {
    // var isValidEmail = validator.emailValidator(req.body.email);
    // if (!isValidEmail) {
    //     var error = new Error("E-mail is too short");
    //     error.status = 401;
    //     next(error)
    // } else {
    try {
        const userRequest = req.body;
        const passHash = bcrypt.hashSync(userRequest.password, 10);
        const createdUser = await createUserQuery(req.body.email, passHash);
        res.status(200).send(createdUser)
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}
// }
//update na userot
updateUserQuery = (email, password, id) => {
    const query = "UPDATE user SET email = ?, password = ? , last_update = now() WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.query(query, [email, password, id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                if (results.affectedRows == 0) {
                    reject(`No user found with id -> ${id}`)
                    // console.log(results);
                } else {
                    resolve(results)
                }
            }
        })
    })
}

updateUser = async (req, res) => {
    try {
        const update = req.body;
        const passHash = bcrypt.hashSync(update.password, 10);
        const updatedUser = await updateUserQuery(update.email, passHash, req.params.id);
        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(500).send(error)
        console.log("error");
    }
}

//Soft Delete user
softDeleteQuery = (id) => {
    // const query = "UPDATE user SET email = ?, password = admin, deleted_at = now() where id = ?"
    const query = "UPDATE user SET deleted_at = now() where id = ?"
    return new Promise((resolve, reject) => {
        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                if (results.affectedRows == 0) {
                    reject(`No user found with id -> ${id}`)
                } else {
                    resolve(results)
                }
            }
        })
    })
}

softDelete = async (req, res) => {
    try {
        const softDeletedUser = await softDeleteQuery(req.params.id)
        res.status(200).send(softDeletedUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

undoSoftDeleteQuery = (id) => {
    const query = "UPDATE user SET deleted_at = null where id = ?"
    return new Promise((resolve, reject) => {
        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                if (results.affectedRows == 0) {
                    reject(`No user found with id -> ${id}`)
                } else {
                    resolve(results)
                }
            }
        })
    })
}

undoSoftDelete = async (req, res) => {
    try {
        const undoSoftDeletedUser = await undoSoftDeleteQuery(req.params.id)
        res.status(200).send(undoSoftDeletedUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

//DELETE user 
deleteUserQuery = (id) => {
    const query = "DELETE FROM user WHERE id = ?";
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

deleteUser = async (req, res) => {
    try {
        const deletedUser = deleteUserQuery(req.params.id);
        res.status(200).send(deletedUser)
    } catch (error) {
        res.status(500).send(error);
        console.log("error");
    }
}
getUserByEmailQuery = (email) => {
    const query = "SELECT * FROM user WHERE email = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [email], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                resolve(results);
            };
        });
    });

}

logInUser = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    try {
        const user = await getUserByEmailQuery(email)
        var newUser = user[0];
        const matchPass = bcrypt.compareSync(pass, newUser.password)
        if (matchPass) {
            var token = jwt.sign({ newUser }, 'aaaa', { expiresIn: "1h" });
            // res.status(200).send("Password match");
            res.status(200).send(token);
            console.log(matchPass);

        } else {
            res.status(401).send("WRONG PASSWORD");
            console.log(matchPass);

        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    logInUser,
    getAllUsers,
    getSpecificUser,
    createUser,
    updateUser,
    deleteUser,
    softDelete,
    undoSoftDelete

}