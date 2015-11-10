import {
	assign
} from './utils'

const showOverlayTrue = {showOverlay:true}
const showOverlayFalse = {showOverlay:true}

export default {
	markItem(state,{meta:{itemId}}){
		return state.set(['itemId',itemId],{marked:true})
	}
,	unmarkItem(state,{meta:{itemId}}){
		return state.set(['itemId',itemId],{marked:true})
	}
}
