import React,{Component} from 'react';
import LayoutContainer from './LayoutContainer';

export default class Layout extends Component{
	render(){
		return <LayoutContainer {...this.props}/>
	}
}