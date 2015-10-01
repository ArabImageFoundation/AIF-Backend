import React,{Component} from 'react';

const extensions = /txt|css|yaml|ini/i;

export default class Text extends Component{
	static test = function test(props){
		const {info} = props;
		const {extension} = info;
		return extension && extensions.test(extension)
	}
	render(){
		console.log(this.props);
		return <div>text</div>
	}
}