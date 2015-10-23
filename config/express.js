import directories from './directories';
import infoServer from 'infoserver';
import infoServerOptions from './infoServer';
import webpackDevMiddleware from './webpack/devMiddleware';
import express,{static as staticServer} from 'express';
import stylus,{middleware as stylusMiddleware} from 'stylus'
import nib from 'nib';
import {isDev} from './global'
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
,	isDev
,	webpackDevMiddleware
,	stylus:stylusMiddleware({
		src:publicPath
	,	sourcemap:isDev
	,	force:isDev
	,	compile:(str,path)=>{
			return stylus(str)
				.set('filename',path)
				.set('compress',!isDev)
				.use(nib())
				.import('nib')
				.define('isDev',isDev)
		}
	})
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

	const {path,options,rootGroups} = infoServerOptions;
	return infoServer(path,options)
		.then(api=>{
			props.infoServer = api;
			if(isDev){
				return api.selections.commands.root([rootGroups])
			}
			return props;
		})
		.then(()=>props)
}