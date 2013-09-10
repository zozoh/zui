(function($, $ui){
//--------------------------------------------------------------------

$ui('ui.test.a', {
    keepDom : false,
    on_init : function() {
        var html = "<h1>I am A</h1>";
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