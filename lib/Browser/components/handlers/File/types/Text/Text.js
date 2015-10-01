import React,{Component} from 'react';
import {fetchFileContentsIfNeeded} from '../../../../../actions/files';

const extensions = /txt|css|yaml|ini/i;

export default class Text extends Component{
	static test = function test(props){
		const {info} = props;
		const {extension} = info;
		return extension && extensions.test(extension)
	}
	componentDidMount(){

	}
	render(){
		return <div>text</div>
	}
}