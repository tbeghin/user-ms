'use strict';

const baseDao = require('../../BaseDao');
const util = require('util');

const CONSTANT_COLLECTION_NAME = 'iconList';

function IconListDao(db) {
    baseDao.BaseDAO.call(this, db, CONSTANT_COLLECTION_NAME);
}

util.inherits(IconListDao, baseDao.BaseDAO);
module.exports.usersDAO = IconListDao;