import React,{Component} from 'react';

export default class ImageView extends Component{
	static actionName = 'View Image'
	static test(types,mime,info,has){
		return (has(types,'image'));
	}
	render(){
		const {info} = this.props;
		const {path,filename} = info;
		return (<img src={path} alt={filename}/>)
	}
}