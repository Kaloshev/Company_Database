const jwt = require('jsonwebtoken');

checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');

        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403)
    }
}

verifyToken = (req, res,next) => {
    jwt.verify(req.token, 'aaaa', (err, data) => {
        if(err){
            res.status(403).send('Invalid token');
        } else {
            next();
        };
    });
};

checkIfAdmin = (req, res, next) => {
    jwt.verify(req.token, 'aaaa', (err, data) => {
        console.log(data.newUser.admin);
        if (!data.newUser.admin)
            res.status(403).send('Invalid authorisation');
        else next();
    });
}

module.exports = {
    checkToken,
    verifyToken,
    checkIfAdmin

}