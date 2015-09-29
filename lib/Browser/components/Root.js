import {connect} from 'react-redux';
import React,{Component} from 'react';
import ColumnsController from './ColumnsController';

function mapStateToProps(state) {
	const {
		selectedDirectory
	,	requestStatus
	,	file
	,	columns
	,	ui
	} = state;
	const {
		isFetching
	,	lastUpdated
	} = requestStatus || {
		isFetching: true
	};
	return {
		selectedDirectory
	,	file
	,	isFetching
	,	lastUpdated
	,	columns
	,	ui
	};
}

class Root extends Component{
	render(){
		return <ColumnsController {...this.props}/>
	}
}

export default connect(mapStateToProps)(Root);