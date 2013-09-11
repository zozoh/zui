(function($, $ui){
//--------------------------------------------------------------------

$ui('ui.apps', {
    keepDom : false,
    on_init : function() {
        var html = '<div class="ui-apps ' + (this.option.className || '') + '">';
        html += '<div class="ui-apps-dashboard">';
        for(var i=0; i<this.data.length; i++) {
            var app = this.data[i];
            html += '<div class="ui-apps-daboi" app-key="'+app.key+'">';
            html += '<img class="ui-apps-icon">';
            html += '<div class="ui-apps-nm">' + app.name + '</div>';
            html += '<div class="ui-apps-brief"> This is Brief </div>';
            html += '</div>';
        }
        html += '</div>';
        html += '<div class="ui-apps-dock">';
        html += '   <div class="ui-apps-dk-items">';
            for(var i=0; i<this.data.length; i++) {
                var app = this.data[i];
                html += '<div class="ui-apps-dki" app-key="'+app.key+'">';
                html += '<img class="ui-apps-icon">';
                html += '<div class="ui-apps-nm">' + app.name + '</div>';
                html += '</div>';    
            }
        html += '   </div>';
        html += '   <div class="ui-apps-dk-more">'+$z.ui.msg('ui.apps.more')+'</div>';
        html += '</div>';
        html += '<div class="ui-apps-drawer">';
        for(var i=0; i<this.data.length; i++) {
            var app = this.data[i];
            html += '<div class="ui-apps-arena" app-key="'+app.key+'" app-ui="'+app.ui+'">';
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';

        // 加入 DOM
        this.selection.html(html);
    },
    gasket : function(nm) {
        if (nm=='a-sub')
            return this.selection.children('.a-sub');
    }
});

//--------------------------------------------------------------------
})(window.jQuery, window.NutzUI);