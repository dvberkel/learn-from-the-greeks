(function(presentation){
    presentation.subscribable = subscribable = {};

    function prependInitialisationTo(method){
	return function(){
	    if (!this.subscribers) {
		this.subscribers = [];
	    }
	    method.apply(this, arguments);
	}
    }

    subscribable.addSubscriber = prependInitialisationTo(function addSubscriber(subscriber){
	this.subscribers.push(subscriber);
    });

    subscribable.notifySubscribers = prependInitialisationTo(function notifySubscribers(){
	for (var index = 0; index < this.subscribers.length; index++) {
	    var subscriber = this.subscribers[index];
	    subscriber.call();
	}
    });

})(presentation);
