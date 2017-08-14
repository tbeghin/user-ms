'use strict';
const treeview = require('../controllers/treeview.ctrl');
const q = require('q');

module.exports = function (router) {
    router.get('/treeview', function (req, res) {
        treeview.getAll().then(function (datas) {
            res.json(datas);
        });
    });

    router.post('/treeview', function (req, res) {
        if (req.body && Array.isArray(req.body)) {
            let promises = [];
            req.body.forEach(item => promises.push(treeview.add(item)));
            q.all(promises).then(response => res.json(response))
        } else {
            treeview.add(req.body).then(function (datas) {
                res.json(datas);
            });
        }
    });
};