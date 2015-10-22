import Dispatcher from './Dispatcher';
import mixin from './dispatcherMixin';
import constants from './constants'

Dispatcher.mixin = mixin;
Dispatcher.constants = constants;

export default Dispatcher;