export const KEY_LEFT = 37
export const KEY_RIGHT = 39
export const KEY_UP = 38
export const KEY_DOWN = 40
export const KEY_CONFIRM = 13
export const KEY_CANCEL = 27
export const KEY_FORWARD = 107
export const KEY_BACK = 109
export const KEY_TOP = 36
export const KEY_BOTTOM = 35

export function isKeyValid(key){
	switch(key){
		case KEY_LEFT:
		case KEY_RIGHT:
		case KEY_UP:
		case KEY_DOWN:
		case KEY_CONFIRM:
		case KEY_CANCEL:
		case KEY_FORWARD:
		case KEY_BACK:
		case KEY_TOP:
		case KEY_BOTTOM:
			return true
		default:
			break;
	}
	return false;
}