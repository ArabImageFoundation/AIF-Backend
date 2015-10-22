var webpack = require("webpack");
var config = require('./common');
var directories = require('../directories');
var port = process.env.PORT || 3000;

config.output.path = directories.public
//config.entry.bundle.unshift("webpack-dev-server/client?http://localhost:"+port, "webpack/hot/dev-server");
config.entry.bundle.unshift('webpack-hot-middleware/client')
config.plugins.unshift(
	new webpack.optimize.OccurenceOrderPlugin()
,	new webpack.HotModuleReplacementPlugin()
,	new webpack.NoErrorsPlugin()
)
var jsLoader = config.module.loaders[0];
delete jsLoader.loader;
jsLoader.loaders.unshift('react-hot');
config.devServer = {
	contentBase: directories.public
,	publicPath: '/'
,	stats: {colors: true}
,	noInfo: true
,	quiet: false
,	lazy: false
,	watchOptions:{ //only if lazy = false
		aggregateTimeout: 300
	,	poll: true
	}
,	hot:true
,	headers:{"X-Custom-Header":"yes"}
,	historyApiFallback:false
}
module.exports = config;