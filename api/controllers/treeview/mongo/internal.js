'use strict';

const _ = require('lodash');
const mongo = require('../../../../mongo');
const TreeviewDao = require('./TreeviewDao').usersDAO;
const ObjectID = require('mongodb').ObjectID;

/**
 * Get All treeview
 * @returns {Promise.<TResult>}
 */
function getAll() {
    return mongo.getDao(TreeviewDao).then(function (treeviewDao) {
        let query = {};
        return treeviewDao.find(query).then(function (treeview) {
            if (_.isEmpty(treeview)) {
                return [];
            }
            return treeview;
        });
    });
}

/**
 * Updating an existing treeview in the bdd
 * @param {object} treeview - the treeview to update
 * @returns {Promise.<TResult>}
 */
function update(treeview) {
    return mongo.getDao(TreeviewDao).then(
        function (treeviewDAO) {
            let treeviewWithObjectId = _.clone(treeview, true);
            treeviewWithObjectId._id = new ObjectID(treeview._id);
            return treeviewDAO.save(treeviewWithObjectId);
        }
    ).catch(handleError);
}

/**
 * Add a new treeview
 * @param treeview
 * @returns {Promise.<TResult>}
 */
function add(treeview) {
    treeview._id = new ObjectID(treeview._id);
    if(treeview.parent) {
        treeview.parent = new ObjectID(treeview.parent);
    }
    return mongo.getDao(TreeviewDao).then(
        function (treeviewDAO) {
            return treeviewDAO.save(treeview);
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