(function(presentation){
    presentation.pythagoras = pythagoras = {};

    function Point(options){
	options = presentation.extend({ 'x' : 0, 'y' : 0 }, options);

	function getterSetterFor(field){
	    return function getterSetter(value) {
		if (value) {
		    options[field] = value;
		}
		return options[field];
	    };
	};

	this.x = getterSetterFor('x');
	this.y = getterSetterFor('y');
    }

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

    pythagoras.View = function PythagorasView(options){
	this.options = presentation.extend({
	    'size': 100,
	    'offset': 10,
	}, options);

	this.render = function(){
	    var size = this.options.size;
 	    var offset = this.options.offset;
	    var fraction = this.options.model.fraction();
	    var svg = this.svg();
	    this.c(size, offset, fraction);
	    var a = this.a(size, offset, fraction);
	    var b = this.b(size, offset, fraction);

	    var circ = svg.circle(size);
	    circ.center(size/2+offset, size+offset);
	    circ.attr({ 'fill': 'none', 'stroke': '#000000' });
	}

	this.render();
    };
    presentation.extend(pythagoras.View.prototype, {
	'svg' : function svg(){
	    if (!this._svg) {
		var size = 2 * (this.options.size + this.options.offset)
		this._svg = new SVG(this.options.id).size(size, size);
	    }
	    return this._svg;
	},
	'c' : function hypothenusa(size, offset, fraction){
	    if  (!this._c) {
		var size = this.options.size;
 		var offset = this.options.offset;
		var svg = this.svg();
		this._c = svg.rect(size, size);
		this._c.attr({ 'fill': '#ff0000', 'stroke': '#000000' });
		this._c.move(offset, size + offset);
	    }
	    return this._c;
	},
	'a' : function a(size, offset, fraction){
	    if  (!this._a) {
		var svg = this.svg();
		var length = fraction * size;
		this._a = svg.rect(length, length);
		this._a.attr({ 'fill': '#ffff00', 'stroke': '#000000' });
		this._a.move(offset, (1 - fraction) * size + offset);
	    }
	    return this._a;
	},
	'b' : function b(size, offset, fraction){
	    if  (!this._b) {
		var svg = this.svg();
		this._b = svg.rect((1 - fraction) * size, (1 - fraction) * size);
		this._b.attr({ 'fill': '#0000ff', 'stroke': '#000000' });
		this._b.move(fraction * size + offset, fraction * size + offset);
	    }
	    return this._b;
	},
	'points' : function b(size, offset, fraction){
	    var points = [];
	    var x = (1 - 2*f) * w / 2;
	    var y = Math.sqrt(Math.pow(1/2 * w, 2) - Math.pow(x, 2));
	    points.push(new Point({ 'x': offset, 'y': (offset + size) }));
	    points.push(new Point({ 'x': (offset + fraction * size), 'y': (offset + size - y) }));
	    points.push(new Point({ 'x': (offset + size), 'y': (offset + size) }));
	    return points
	},
    })
})(presentation);
