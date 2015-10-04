import React,{Component,Children} from 'react'
import {
	wrapChildren
,	calculateWrapperSize
} from './utils'
import {
	defaultProps
,	contextTypes
,	childContextTypes
,	propTypes
} from './statics'

export default class Layout extends Component{
	static defaultProps = defaultProps
	static propTypes = propTypes
	constructor(props,context){
		super(props,context);
		let {width,height} = props;
		if(width=='max'){width = '100%';}
		if(height=='max'){height = '100%'}
		this.state = {width,height}
	}
	setNewSizeIfDifferent(state,props){
		const newState = calculateWrapperSize(this.refs.root,state,props,this.refs);
		console.log(props.name,newState)
		if(newState){
			this.setState(newState);
		}
	}
	componentDidMount(){
		this.setNewSizeIfDifferent(this.state,this.props);
	}
	componentDidUpdate(){
		this.setNewSizeIfDifferent(this.state,this.props);
	}
	render(){
		const {width,height} = this.state;
		const {children} = this.props;
		const style = {
			width
		,	height
		,	background:'red'
		,	overflow:'hidden'
		,	textAlign:'center'
		,	verticalAlign:'middle'
		};
		const props = {
			ref:'root'
		,	style
		,	className:'layout'
		,	name:this.props.name
		}
		return (<div {...props}>
			{wrapChildren(this.props)}
		</div>)
	}
}