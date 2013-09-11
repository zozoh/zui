(function($, $ui){
//--------------------------------------------------------------------
$ui('ui.apps', {
    keepDom : false,
    on_init : function() {
        var html = '<div class="ui-apps ' + (this.option.className || '') + '">';
        //......................................................................
        html += '<div class="ui-apps-viewport">';
        html += '<div class="ui-apps-drawer">';
        for(var i=0; i<this.data.length; i++) {
            var app = this.data[i];
            html += '<div class="ui-apps-arena" app-key="'+app.key+'" app-ui="'+app.ui+'">';
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
        //......................................................................
        html += '<div class="ui-apps-dock">';
        html += '   <div class="ui-apps-dk-items">';
            for(var i=0; i<this.data.length; i++) {
                var app = this.data[i];
                html += '<div class="ui-apps-dki" app-key="'+app.key+'">';
                html += '<div class="ui-apps-nm">' + app.name + '</div>';
                html += '<img class="ui-apps-icon">';
                html += '</div>';    
            }
        html += '   </div>';
        html += '   <div class="ui-apps-dk-more"></div>';
        html += '</div>';
        //......................................................................
        html += '</div>';

        // 加入 DOM
        this.selection.html(html);

        // 记录一下自己常用的 jq 对象
        this.jq = _jq(this.selection);
    },
    on_show : function() {
        var jq = this.jq;
        // 高亮一个抽屉
        jq.drawer.children().first().next().addClass('ui-apps-current');
    },
    on_resize : function() {
        var jq = this.jq;
        var sz = {
            width  : jq.root.width(),
            height : jq.root.height()
        }
        // 修正视口和抽屉的尺寸
        jq.viewport.css(sz);
        jq.drawer.css({
            width  : sz.w,
            height : sz.h * 2 * this.data.length
        }).children('.ui-apps-arena')
            .css(sz);
        // 修正抽屉的位置
        var ca = this.currentArena();
        var caIndex = ca.prevAll().size();
        jq.drawer.css("top", -1 * caIndex * sz.height);

        // 修正 dock 的尺寸和位置
    },
    on_ready : function() {
        this.showApp(this.currentArena());
    },
    methods : {
        currentArena : function() {
            return this.jq.drawer.children('.ui-apps-current');
        },
        showApp : function(arena) {
            var bind = $z.ui.oBind(arena);
            if(!bind) {
                $ui(arena.attr('app-ui')).bind(arena);
            }
        }

    }
});
//--------------------------------------------------------------------
var _jq = function(selection) {
    var jq = {root : selection.children('.ui-apps')};
    jq.dock      = jq.root.children('.ui-apps-dock');
    jq.viewport  = jq.root.children('.ui-apps-viewport');
    jq.drawer    = jq.viewport.children('.ui-apps-drawer');
    return jq;
};
//--------------------------------------------------------------------
})(window.jQuery, window.NutzUI);