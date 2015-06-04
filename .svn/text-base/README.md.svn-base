# AirCleaner
/*
Title: AirCleaner
Description: EasyLink配网连接和获取本地SSID，以及设备的配网和绑定
*/

<ul id="tab" class="clearfix">
	<li class="active"><a href="#method-content">Method</a></li>
</ul>
<div id="method-content">

<div class="outline">
[getSsid](#1)<br/>
</div>

#**概述**

micoBind模块封装了获取当前SSID的方法，以及EasyLink配网和获取WIFI设备ip的方法

#**getSsid**<div id="1"></div>

当前手机是否连接上wifi，连接上则返回SSID,否则返回设备未联网。

getSsid(null, callback(ret, err))

##callback(ret, err)

ret：

- 类型：JSON对象

内部字段：

```js
{
	ssid:""		//操作成功返回json数据
}
```

err：

- 类型：JSON对象

内部字段：

```js
{
	msg:""    //错误描述
}
```

##示例代码

```js
var wifissid = api.require('wifiSsid');
wifissid.getSsid(null, function(ret, err) {
	if (ret.ssid) {
		api.alert({msg:ret.ssid});
	}else{
		api.alert({msg:err.msg});
    }
});
```

##补充说明

获取当前WIFI的SSID

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本