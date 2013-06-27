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
    };
    Point.prototype.difference = function(point){
	return new Difference({ 'dx': (point.x() - this.x()), 'dy': (point.y() - this.y()) });
    };
    Point.prototype.add = function(difference){
	return new Point({
	    'x': (this.x() + difference.dx()),
	    'y': (this.y() + difference.dy())
	});
    };
    Point.prototype.toString = function toString(){
	return "" + this.x() + "," + this.y();
    };

    function Difference(options) {
	options = presentation.extend({ 'dx' : 0, 'dy' : 0 }, options);

	function getterSetterFor(field) {
	    return function getterSetter(value) {
		if (value) {
		    options[field] = value;
		}
		return options[field];
	    };
	};

	this.dx = getterSetterFor('dx');
	this.dy = getterSetterFor('dy');
    };
    Difference.prototype.rotated = function rotated(){
	return new Difference({ 'dx' : (-this.dy()), 'dy' : (this.dx()) });
    };
    Difference.prototype.negated = function negated(){
	return new Difference({ 'dx' : (-this.dx()), 'dy' : (-this.dy()) });
    };
    Difference.prototype.toString = function(){
	return '(' + this.dx() + "," + this.dy() + ')';
    };

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
	    'triangle-template': presentation.pico('{{p0}} {{p1}} {{p2}}'),
	    'rectangle-template': presentation.pico('{{p0}} {{p1}} {{p2}} {{p3}}')
	}, options);

	this.render = function(){
	    var size = this.options.size;
 	    var offset = this.options.offset;
	    var fraction = this.options.model.fraction();

	    var svg = this.svg();


	    var points = this.points(size, fraction);

	    var a = this.a(svg, points);
	    a.fill('#ffff00').transform({ 'x' : 0, 'y' : 0 });
	    var b = this.b(svg, points);
	    b.fill('#0000ff').transform({ 'x' : 0, 'y' : 0 });
	    var c = this.rectangle(svg, points.p2, points.p0);
	    c.fill('#ff0000').transform({ 'x' : 0, 'y' : size });

	    var triangle = this.triangle(svg, points);
	    triangle.fill('#ffffff').transform({ 'x' : 0, 'y' : size});
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
	'a' : function a(svg, points){
	    var rectangle = this.rectangle(svg, points.p0, points.p1);
	    return rectangle;
	},
	'b' : function b(svg, points){
	    var rectangle = this.rectangle(svg, points.p1, points.p2);
	    return rectangle;
	},
	'c' : function hypothenusa(svg, points){
	    var rectangle = this.rectangle(svg, points.p2, points.p0);
	    return rectangle;
	},
	'points' : function b(size, fraction){
	    var x = (1 - 2 * fraction) * size / 2;
	    var y = Math.sqrt(Math.pow(1/2 * size, 2) - Math.pow(x, 2));
	    return {
		'p0': new Point({ 'x': 0, 'y': size }),
		'p1': new Point({ 'x': (fraction * size), 'y': (size - y) }),
		'p2': new Point({ 'x': size, 'y': size })
	    };
	},
	'triangle' : function b(svg, points){
	    var triangle = svg.polygon(this.options['triangle-template'](points));
	    triangle.stroke('#000000');
	    return triangle;
	},
	'rectangle' : function b(svg, a, b){
	    var d = a.difference(b);
	    var c = b.add(d.rotated());
	    var d = c.add(d.negated());
	    var points = {
		'p0': a,
		'p1': b,
		'p2': c,
		'p3': d,
	    };
	    var rectangle = svg.polygon(this.options['rectangle-template'](points));
	    rectangle.stroke('#000000');
	    return rectangle;
	},
    })
})(presentation);
