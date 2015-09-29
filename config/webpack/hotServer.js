var config = require('./common');

config.entry.bundle = ["webpack/hot/dev-server", config.entry.bundle];

module.exports = config