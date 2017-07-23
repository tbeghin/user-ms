'use strict';

const _ = require('lodash');
const mongo = require('../../../../mongo');
const TreeviewDao = require('./TreeviewDao').usersDAO;
const ObjectID = require('mongodb').ObjectID;

/**
 * Get All users
 * @returns {Promise.<TResult>}
 */
function getAll() {
    return mongo.getDao(TreeviewDao).then(function (treeviewDao) {
        let query = {};
        return treeviewDao.find(query).then(function (treeview) {
            if (_.isEmpty(treeview)) {
                return [];
            }
            let childrenElt =  _.filter(treeview, item => item.parent);
            let mainItem = _.filter(treeview, item => !item.parent);
            _.forEach(childrenElt, elt => {
                _.map(mainItem, main => {
                    if(main._id.toHexString() === elt.parent.toHexString()){
                        if (!main.children){
                            main.children = []
                        }
                        main.children.push(elt);
                    }
                })
            });
            return mainItem;
        });
    });
}

/**
 * Updating an existing user in the bdd
 * @param {object} user - the user to update
 * @returns {Promise.<TResult>}
 */
function update(user) {
    return mongo.getDao(TreeviewDao).then(
        function (usersDAO) {
            let userWithObjectId = _.clone(user, true);
            userWithObjectId._id = new ObjectID(user._id);
            return usersDAO.save(userWithObjectId);
        }
    ).catch(handleError);
}

/**
 * Add a new user
 * @param user
 * @returns {Promise.<TResult>}
 */
function add(user) {
    return mongo.getDao(TreeviewDao).then(
        function (usersDAO) {
            return usersDAO.save(user);
        }
    ).catch(handleError);
}

function handleError(exception) {
    console.log(`Exception : ${exception}`);
    return exception;
}

exports.getAll = getAll;
exports.update = update;
exports.add = add;