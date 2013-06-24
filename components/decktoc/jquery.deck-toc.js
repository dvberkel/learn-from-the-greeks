(function($, deck, undefined){
    $.fn.decktoc = function(options){
        var settings = $.extend({}, options);

        this.find("ul li a").each(function(){
            var $this = $(this);
            var id = $this.attr("href");
            $this.click(function(){
                var target = $(id).parents("section").attr("id");
                deck("go", target);
            });
        });

        return this;
    };
})(jQuery, jQuery.deck);
