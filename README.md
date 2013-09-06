zui
===

> 提供一个 js 端的富客户端框架，基于 jQuery

# ZUI 的核心想法

所谓基于浏览器的 UI，就是一些 JS 函数对某一组 DOM 对象进行操作的封装。
无论什么样的界面，它总是局限再某个 DOM 节点之内的

	HTML
	  +--BODY
	  	   +--- DIV.menu       <- ui.menu
	  	   |
	  	   +--- DIV.main       <- ui.calendar
	  	   …

为此，我们给出了下面这几个术语

* **选区** (__selection__): UI 对应的 DOM 节点，这个DOM节点内部结构由 UI 来控制
* **绑定** (__bind__) : 一个 JS 对象，记录了 UI 与 **选区** 的对应关系
* **垫圈** (__gasket__) : 一个 UI 可以给出自己的几个子 DOM 节点，以便子UI嵌套进来

对于 **选区** ，由于我们基于 jQuery，所以自然就是一个 jQuery 对象，表示一个 DOM。
对于 **绑定** 我们将其记录在 window 对象中，它的结构如下:

	{
        __nutz_ui_bind__ : true,
        ID : 'ui.calendar_0',    // 整个 window 声明周期内唯一的 ID 
        typeName : 'ui.calendar, // 对应的 UI 类型
        gasketName : null,       // 本控件绑定在父控件的哪个 gasket 上，null 表示根控件
        gasketPath : "/",        // 本控件从根控件开始的 gasket 路径，"/" 表示根控件
        ao : {...},              // 网页的锚值对象
        data : {...},            // 通过 ui.option.data 函数获取的数据对象
        option : {...},          // 本次绑定的配置信息
        selector : ...,          // 一个选择器，或者 "@bind.ID:名称"
        selection: $(selector),  // 一个 jQuery 对象，持有当前选区
        children : {             // 子绑定的列表，每个绑定都有一个固定的名称
            chute : {...},
            menu  : {...},
            arena : {...}
        }
    }

同时，我们提供便利的方法帮你定义你的 UI，UI 的定义以及绑定信息在 window 对象存放
的情况如下：

    window
        NutzUI : {
            version : '0.1'     // NutzUI 的版本
            binds   : {         // 所有生效的绑定
                "UI类型A_0" : {...},
                "UI类型A_1" : {...}
            }
            types   : {         // 所有已经定义 UI 类型
                "UI类型A" : {...},
                "UI类型B" : {...}
            }
        }

# UI 的定义


**定义一个UI**

    (function($, $ui){  // <- 进入 UI 声明的闭包
    $ui('ui.myui', {    // 扩展的所有函数，运行时，this 皆为 bind 实例本身
        keepDom : true,                  // 是否初始化的时候，清除选区, 只有等于true 才不清除
        extend  : "ui.myparent",         // 可以继承父 UI 的特质
                                         // 当然父 UI 必须存在先
        on_init : function(){},          // 初始化选区内的 DOM 结构，
        on_show : function(){…},         // 根据 bind 的 option 来显示选区内容
        on_resize : function(w, h){…},   // 当选区被改变大小时调用，w, h 为新的大小
        on_depose : function(){…},       // 当UI被销毁时调用的方法
        on_listen : function(){…},       // 当UI开始监听用户事件
                                         // 这个选项不是必须的，一旦声明，events 段将被无视
        on_ready  : function(){…},       // 当所有的初始化流程都进行完毕，将调用这个方法
        gasket : function(nm){…},        // 根据一个Name，返回一个 jQuery 对象
                                         // null 表示扩展点不存在
        dft_option : {…},                // 提供了默认的配置信息
        // 本选区具体都委派了哪些事件
        events : {
            '[click:]选择器' :  function(e, bind){…}   # this 为选择器匹配了的 DOM 对象
            …
        },
        // 本UI要支持的外部方法
        methods : {
            doSomething : function(args){…}  # args 将由调用者来调用  
        }
    });
    })(window.jQuery, window.NutzUI);  // <- 闭包结束
    
**取消一个 UI 的定义**

    $ui('UI类型名', null);
    

# UI 的绑定
    
当你将定义好的 UI 绑定到一个 DOM 上的时候，这个 UI 就显示出来了。因此，UI 的提供者
提供 ui 的定义文件，使用者通过 `<script src="xxxx"` 将其链接进自己的页面，然后在
合适的时机（通常是页面加载完毕后）执行 UI 的**绑定**。如果想在 UI 提供的 **垫圈** 里
嵌套其他的 UI，那么 **绑定** 的时候，声明 init 事件就是很好的时机。

    // 将 UI 绑定在指定的 DOM 上
    var bind = ui('UI类型名').bind(selector, {...配置信息...});

    // 将 UI 绑定在指定的UI 垫圈 内
    var bind = ui('UI类型名').bind(parentBind, "垫圈名称", {...配置信息...});

当 UI 绑定期间，NutzUI 会依次调用你配置的如下事件函数:

1. `on_init` : 当开始初始化
2. `on_show` : 当控件创建完DOM节点
3. `on_resize` : 当控件根据选区大小自动调整完尺寸
4. `on_listen` : 给你一个时机，让你注册一些自定义的事件监听
6. `on_ready`  : 全部工作都做完了，留给你最后一个时机，你可以随便做点什么
    


# 开发者须知

为了能让你更好的阅读代码，我给出了本项目的库目录详细说明:

	[core]                 # 核心代码
		z.xxxx.js          # 各种帮助函数
		zui.js             # UI 框架的核心代码	
	[uis]                  # 各种 zui 的插件
		[avatas]           # 头像管理插件
			README.md      # 插件的使用说明
			ui.avatas.js   # 插件的 JS 代码
			ui.avatas.css  # 插件的默认样式
			ui.avatas.html # 插件的测试 HTML 代码
		…                  # 更多的插件 ...
		
	[jquery]               # jQuery 插件
	[test]                 # 各种测试代码
	[deps]                 # 本项目依赖的 JS 代码库（这个只是为了开发便利，生产中请自行获取最新版）
		[jquery]      
	
