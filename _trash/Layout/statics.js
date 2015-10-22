import {
	PropTypes
} from 'react';
import {
	dimensionPropType
} from './utils'

export const defaultProps = {
	width:'auto'
,	height:'auto'
,	direction:'default'
}
export const contextTypes = {
	layoutContext:PropTypes.object
}
export const childContextTypes = {
	layoutContext:PropTypes.object
}
export const propTypes = {
	width:dimensionPropType.isRequired
,	height:dimensionPropType.isRequired
,	direction:PropTypes.oneOf([
		'row'
	,	'column'
	,	'row-reverse'
	,	'column-reverse'
	,	'default'
	]).isRequired
/**
,	wrap:PropTypes.oneOf([
		'nowrap'
	,	'wrap'
	,	'wrap-reverse'
	,	'default'
	]).isRequired
,	justify:PropTypes.oneOf([
		'start'
	,	'end'
	,	'center'
	,	'space-between'
	,	'space-around'
	,	'default'
	]).isRequired
/**/
,	listenResize:PropTypes.bool
}