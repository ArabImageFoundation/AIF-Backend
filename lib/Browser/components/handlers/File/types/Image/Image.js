import React,{Component} from 'react';
import {fetchFileContentsIfNeeded} from '../../../../../actions/files';

const extensions = /jpe?g|bmp|tiff|png|ico/i;

export default class Image extends Component{
	static test = function test(props){
		const {info} = props;
		const {extension} = info;
		return extension && extensions.test(extension)
	}
	render(){
		return <div>{this.props.info.path}</div>
	}
}