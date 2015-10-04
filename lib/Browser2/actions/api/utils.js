export function httpStatus(response){
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	throw new Error(response.statusText)
}

export function httpJSON(response){
	return response.json();
}

export function httpText(response){
	return response.text();
}