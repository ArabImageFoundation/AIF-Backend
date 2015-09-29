var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var webpackConfig = require('../config/webpack/devServer');
var compiler = webpack(webpackConfig);
var webpackDevServerOptions = webpackConfig.devServer
var webpackDevMiddleWare = new webpackDevServer(compiler, webpackDevServerOptions).app;

module.exports = webpackDevMiddleWare