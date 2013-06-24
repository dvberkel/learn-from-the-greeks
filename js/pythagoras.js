(function(presentation){
    pythagoras = {};

    pythagoras.Model = function PythagorasModel(options){
	var data = presentation.extend({ 'fraction' : 0.5 }, options);

	this.fraction = function fraction(value){
	    if (value) {
		data.fraction = value;
		this.notifySubscribers();
	    }
	    return data.fraction;
	};
    };
    presentation.extend(pythagoras.Model.prototype, presentation.subscribable);

    presentation.pythagoras = pythagoras;
})(presentation);
