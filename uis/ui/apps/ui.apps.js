(function($, $ui){
//--------------------------------------------------------------------
$ui('ui.apps', {
    keepDom : false,
    on_init : function() {
        var html = '<div class="ui-apps ' 
                    + (this.option.className || '') 
                    + '" style="position:relative;">';
        //......................................................................
        html += '<div class="ui-apps-viewport" style="position:relative;">';
        html += '<div class="ui-apps-drawer" style="position:absolute;">';
        for(var i=0; i<this.data.length; i++) {
            var app = this.data[i];
            html += '<div class="ui-apps-dri" app-key="'+app.key+'" app-ui="'+app.ui+'">';
            html += '<div class="ui-apps-arena">';
            html += '</div></div>';
        }
        html += '</div>';
        html += '</div>';
        //......................................................................
        html += '<div class="ui-apps-dock" style="position:absolute;">';
        html += '   <div class="ui-apps-dk-items">';
            for(var i=0; i<this.data.length; i++) {
                var app = this.data[i];
                if(!app.dock)
                    continue;
                html += '<div class="ui-apps-dki" app-key="'+app.key+'">';
                html += '<img class="ui-apps-icon" src="'+app.icon+'" title="' + app.name + '">';
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
    on_resize : function(w, h) {
        var jq = this.jq;
        // 获得 dock 的尺寸
        var szDock = {
            w : jq.dock.width(),
            h : jq.dock.height() 
        };
        
        // 修正根节点
        jq.root.css({
            'padding-left' : szDock.w,
            'width'  : w,
            'height' : h
        });
        
        // 修正 dock 的尺寸和位置
        jq.dock.css({
            'top'      : 0,
            'left'     : 0
        });

        // 修正抽屉的尺寸和位置
        jq.viewport.css({
           'width'  : w - szDock.w,
           'height' : h 
        });
        jq.drawer.css({
            'width'  : w - szDock.w,
            'height' : h * 2 * this.data.length
        }).children('.ui-apps-dri')
            .css({
                'width'  : w - szDock.w,
                'height' : h
            });

        // 修正抽屉的位置
        this.moveDrawerTo(this.currentDrawer());
    },
    on_ready : function() {
        this.openApp(this.currentDrawer().attr('app-key'));
    },
    methods : {
        currentDrawer : function() {
            return this.jq.drawer.children('.ui-apps-current');
        },
        currentArena : function() {
            return this.currentDrawer().children('.ui-apps-arena');
        },
        moveDrawerTo : function(dri) {
            var index = dri.prevAll().size();
            this.jq.drawer.css("top", -1 * index * (this.jq.root.height()));
        },
        bindApp : function(arena) {
            var bind = $z.ui.oBind(arena);
            if(!bind) {
                $ui(arena.parent().attr('app-ui')).bind(arena);
            }
        },
        openApp : function(key) {
            // 展示正确的抽屉位置
            var jDri = this.jq.drawer.children('[app-key=' + key + ']');
            this.moveDrawerTo(jDri);

            // 绑定 APP
            this.bindApp(jDri.children());

            // 高亮 Dock 里的项目
            this.jq.dock.find('.ui-apps-dki').removeClass('ui-apps-current')
                .filter('[app-key=' + key + ']').addClass('ui-apps-current');
        }
    },
    events : {
        '.ui-apps-icon' : function() {
            var bind = $z.ui.getBind(this);
            bind.openApp($(this).parent().attr('app-key'));
        },
        'mouseover:.ui-apps-dki' : function() {
            $(this).addClass('ui-apps-dki-hover');
        },
        'mouseout:.ui-apps-dki' : function() {
            $(this).removeClass('ui-apps-dki-hover');
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