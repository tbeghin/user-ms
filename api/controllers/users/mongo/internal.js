'use strict';

const _ = require('lodash');
const mongo = require('../../../../mongo');
const UsersDao = require('./UsersDao').usersDAO;
const ObjectID = require('mongodb').ObjectID;

/**
 * Get All users
 */
function getAll() {
    return mongo.getDao(UsersDao).then(function (usersDao) {
        let query = {};
        return usersDao.find(query).then(function (users) {
            if (_.isEmpty(users)) {
                return [];
            }
            return users;
        });
    });
}

/**
 * Get All users
 */
function get(id) {
    return mongo.getDao(UsersDao).then(function (usersDao) {
        let query = {_id: id};
        return usersDao.findOne(query).then(function (users) {
            console.log(users);
            if (_.isEmpty(users)) {
                return [];
            }
            return users;
        });
    });
}

/**
 * Updating an existing user in the bdd
 * @param {object} user - the user to update
 */
function update(user) {
    return mongo.getDao(UsersDao).then(function (usersDAO) {
        let userWithObjectId = _.clone(user, true);
        userWithObjectId._id = new ObjectID(user._id);
        return usersDAO.save(userWithObjectId);
    });
}

function add(user) {
    return mongo.getDao(UsersDao).then(function (usersDAO) {
        return usersDAO.save(user);
    });
}

/**
 * Remove an url by id
 * @param {string} id - criteria in order to remove an url - corresponds to the urlId field in the mongodb collection
 */
function remove(id) {
    return mongo.getDao(UsersDao).then(function (usersDAO) {
        return usersDAO.remove({_id: new ObjectID(id)});
    });
}

exports.get = get;
exports.getAll = getAll;
exports.remove = remove;
exports.update = update;
exports.add = add;