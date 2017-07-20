'use strict';

const _ = require('lodash');
const mongo = require('../../../../mongo');
const UsersDao = require('./UsersDao').usersDAO;
const ObjectID = require('mongodb').ObjectID;

/**
 * Get All users
 * @returns {Promise.<TResult>}
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
 * Get an users by id
 * @param id
 * @returns {Promise.<TResult>}
 */
function get(id) {
    return mongo.getDao(UsersDao).then(function (usersDao) {
        let query = {"_id": new ObjectID(id)};
        return usersDao.findOne(query).then(function (users) {
            if (_.isEmpty(users)) {
                return {};
            }
            return users;
        });
    });
}

/**
 * Updating an existing user in the bdd
 * @param {object} user - the user to update
 * @returns {Promise.<TResult>}
 */
function update(user) {
    return mongo.getDao(UsersDao).then(function (usersDAO) {
        let userWithObjectId = _.clone(user, true);
        userWithObjectId._id = new ObjectID(user._id);
        return usersDAO.save(userWithObjectId);
    });
}

/**
 * Add a new user
 * @param user
 * @returns {Promise.<TResult>}
 */
function add(user) {
    return mongo.getDao(UsersDao).then(function (usersDAO) {
        return usersDAO.save(user);
    });
}

/**
 * Remove an user by id
 * @param {string} id - criteria in order to remove an url - corresponds to the urlId field in the mongodb collection
 * @returns {Promise.<TResult>}
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