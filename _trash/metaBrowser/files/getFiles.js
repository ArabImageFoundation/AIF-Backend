import getFile from './getFile';
import forEachAsync from '../forEachAsync';

export default function getFiles(fs,rootAPI,props,cb){
	forEachAsync(
		props.name
	,	(src,next)=>getFile(
			{src}
		,	(err,file)=>err?next(err):next(null,file)
		)
	,	(errs,files)=>errs?cb(errs):cb(null,files)
	)
}