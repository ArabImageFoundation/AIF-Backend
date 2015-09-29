import React,{Component} from 'react'

const props = ['atime','basename','birthtime','extension','filename','mime','path','size','types']

export default class FileInfo extends Component{
	static actionName = 'File Properties'
	static test(types,mime,info,has){
		return true
	}
	renderProp(propName,prop){
		if(Array.isArray(prop)){
			prop = prop.join('/');
		}
		if(propName=='atime' || propName=='birthtime'){
			prop = new Date(prop);
			prop = prop+'';
		}
		return (<dl key={propName}>
			<dt>{propName}</dt>
			<dd>{prop}</dd>
		</dl>)
	}
	render(){
		const info = this.props.info
		const fileProperties = props.map(propName=>this.renderProp(propName,info[propName]))
		return (<div>{fileProperties}</div>)
	}
}