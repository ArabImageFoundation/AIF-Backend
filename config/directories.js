var path = require('path');
var rootDir = path.resolve(__dirname+'/..')+'/';

module.exports = {
	root:rootDir
,	config:rootDir+'config/'
,	public:rootDir+'public/'
,	lib:rootDir+'lib/'
,	dist:rootDir+'dist/'
,	src:rootDir+'src/'
,	views:rootDir+'views/'
}
