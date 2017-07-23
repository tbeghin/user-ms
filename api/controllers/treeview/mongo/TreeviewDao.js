'use strict';

const baseDao = require('../../BaseDao');
const util = require('util');

const CONSTANT_COLLECTION_NAME = 'treeview';

function UsersDAO(db) {
    baseDao.BaseDAO.call(this, db, CONSTANT_COLLECTION_NAME);
}

util.inherits(UsersDAO, baseDao.BaseDAO);
module.exports.usersDAO = UsersDAO;