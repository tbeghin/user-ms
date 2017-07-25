'use strict';

const _ = require('lodash');
const mongo = require('../../../../mongo');
const IconListDao = require('./IconListDao').usersDAO;
const ObjectID = require('mongodb').ObjectID;

/**
 * Get All users
 * @returns {Promise.<TResult>}
 */
function getAll() {
    return mongo.getDao(IconListDao).then(function (iconListDao) {
        let query = {};
        return iconListDao.find(query).then(function (icon) {
            if (_.isEmpty(icon)) {
                return [];
            }
            return icon;
        });
    });
}

/**
 * Add a new user
 * @param user
 * @returns {Promise.<TResult>}
 */
function add(icon) {
    return mongo.getDao(IconListDao).then(
        function (iconDAO) {
            return iconDAO.save(icon);
        }
    ).catch(handleError);
}

function handleError(exception) {
    console.log(`Exception : ${exception}`);
    return exception;
}

exports.getAll = getAll;
exports.add = add;