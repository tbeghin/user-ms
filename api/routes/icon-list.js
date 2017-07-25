'use strict';
const iconList = require('../controllers/icon-list.ctrl');

module.exports = function (router) {
    router.get('/icon', function (req, res) {
        iconList.getAll().then(function (datas) {
            res.json(datas);
        });
    });

    router.post('/icon', function (req, res) {
        iconList.add(req.body).then(function (datas) {
            res.json(datas);
        });
    });
};