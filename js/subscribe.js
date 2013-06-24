(function(presentation){
    presentation.subscribable = subscribable = {};

    subscribable.addSubscriber = function addSubscriber(subscriber){
	if (!this.subscribers) {
	    this.subscribers = [];
	}
	this.subscribers.push(subscriber);
    };

    subscribable.notifySubscribers = function notifySubscribers(){
	if (!this.subscribers) {
	    this.subscribers = [];
	}
	for (var index = 0; index < this.subscribers.length; index++) {
	    var subscriber = this.subscribers[index];
	    subscriber.call();
	}
    };

})(presentation);
