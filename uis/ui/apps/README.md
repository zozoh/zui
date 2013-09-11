应用程序架:ui.apps
====
> 将一组 UI 组合在一起，提供各个 UI 之间的切换功能。  本 UI 建议直接绑定到 `document.body` 上

# 使用方式

本 UI 通过下面的方法进行初始化

	$ui("ui.apps").bind(document.body, {
		// 给定一个全局的特殊选择器，以便你定制自己的显示样式
		className : 'myApps',   
		//-----------------------------------------------------------
		// 你可以直接给一个 JS 数组，用 function 返回可以动态加载
		data : function(){
			return [{
				key  : 'zfile:34ca31c913210', // app 的唯一键值
				ui   : 'ui.zfile.browser',    // 应用的 UI 类型
				name : '素材库',      // app 的显示名称，UName 格式
				dock : true          // 是否出现在 dock 中
			},{
				// 下一个 app 的配置信息
			}];
		}
	});
	
# 对应用UI的要求

~ 暂时看不到什么特别的要求 ~


# DOM 模型

本UI会创建下面的 DOM 模型:

![](ui.apps.overview.png)

# 依赖的特殊字符串

	ui.apps.more=展开