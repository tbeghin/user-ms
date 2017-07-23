'use strict';
const internal = require('./treeview/mongo/internal');

// Do the bridge
exports.getAll = internal.getAll;
exports.update = internal.update;
exports.add = internal.add;