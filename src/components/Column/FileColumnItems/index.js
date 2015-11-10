import React,{Component,PropTypes} from 'react';
import {fetchFileIfNeeded} from '../../../actions';
import ColumnItems from '../../ColumnItems';

module.exports = class FileColumnItems extends Component{
	componentDidMount(){
		const {
			dispatch
		,	path
		,	id
		} = this.props;
		dispatch(fetchFileIfNeeded(path,id));
	}
	renderInside(){
		const {
			file
		} = this.props;
		const {
			size
		} = file;
		return (<span>size:{size}</span>)
	}
	render(){
		const {
			height
		,	headerHeight
		} = this.props;

		const props = {
			height:height-headerHeight
		,	position:headerHeight
		}
		return(<ColumnItems {...props}>
			{this.renderInside()}
		</ColumnItems>);
	}
}
