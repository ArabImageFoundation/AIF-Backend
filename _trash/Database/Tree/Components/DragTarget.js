import React,{Component,PropTypes} from 'react'

export default class DragTarget extends Component{
	static propTypes = {
		isDragging:PropTypes.func.isRequired
	,	position:PropTypes.oneOf(['before','after']).isRequired
	,	onDragEnd:PropTypes.func.isRequired
	,	path:PropTypes.array.isRequired
	}
	constructor(props,context){
		super(props,context);
		this.state = {hover:false}
	}
	position(){
		return (this.props.position=='before') ? -1 : 0;
	}
	onMouseOver = (evt) =>{
		evt.stopPropagation();
		evt.preventDefault();
		this.setState({hover:true});
	}
	onMouseOut = (evt) =>{
		evt.stopPropagation();
		evt.preventDefault();
		this.setState({hover:false});
	}
	onMouseUp = (evt) =>{
		evt.stopPropagation();
		evt.preventDefault();
		const pos = this.position();
		const {path} = this.props;
		this.props.onDragEnd(path,pos);
	}
	render(){
		const isDragging = this.props.isDragging();
		const {hover} = this.state;
		const shouldShow = (isDragging && hover);
		const backgroundColor = shouldShow ? 'red':'transparent'
		const height = shouldShow ? 10 : 1
		const style = {
			height
		,	backgroundColor
		}
		const props = {
			style
		,	onMouseUp:this.onMouseUp
		,	onMouseOver:this.onMouseOver
		,	onMouseOut:this.onMouseOut
		}
		return <div {...props}></div>
	}
}