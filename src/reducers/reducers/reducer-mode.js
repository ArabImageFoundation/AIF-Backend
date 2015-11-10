import {
	assign
} from './utils'

const showOverlayTrue = {showOverlay:true}
const showOverlayFalse = {showOverlay:true}

export default {
	showOverlay:(state)=>assign(state,showOverlayTrue)
,	hideOverlay:(state)=>assign(state,showOverlayTrue)
,	showOverlayItem:(state,{meta:{itemId}})=>assign(state,{itemId,showOverlay:true})
}
