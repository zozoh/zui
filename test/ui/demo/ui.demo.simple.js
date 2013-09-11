/**
 * 一个简单的测试用 UI
 */
(function($, $ui){
//--------------------------------------------------------------------

$ui('ui.demo.simple', {
    keepDom : false,
    on_init : function() {
        var html = "<h1>I am Simple Demo</h1>";
        html += '<div class="a-sub"></div>';
        this.selection.html(html);
    },
    gasket : function(nm) {
        if (nm=='a-sub')
            return this.selection.children('.a-sub');
    }
});

//--------------------------------------------------------------------
})(window.jQuery, window.NutzUI);