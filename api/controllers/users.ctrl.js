'use strict';
const internal = require('./users/mongo/internal');

// Do the bridge
exports.get = internal.get;
exports.getAll = internal.getAll;
exports.remove = internal.remove;
exports.update = internal.update;
exports.add = internal.add;