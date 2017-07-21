'use strict';
const jwt = require('jsonwebtoken');
const users = require('../controllers/users.ctrl');

module.exports = function (router) {
    router.post('/authenticate', function (req, res) {
        let token = '';
        let username = req.body.username;
        let password = req.body.password;
        users.getUserByName(username, password).then(
            user => {
                if (user && Object.keys(user).length > 0) {
                    token = jwt.sign(
                        user,
                        'calligrammePass',
                        {expiresIn: 60 * 60});
                }
                res.json({token: token});
            }
        );
    });
};