(function(presentation){
    presentation.extend = function extend(target, extension) {
	for (key in extension) {
	    target[key] = extension[key];
	}
	return target;
    }
})(presentation);
