import React,{Component,PropTypes} from 'react';

export default class Entry extends Component{
	static propTypes = {
		hide:PropTypes.func.isRequired
	,	add:PropTypes.func.isRequired
	,	show:PropTypes.bool.isRequired
	}
	componentDidMount(){
		this.isHidden = true;
	}
	componentDidUpdate(){
		const wasHidden = (this.isHidden && this.props.show);
		const isShowing = (!this.isHidden && this.props.show);
		const wasShown = (!this.isHidden && !this.props.show);
		if(wasHidden){
			let node = React.findDOMNode(this.refs.input);
			node && node.focus();
			this.isHidden = false;
		}
		else if(wasShown){
			this.isHidden = true;
		}
	}
	onKeyUp = (evt) =>{
		if(evt.keyCode==27){
			this.props.hide();
		}
	}
	add = (evt) => {
		evt.preventDefault();
		const node = React.findDOMNode(this.refs.input);
		const value = node.value;
		node.value = '';
		this.props.add(value);
	}
	render(){
		let {show} = this.props;
		if(!show){
			return false;
		}
		return (<form onSubmit={this.add}>
			<input type='text' defaultValue='' ref='input' onKeyUp={this.onKeyUp}/>
			<input type='submit' value='&#9205;'/>
		</form>)		
	}
}