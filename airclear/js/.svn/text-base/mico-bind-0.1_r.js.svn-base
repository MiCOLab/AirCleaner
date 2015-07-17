/*
 * JavaScript Library
 * Copyright (c) 2015 mxchip.com
 */
(function(window) {
	var m = {};
	m.test = function(str) {
		return str.length;
	};

	//获取设备列表
	m.getDevList = function(userToken, callback) {
		var sucm;
		var errm;
		AV.Cloud.run('getDevList', {
			userToken : userToken,
		}, {
			success : function(ret) {
				callback(ret.data, errm);
			},
			error : function(err) {
				//处理调用失败
				callback(sucm, err);
			}
		});
	};

	//获取owner权限的设备
	m.getAuthDev = function(userToken, callback) {
		var sucm;
		var errm;
		AV.Cloud.run('getAuthDev', {
			userToken : userToken,
		}, {
			success : function(ret) {
				callback(ret.data, errm);
			},
			error : function(err) {
				//处理调用失败
				callback(sucm, err);
			}
		});
	};

	//修改设备名称
	m.editDevName = function(appid, usertoken, devname, devid, callback) {
		api.ajax({
			url : "http://api.easylink.io/v1/device/modify",
			type : 'post',
			data : {body:JSON.stringify({
					device_id : devid,
					alias : devname
				})},
			headers : {
				"Content-Type" : "application/json",
				"X-Application-Id" : appid,
				"Authorization" : "token " + usertoken
			}
		},callback);
	};

	//删除设备
	m.deleteDev = function(appid, usertoken, devid, callback) {
		api.ajax({
			url : "http://api.easylink.io/v1/device/delete",
			type : 'post',
			data :{body:JSON.stringify({
					device_id : devid
				})},
			headers : {
				"Content-Type" : "application/json",
				"X-Application-Id" : appid,
				"Authorization" : "token " + usertoken
			},
			success : function(ret) {
				callback("success", errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	//获取设备id
	m.getDevid = function(devip, devpsw, devtoken, callback) {
		var sucm;
		var errm;
		var ajaxurl = 'http://' + devip + ':8001/dev-activate';
		api.ajax({
			url : ajaxurl,
			type : 'post',
			data:{
				body:JSON.stringify({
					login_id : "admin",
					dev_passwd : devpsw,
					user_token : devtoken
				})
			},
			headers : {
				"Content-Type" : "application/json"
			},
		},callback);
	};

	//去云端绑定设备
	m.bindDevCloud = function(appid, usertoken, devtoken, callback) {
		var sucm;
		var errm;
		api.ajax({
			url : 'http://api.easylink.io/v1/key/authorize',
			type : 'POST',
			data : {
				values:{active_token : devtoken}
			},
			headers : {
				"Authorization" : "token " + usertoken,
				"X-Application-Id" : appid
			}
		},callback);
	};

	//授权设备
	m.authDev = function(appid, usertoken, phone, devid, callback) {
		var sucm;
		var errm;
		api.ajax({
			url : 'http://api.easylink.io/v1/key/user/authorize',
			type : 'POST',
			data : {
				values:{login_id : phone,
				owner_type : "share",
				id : devid},
			},
			headers : {
				"Authorization" : "token " + usertoken,
				"X-Application-Id" : appid
			}
		},callback);
	};

	/*end*/
	window.$mico = m;

})(window);
