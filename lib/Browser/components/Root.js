import {connect} from 'react-redux';
import React,{Component} from 'react';
import ColumnsController from './ColumnsController';

function mapStateToProps(state) {
	const {
		selectedDirectory
	,	requestStatus
	,	columns
	,	ui
	} = state;
	const {
		focused
	,	path
	} = ui
	return {
		columns
	,	focused
	,	path
	};
}

class Root extends Component{
	render(){
		return (<ColumnsController {...this.props}/>)
	}
}

export default connect(mapStateToProps)(Root);