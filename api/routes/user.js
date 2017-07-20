'use strict';
const users = require('../controllers/users.ctrl');

module.exports = function(router) {
	// Get the version of the application from the package.json file
	router.get('/version', function (req, res) {
        let currentVersion = {"version":require('../../package.json').version};
		console.log(currentVersion);
    	res.json(currentVersion);
    });

    // Get all users
    router.get('/users', function (req, res) {
		users.getAll().then(function(datas){
			res.json(datas);
    	});
    });

    // Get all users
    router.get('/users/:id', function (req, res) {
        users.get(req.params.id).then(function(datas){
            res.json(datas);
        });
    });

    // Delete one task
	router.delete('/users/:id', function (req, res) {
		users.remove(req.params.id).then(function(datas){
			res.json(datas);
    	});
    });

    // Add a task
	router.post('/users/', function (req, res) {
		users.add(req.body).then(function(datas){
			res.json(datas);
    	});
    });

    // Update a task
    router.put('/users/', function (req, res) {
        users.update(req.body).then(function(datas){
            res.json(datas);
        });
    });
};