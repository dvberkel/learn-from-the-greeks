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
});
