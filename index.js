require('babel/register')({optional: ['es7.objectRestSpread']});
var config = require('./config/express');
var app = require('express')();
var fileBrowser = require('./lib/fileBrowser').connect;

config.setApp(app);

app.use(config.stylus);

app.get('/',function(req,res){
    res.render('index',{title: 'InfoServer Express Example'});
});
app.use(require('./middleware/webpackDevMiddleware'));
app.use('/browse',fileBrowser(config.fileBrowser))
app.use(config.static);
app.use(config.notFound);
app.use(config.errorHandler);

var server = config.serve(app);

