const JsonWebToken = require('jsonwebtoken');

module.exports.verifyCookie = (request, response, next) => {
    JsonWebToken.verify(request.cookies.userToken, process.env.Project_key, (err, payload) => {
        if (err) {
            response.status(401).json({verified: false});
        } else{
            next();
        }
    })
}
