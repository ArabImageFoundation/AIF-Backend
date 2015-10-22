import webpack from 'webpack'
import webpackConfig from './devServer'
//var webpackDevServer = require('webpack-dev-server')
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

var compiler = webpack(webpackConfig);

export default function middleware(app){
	app.use(webpackDevMiddleware(compiler, webpackConfig.devServer))
	app.use(webpackHotMiddleware(compiler))
}