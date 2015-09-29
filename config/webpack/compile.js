var config = require('./common');
var webpack = require('webpack');

(function(){

	var minimize = new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	});
	config.plugins.push(minimize);

})();

(function(){

	var rprops = ["global", "multiline", "ignoreCase", "source"];
	var rlength = rprops.length;
	var tests = [/\.css$/]

	function regexSame(r1, r2) {
		if(!(r1 instanceof RegExp) || !(r2 instanceof RegExp)){return false;}
		var i = 0;
		while(i<rlength){
			var prop = rprops[i++];
			if (r1[prop] !== r2[prop]){return false;}
		}
		return true;
	}

	config.module.loaders = config.module.loaders.map(function(loader){
		var i = 0; l = tests.length;
		while(i<l){
			if(regexSame(loader.test,tests[i++])){
				loader.loader = 'null-loader';
				return loader;
			}
		}
		return loader;
	});

})()

delete config.devtool;

module.exports = config;