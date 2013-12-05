/**
 * jQuery Responsive IFrames
 * @author Armin Solecki
 *
 * Licensed under the MIT License (http://creativecommons.org/licenses/MIT/)
 *
 **/
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

            // wrap iframe
            var iframeSrc = self.$el.find('iframe').wrap('<div class="iframe-content" />').attr('src');

            //generate header
            var header = '<div class="iframe-header">' +
                              '<a href="'+ iframeSrc +'" class="iframe-trigger">'+ self.options.openMessage +'</a>' +
                          '</div>';

            var trigger = self.$el.prepend(header).find('.iframe-trigger');

            // click event
            $(trigger).click(function (e) {
                e.preventDefault();

                var $this = $(this),
                    $html = $('html'),
                    isFullScreen = $html.hasClass("iframe-full-screen"),
                    message = isFullScreen ? self.options.openMessage : self.options.closeMessage;

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
        openMessage: "Full screen",
        closeMessage: "Close"
    };
    
    $.fn.responsiveIframes = function(options){
        return this.each(function(){
            (new $.responsiveIframes(this, options));
        });
    };
    
})(jQuery);