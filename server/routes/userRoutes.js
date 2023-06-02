const controller = require('../controllers/userController');
const {verifyCookie} = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/createUser', controller.registerUser);
    app.post('/api/loginUser', controller.loginUser);
    app.put('/api/updateUser', verifyCookie, controller.updateUser);
    app.get('/api/logout', verifyCookie, controller.logout);
    app.delete('/api/deleteUser', verifyCookie, controller.deleteUser);
}