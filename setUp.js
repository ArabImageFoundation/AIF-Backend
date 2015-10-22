import setApp from './config/express'
//import rethinkFactory from './src/rethink';

setApp()
	.then(({
			app
		//,	rethinkdb
		,	infoServer
		,	serve
		,	stylus
		,	staticServer
		,	notFound
		,	errorHandler
		,	webpackDevMiddleware
		})=>{

		app.use(stylus);

		app.get('/',(req,res)=>{
		    res.render('index',{title: 'InfoServer Express Example'});
		});

		app.use('/browse',infoServer.middleware)
		//app.use('/browse',require('./middleware/fileBrowser')(fileBrowser))
		
		webpackDevMiddleware(app);
		
		//app.use('/meta',rethinkFactory(rethinkdb))
		app.use(staticServer);
		app.use(notFound);
		app.use(errorHandler);

		return serve();

	})
	.then(({port})=>{
		console.log(`Express server listening on port ${port}`);
	})
	.catch(err=>{throw err;})
