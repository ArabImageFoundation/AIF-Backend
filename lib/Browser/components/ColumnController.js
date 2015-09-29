import React,{Component} from 'react';
import Column from './dumb/Column';
import {STATUS_LOADING,STATUS_LOADED,TYPE_FILE,TYPE_DIRECTORY,TYPE_INFO} from '../constants';
import {
	ColumnError
,	Directory
,	File
} from './handlers'


const handlers = {
	[TYPE_DIRECTORY]:Directory
,	[TYPE_FILE]:File
}

export default class ColumnController extends Component{
	constructor(props,context){
		super(props,context)
		this.state = {shouldLoad:false}
	}
	shouldRequireInfo(props,state){
		if(props.status==STATUS_LOADING && !state.shouldLoad){
			this.setState({shouldLoad:true});
		}else if(state.shouldLoad){
			this.setState({shouldLoad:false});
		}		
	}
	componentDidMount() {
		this.shouldRequireInfo(this.props,this.state);
	}
	componentWillReceiveProps(nextProps){
		this.shouldRequireInfo(nextProps,this.state);
	}
	render(){
		const {type,id,selected} = this.props;
		const {shouldLoad} = this.state;
		const Component = handlers[type] || ColumnError;
		const loaded = (this.props.status === STATUS_LOADED);
		const columnProps = {id,selected}
		const componentProps = Object.assign({},this.props,{shouldLoad,loaded});
		return <Component {...componentProps}/>
	}
};