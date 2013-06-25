describe('Pythagoras', function(){
    it('should have a namespace', function(){
	expect(presentation.pythagoras).toBeDefined();
    });

    describe('model', function(){
	it('should be defined', function(){
	    expect(presentation.pythagoras.Model).toBeDefined();
	});

	it('should be a constructor', function(){
	    expect(typeof(presentation.pythagoras.Model)).toBe('function');
	});

	it('should be have a default for \'fraction\' of 0.5', function(){
	    var model = new presentation.pythagoras.Model();

	    expect(model.fraction()).toBeCloseTo(0.5);
	});

	it('should be constructed with a \'fraction\'', function(){
	    var model = new presentation.pythagoras.Model({ 'fraction' : 0.1 });

	    expect(model.fraction()).toBeCloseTo(0.1);
	});

	it('should be able to reset the \'fraction\'', function(){
	    var model = new presentation.pythagoras.Model({ 'fraction' : 0.1 });

	    expect(model.fraction(0.7));

	    expect(model.fraction()).toBeCloseTo(0.7);
	});

	it('should notify when \'fraction\' is reset', function(){
	    var model = new presentation.pythagoras.Model({ 'fraction' : 0.1 });
	    var called = false;
	    model.addSubscriber(function(){ called = true; });

	    expect(model.fraction(0.7));

	    expect(called).toBeTruthy();
	});
    });

    describe('view', function(){
	beforeEach(function(){
	    var testContainer = document.createElement('div');
	    testContainer.setAttribute('id', 'test-container');
	    var body = document.getElementsByTagName('body')[0];
	    body.appendChild(testContainer);
	});

	it('should be defined', function(){
	    expect(presentation.pythagoras.View).toBeDefined();
	});

	it('should be a constructor', function(){
	    expect(typeof(presentation.pythagoras.View)).toBe('function');
	});

	it('should target a div with id \'test-container\'', function(){
	    var container = document.getElementById('test-container');

	    expect(container).not.toBe(null);
	});

	it('should create a svg element in \'test-container\'', function(){
	    var model = new presentation.pythagoras.Model({ 'fraction': 0.3 });
	    new presentation.pythagoras.View({ 'model': model, 'id': 'test-container' });

	    var svg = document.getElementsByTagName('svg');

	    expect(svg).toBeDefined();
	    expect(svg.length).toBeGreaterThan(0);
	});

	afterEach(function(){
	    var testContainer = document.getElementById('test-container');
	    var body = document.getElementsByTagName('body')[0];
	    body.removeChild(testContainer);
	});
    });
});
