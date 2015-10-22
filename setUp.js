import setApp from './config/express'

setApp()
	.then(({
			app
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
		
		webpackDevMiddleware(app);
		
		app.use(staticServer);
		app.use(notFound);
		app.use(errorHandler);

		return serve();

	})
	.then(({port})=>{
		console.log(`Express server listening on port ${port}`);
	})
	.catch(err=>{throw err;})
