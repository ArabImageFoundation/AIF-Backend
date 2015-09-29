import Dispatcher from './Dispatcher';

const dispatcherMixin = {
	getInitialState(){
		return this.__getDispatcher().getState();
	}
,	componentDidMount(){
		let onChange = (this.props.onDispatcherChange || this.__onDispatcherChange);
		this.__getDispatcher().onChange(onChange);
	}
,	__getDispatcher(){
		return (this.props.dispatcher || Dispatcher.instance)
	}
,	__onDispatcherChange(state){
		this.setState(state);
	}
}

export default dispatcherMixin;