var config = require('./common');
var directories = require('../directories');

config.output.path = directories.public

config.devServer = {
	contentBase: directories.public
,	publicPath: '/'
,	stats: {colors: true}
,	noInfo: false
,	quiet: false
,	lazy: false
}
module.exports = config;