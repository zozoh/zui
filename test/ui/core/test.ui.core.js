(function($, $ui){
$(document).ready(function(){
//--------------------------------------------------------------------
// 这个 UI bind 实例，修改了配置，但是仅仅对自己生效
$ui('ui.demo.simple').bind(document.body)
    .setup("on_init",function(){
        var html = "<h1>after bind</h1>";
        html += '<div class="a-sub"></div>';
        this.selection.html(html);
    });
// 所以这个 bind 实例，会输出原始的配置信息
$ui('ui.demo.simple').bind("/","a-sub");

//--------------------------------------------------------------------
});
})(window.jQuery, window.NutzUI);