(function($){
    $.deck('.slide');

    $("#toc").toc({
	"selectors" : "h2",
	"container" : "body",
	"smoothScrolling" : false,
	"prefix" : "toc",
	"highlightOnScroll" : false,
	"anchorName": function(i, heading, prefix) {
	    var name = prefix + "-" + $(heading).parents("section").attr("id");
	    return name;
	}
    }).decktoc();
})(jQuery);
