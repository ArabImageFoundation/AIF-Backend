import express from 'express';
import getComponentsList from '../utils/getComponentsList'
import directories from '../config/directories';
import marked from 'marked';
import fs from 'fs';

function componentsBrowser(title,directory){

	var router = express.Router();

	router.get('/',function(req,res){
		res.render('components',{
			title:title
		,	components:getComponentsList(directory)
		,	root:directory
		,	url:req.originalUrl
		,	readme:(fs.existsSync(directories[directory]+'readme.md') && marked(fs.readFileSync(directories[directory]+'readme.md',{encoding:'utf8'}))) || false
		});
	});

	router.get('/:component',function(req,res,next){
		let name = req.params.component;
		let components = getComponentsList(directory);
		for(let i=0, l=components.length;i<l;i++){
			let comp = components[i];
			if(comp.name==name && comp.directory){
				return res.render('components',{component:comp,root:directory,url:req.originalUrl});
			}
		}
		return next();
	});

	return router;
}

export default function topLevel(){
	var l = arguments.length;
	var components = new Array(l);
	while(l--){components[l] = arguments[l];}
	var router = express.Router();
	router.get('/',function(req,res){
		res.render('components',{title:'components',categories:components,root:'',url:req.originalUrl})
	});

	components.forEach(function(component){
		var name = component[0];
		var directory = component[1];
		router.use('/'+directory,componentsBrowser(name,directory));
	});

	return router;
}
