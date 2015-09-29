var directories = require('./directories');
var express = require('express');
var publicPath = directories.public;
var viewsPath = directories.views;
var fileBrowser = require('./fileBrowser');

var appSettings = {
	port:process.env.PORT || 3000
,	views:viewsPath
,	'view engine':'jade'
}

var settings = {
	app:appSettings
,	stylus:require('stylus').middleware(publicPath)
,	static:express.static(publicPath)
,	fileBrowser:fileBrowser
,	notFound:function(req, res, next) {
		var err = new Error('Not Found');
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
,	setApp:function(app){
		for(var n in appSettings){
			if(!appSettings.hasOwnProperty(n)){continue;}
			app.set(n,appSettings[n]);
		}
	}
,	directories:directories
,	serve:function(app){
		return app.listen(appSettings.port,function(){
			console.log('Express server listening on port '+appSettings.port);
		})
	}
}

module.exports = settings