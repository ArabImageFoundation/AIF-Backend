import React,{Component} from 'react';
import Column from './dumb/Column';
import {
	STATUS_LOADING
,	STATUS_LOADED
,	STATUS_NONE
,	STATUS_ERROR
,	TYPE_FILE
,	TYPE_DIRECTORY
,	TYPE_INFO
} from '../constants';
import getHandler from './handlers/getHandler';
import {removeColumn} from '../actions/columns';

export default class ColumnController extends Component{
	constructor(props,context){
		super(props,context)
		this.state = {shouldLoad:false}
	}
	onClose = (evt) =>{
		const {
			dispatch
		,	id
		} = this.props;
		dispatch(removeColumn(id));
	}
	shouldRequireInfo(props,state){
		if(props.status==STATUS_NONE){
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
		const Handler = getHandler(type);
		const hasLoaded = (this.props.status === STATUS_LOADED);
		const hasError = (this.props.status === STATUS_ERROR);
		const columnProps = {id,selected}
		const onClose = this.onClose
		const componentProps = Object.assign({}
		,	this.props
		,	{
				shouldLoad
			,	hasLoaded
			,	onClose
			,	hasError
		});
		return <Handler {...componentProps}/>
	}
};