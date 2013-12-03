(function($){
    $.responsiveIframes = function(el, options){
        var self = this;
        
        // Access to jQuery and DOM versions of element
        self.$el = $(el);
        self.el = el;
        
        // Add a reverse reference to the DOM object
        self.$el.data("responsiveIframes", self);
        
        self.init = function () {
            self.options = $.extend({}, $.responsiveIframes.defaultOptions, options);
            
            $('.iframe-trigger', self.$el).click(function (e) {
                e.preventDefault();

                var $this = $(this),
                    $html = $('html'),
                    isFullScreen = $html.hasClass("iframe-full-screen"),
                    message = isFullScreen ? "Full screen" : "Close full screen";

                $this.text(message);

                if (isFullScreen) {
                    $html.removeClass("iframe-full-screen");
                    setTimeout(function () {
                        $(window).scrollTop($this.data('iframe-scroll-position'));
                    }, 1);
                } else {
                    $this.data('iframe-scroll-position', $(window).scrollTop());
                    $html.addClass("iframe-full-screen");
                }

            });
        };
                
        // Run initializer
        self.init();
    };
    
    $.responsiveIframes.defaultOptions = {
    };
    
    $.fn.responsiveIframes = function(options){
        return this.each(function(){
            (new $.responsiveIframes(this, options));
        });
    };
    
})(jQuery);