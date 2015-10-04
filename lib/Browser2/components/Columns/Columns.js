import React,{Component,PropTypes} from 'react';
import Column from '../Column';
import InfoPane from '../InfoPane';
import Layout from '../Layout';

function renderColumns(columns){

}

const style = {
	background:'green'
,	width:200
,	height:200
}

function Test(){
	return <div style={style}>flap</div>
}

    var scrollable = {
      'overflow-y': 'hidden',
      'overflow-x': 'scroll',
    }

export default class Columns extends Component{
	render(){
		const {dispatch,info,columns} = this.props;
		return (<Layout InfoPane={info} columns={columns}/>)
	}
}