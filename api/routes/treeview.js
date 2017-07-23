'use strict';
const treeview = require('../controllers/treeview.ctrl');

module.exports = function (router) {
    router.get('/treeview', function (req, res) {
        treeview.getAll().then(function (datas) {
            res.json(datas);
        });
    });

    router.post('/treeview', function (req, res) {
        treeview.add(req.body).then(function (datas) {
            res.json(datas);
        });
    });
};