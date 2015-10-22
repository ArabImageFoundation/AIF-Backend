import directories from './directories';
import infoServer from 'infoserver';
import webpackDevMiddleware from './webpack/devMiddleware';
import express,{static as staticServer} from 'express';
import {middleware as stylusMiddleware} from 'stylus'
import Promise from 'bluebird';

const app = express();
const publicPath = directories.public;
const viewsPath = directories.views;
const port = process.env.PORT || 3000;

const appSettings = {
	port
,	views:viewsPath
,	'view engine':'jade'
}

const props = {
	app
,	port
,	webpackDevMiddleware
,	stylus:stylusMiddleware(publicPath)
,	staticServer:staticServer(publicPath)
,	directories:directories
,	serve:Promise.promisify(function serve(cb){
		const server = app.listen(port,function(){
			props.server = server;
			cb(null,props);
		})
	})
,	notFound:function(req, res, next) {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	}
,	errorHandler:function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error',{
			message: err.message
		,	error: err
		,	path:err.path
		});
	}
}

export default function(cb){

	Object.keys(appSettings).forEach(n=>{
		app.set(n,appSettings[n]);
	});

	return infoServer(publicPath,{})
		.then(api=>{
			props.infoServer = api;
			return props;
		})
}