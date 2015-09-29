var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var postcssImport = require('postcss-import');
var directories = require('../directories');
var rootDir = directories.root;
var distDir = directories.dist;
var srcDir = directories.src;

module.exports = {
	context: rootDir
,	entry: {
		bundle: srcDir+"index.js"
	}
,	output: {
		path: distDir
	,	publicPath: "/"
	,	filename: "[name].js"
	}
,	resolve: {
		extensions: ['','.js','.jsx','.styl','.jade','.md']
	}
,	plugins:[
		new ExtractTextPlugin("[name].css")
	]
,	postcss: function () {
		return {
			defaults: [
				autoprefixer
			,	 precss
			,	postcssImport({
					onImport: function(files){
						files.forEach(this.addDependency);
					}.bind(this)
				})
			]
		,	cleaner:  [autoprefixer({ browsers: [] })]
		};
	}
,	module: {
		loaders: [
			{
				test: /\.js$/
			,	exclude: /node_modules/
			,	loader: "babel-loader"
			,	query: {
					optional: [
						"es7.decorators"
					,	"es7.classProperties"
					]
				}
			}
		,	{
				test: /\.styl$/
			//,	loader: ExtractTextPlugin.extract("style-loader",'!css-loader!stylus-loader')
			,	loader:'style-loader!css-loader?module!stylus-loader'
			}
		,	{
				test: /\.coffee$/
			,	loader: "coffee-loader"
			}
		,	{
				test: /\.(coffee\.md|litcoffee)$/
			,	loader: "coffee-loader?literate"
			}
		,	{
				test: /\.md$/
			,	loader: "html!markdown"
			}
		,	{
				test: /\.jade$/
			,	loader: "jade-html"
			}
		,	{
				test: /\.css$/
			,	loader: "style-loader!css-loader!postcss-loader?pack=defaults"
			}
		]
	}
,	devtool:"#source-map"
}