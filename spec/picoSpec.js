describe('pico template engine', function(){
    it('should be defined', function(){
	expect(presentation.pico).toBeDefined();
    });

    it('should provide a template', function(){
	var template = presentation.pico('{{message}}!');

	var message = template({ 'message': 'Hello World' });

	expect(message).toBe('Hello World!');
    });

    it('should make multiple substitutions', function(){
	var template = presentation.pico('{{greeting}} {{subject}}!');

	var message = template({ 'greeting': 'Hello', 'subject': 'World' });

	expect(message).toBe('Hello World!');
    });
});
