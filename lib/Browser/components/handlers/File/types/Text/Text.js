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
		if(this.props.contents){return;}
		const {
			dispatch
		,	status
		,	path
		,	id
		} = this.props;
		dispatch(fetchFileContentsIfNeeded(path,id));
	}
	render(){
		const {contents} = this.props;
		if(!contents){
			return <div>Loading</div>
		}
		return <div><pre>{contents}</pre></div>
	}
}