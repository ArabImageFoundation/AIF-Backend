export const SHOW_IMAGE = 'SHOW_IMAGE'
export const HIDE_OVERLAY = 'HIDE_OVERLAY';


export function showImage(image){
	return {
		type:SHOW_IMAGE
	,	image
	}
}

export function hideOverlay(){
	return {
		type:HIDE_OVERLAY
	}
}