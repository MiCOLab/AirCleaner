var config = {
    host: "api.easylink.io",
    topic: "58f341ed/c893464d300e",
    clientId: "aca213caec5c",
    username: "",
    password: ""
};


(function(window) {
	var userKey = "colin_userky_";
	var currentDeviceKey = "colin_currentDevice_";
	var u={
		id:"b2e89f92-620c-4c8b-a80c-3078efbda53d",
		cityair_appKey:"b6b30d695e9b3530a6e6843774a5a9a0"
//		cityair_appKey:"9f3ea2aec72c000aaee0f440b4293cb5"
	};
	u.setUser = function (value) {
		$api.setStorage(userKey, value);
	}
	u.getUser = function () {
		try{
			return $api.getStorage(userKey);
		}catch(e){
			return null;
		}
	}
	u.currentDevice = function(value) {
		if (value){
			$api.setStorage(currentDeviceKey, value);
		}else{
			return $api.getStorage(currentDeviceKey);
		}
	}
	u.getCityAir=function(city,callback) {
		var url = "http://web.juhe.cn:8080/environment/air/cityair?key="+u.cityair_appKey+"&city="+city;
		$api.get(url,function (ret) {
//			alert(JSON.stringify(ret))
			callback(ret.result[0].lastMoniData[1])
		},"json")
	}
	
	u.checkState = function () {
		var user = u.getUser();
		if (user){
			$("#setting").show();
			$("#pagesettwo").hide();
		}else{
			$("#setting").hide();
			$("#pagesettwo").show();
		}
	}
	
	u.sendEvt=function(name,data) {
		try{
			api.sendEvent({name: name,extra: data });
		}catch(e){}
	}
	u.addEvt=function(name,handler) {
		try{
			api.addEventListener({name: name}, handler);
		}catch(e){
		}
	}
	var user = $mxuser.islogin();
	if (user){
		u.setUser(user);
	}
	window.app = u;
})(window)


function OutDoor () {
	var $e = $("#outDoor");
	var city = "上海";
	function getData(){
		app.getCityAir(city,function (ret) {
			$("span[name='AQI']").html(ret['AQI'])
			$("span[name='PM2.5']").html(ret['PM2.5Hour'])
			$("span[name='PM10']").html(ret['PM10Hour'])
			$("span[name='quality']").html(ret['quality'])
			fixOutLevelChange(getLevelByAQI(ret['AQI']));
		})
	}
	
	this.inDoor = function () {
		user = app.getUser();
		swiperUpOrDown.slideTo(1, 800, false);
	}
	
    var cityObj = null
	this.changCity=function () {
		if (true){
			$api.open("cityPage.html")
			app.addEvt("changecity",function (ret) {
				city = ret.value;
				$(".city_name").html(city);
				getData();
			})
			return;
		}
	}
	setTimeout(getData,1000)
}

function InDoor () {
	var $e = $("#inDoor");
	var current;
	var timeId = 0;
	var docin = document.getElementById("inDoor");
	var start={x:0,y:0};
	function moveHandler (evt) {
		if (Number(evt.touches[0].pageY)-start.y < -20){
		    $("#devList").show();
		    $("#lrswiper").hide();
//			lrswiper.removeClass("blurfilter");
			docin.removeEventListener("touchmove",moveHandler);
		}
	}
	docin.addEventListener("touchstart",function(evt){
		start.x = Number(evt.touches[0].pageX);
		start.y = Number(evt.touches[0].pageY);
		var list = devlist.getList();
		if (list && list.length > 1){
			docin.addEventListener("touchmove",moveHandler);
		}
	},false);

	var _mqtt = null;
	function checkOwner () {
		$("#listhide").hide();
		var cur = app.currentDevice();
		$mico.getAuthDev(app.getUser().userToken,function (ret) {
			if (ret){
				for (var i = 0; i < ret.length; i++) {
					if (ret[i].id == cur.id){
						$("#listhide").show();
						break;
					}
				}
			}
//			alert("authDev:"+JSON.stringify(ret))
		})
	}
	
	
    function getMqtt() {
        if (_mqtt == null) {
            _mqtt = api.require("micoMqtt");
        }
        return _mqtt;
    }

    function mqttStart() {
    		var clientId= "v1_app"+app.getUser().userToken.substr(0,12).toLowerCase();
    		 getMqtt().stopRecvMqttMsg(function (ret) {
//  		 	alert(JSON.stringify(ret));
    		 });
    		 getMqtt().stopMqtt(function (ret, err) {
	            micoSubscribe(config.host, "", "", clientId);
	        });
    	
//      api.prompt({ buttons: ['确定', '取消'], text: config.topic }, function (ret, error) {
//          if (ret.buttonIndex == 1) {
//              config.topic = ret.text;
//              getMqtt().stopRecvMqttMsg();
//              getMqtt().stopMqtt(function (ret, err) {
//              		micoSubscribe(config.host, "", "", clientId);
//              });
//          }
//      })
    }
    function stopMqtt() {
        getMqtt().stopMqtt(function (ret, err) {
//          alert(JSON.stringify(ret))
        });
    }

    //publish的功能
    function micoPublish(topicStr, payloadStr) {
        var micoMqtt = getMqtt();
        micoMqtt.publish({
            topic: topicStr,
            command: payloadStr
        }, function (ret, err) {
            if (ret.status) {
            }
        });
    }

    function publishCmds(cmds) {
//  		alert(JSON.stringify(cmds));
        micoPublish(config.topic + "/in.json", JSON.stringify(cmds));
    }
    
    function ready(){
    		publishCmds({read:"0"});
    }

    //subscribe的功能
    function micoSubscribe(host, username, password, clientID) {
        var micoMqtt = getMqtt();
        micoMqtt.startMqtt({
            micoMqtt: micoMqtt,
            host: host,
            username: username,
            password: password,
            clientID: clientID,
            topic: config.topic + "/#"
        }, function (ret, err) {
            if (ret.status) {
                micoMqtt.recvMqttMsg(function (ret, error) {
                    internal.parseSubs(ret.subs);
                    chgtxt(ret.subs);
                });
//              alert("ready");
//          		timeId = setInterval(ready,3000)
            		ready();
            }else{
            		alert("startMqtt:"+JSON.stringify(err))
            }
        });
    }
	
	this.publishCmds=function (cmd) {
		publishCmds(cmd);
	}
	
	this.fixsave = function() {
		var name = $("#txtaccount").val();
		$e.find("#devName").text(name);
		$mico.editDevName(app.id,app.getUser().userToken, name,app.currentDevice(),function (ret,error) {
			var cur = app.currentDevice();
			cur.alias = name;
			app.currentDevice(cur);
//			alert(JSON.stringify(ret))
//			alert(JSON.stringify(error))
			$(".dialog").hide();
			$("#dlgdevicename").hide();
			$("#lrswiper").removeClass("blurfilter");
		})
	}
	
	this.start = function (dev) {
		var self = this;
		var user = app.getUser();
		if (!user) return;
		if(dev){
			if (dev.id == config.topic){
//				alert("it's the same device");
				return;
			}
			app.currentDevice(dev);
		}
		var cur = app.currentDevice();
		var list = devlist.getList();
        if (cur) {
            config.topic = cur.id;
            this.unlock();
            checkOwner();
            mqttStart();
            $e.find("#devName").html(cur.alias);
        }else if(list && list.length > 0){
        		app.currentDevice(list[0]);
        		this.start();
        }else if(app.getUser()) {
        		if (list == null){
	        		devlist.getDevices(function(ret) {
	        			ret && self.start();
	        		})
        		}
        }
	}
	var $lock = $e.find(".outcontent, .indoor");
	this.locked = true;
	this.lock = function(){
		this.locked = true;
		$lock.click(function () {
			if(app.getUser()){
				$api.openFrame("bindguide.html")
			}else{
				$api.openFrame("guide.html")
			}
		})
	}
	this.unlock = function () {
		this.locked = false;
		$lock.unbind();
	}
	
	this.useDevice=function(device) {
		current = device;
	}
	this.lock();
}
function Setting () {
	var $e = $("#setting");
	this.acc=function () {
		var user = app.getUser();
		if (!user){
			$api.openFrame("login.html");
		}else{
			$api.open("setpw.html")
		}
	}
	this.addDev = function () {
		$api.openFrame("searchDev.html");
	}
	this.addUser = function () {
		$("#txtOtherName").val("");
		$("#divOtherName .dialog").show();
		$("#lrswiper").addClass("blurfilter");
	}
	this.saveAddUser = function () {
	    var otherName = $("#txtOtherName").val();//对方账号名称
	    $api.wait("正在添加...")
	    $mico.authDev(app.id, app.getUser().userToken, otherName, app.currentDevice().id, function (ret, err) {
	        $("#divOtherName .dialog").hide();
	        $("#lrswiper").removeClass("blurfilter");
			$api.hideWait(); 
	        if(ret){
	        		api.alert({msg:"添加成功"})
	        }else{
	        		api.alert({title:"添加失败",msg:err.responseJSON.error.message});
	        }
		})
	}
	this.openSetting = function () {
		$api.open("setting.html")
	}
}

function DeviceList() {

	var $e = $("#devList");
//	var $ul = $e.find('ul');
	var list = null;
	var docin = document.getElementById("devList");
	var start = {x:0,y:0};

	function moveHandler (evt) {
		if (Number(evt.touches[0].pageY)-start.y > 20){
			docin.removeEventListener("touchmove",moveHandler);
			$e.hide();
			$("#lrswiper").show();
		}
	}
	docin.addEventListener("touchstart",function(evt){
		start.x = Number(evt.touches[0].pageX);
		start.y = Number(evt.touches[0].pageY);
		docin.addEventListener("touchmove",moveHandler);
	},false);
	
	function showList() {
		$ul = $("#dev_content");
		$ul.empty();
		for (var i = 0; i < list.length; i++) {
            $ul.append('<div class="swiper-slide"><div class="img"></div>'+list[i].alias+'</div>')
		}
	}
	
	this.hasDevice=function () {
		return list && (list.length > 0)
	}
	this.getList=function () {
		return list;
	}
	this.clear = function () {
		list = null;
	}
	
	this.getDevices = function(callBack) {
		var user = app.getUser();
		if (user == null) {
			callBack(null);
			return;
		}
		$api.wait("获取设备列表");
        $mico.getDevList(user.userToken, function (ret, err) {
            $api.hideWait();
            if (ret) {
		        	list = ret;
                if (ret.length >= 1) {
                		showList();
                }
            } else {
            }
            callBack(ret);
        })
	}
}
