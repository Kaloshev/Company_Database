const connection = require("../database");
const validator = require("../helper");


getSpecificEmployeeQuery = (id) => {
    const query = "SELECT * FROM user JOIN employee ON user.id = employee.user_id WHERE user.id = ?"
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

getSpecificEmployee = async (req, res) => {
    try {
        const specificEmployee = await getSpecificEmployeeQuery(req.params.id)
        res.status(200).send(specificEmployee)
    } catch (error) {
        res.status(500).send(error)
    }
}

updateEmployeeQuery = (emp) => {
    const query = "UPDATE employee SET first_name = ?, last_name = ? , birth_date = ? , gender = ? , salary = ?, super_id = ?, branch_id = ? WHERE user_id = ?";
    return new Promise((resolve, reject) => {
        connection.query(query, [emp.first_name, emp.last_name, emp.birth_date, emp.gender, emp.salary, emp.super_id, emp.branch_id, user.id], function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                if (results.affectedRows == 0) {
                    reject("Nema user so takvo ID")
                    console.log(results);

                } else {
                    resolve(results)
                }
            }
        })
    })
}

updateEmployee = async (req, res) => {
    try {
        const update = req.body;
        const updatedEmployee = await updateEmployeeQuery(update.first_name, update.last_name, update.birth_date, update.gender, update.salary, update.super_id, update.branch_id, req.params.id);
        res.status(200).send(updatedEmployee)
    } catch (error) {
        res.status(500).send(error)
        console.log("error");
    }
}

getGroupEmpByGenderQuery = () => {
    const query = "SELECT COUNT(gender), gender FROM employee GROUP BY gender;"
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

getGroupEmpByGender = async (req, res) => {
    try {
        const groupEmpByGender = await getGroupEmpByGenderQuery()
        res.status(200).send(groupEmpByGender)
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    getSpecificEmployee,
    updateEmployee,
    getGroupEmpByGender
}