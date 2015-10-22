const regExp = /\d+%|auto|max|\d+em/

function dimensionPropType(props, propName, componentName,isRequired){
	const prop = props[propName];
	if(typeof prop == 'undefined'){
		if(isRequired){
			return new Error(`${propName} is required`);
		}
		return;
	}
	if(typeof prop == 'string' && regExp.test(prop)){return null;}
	if(typeof prop == 'number'){return null;}
	return new Error(`${propName} is not a valid property`);
}

function validator(props, propName, componentName){
	return dimensionPropType(props, propName, componentName,false);
}

function validatorRequired(props, propName, componentName){
	return dimensionPropType(props, propName, componentName,true)
}

validator.isRequired = validatorRequired;

export default validator;