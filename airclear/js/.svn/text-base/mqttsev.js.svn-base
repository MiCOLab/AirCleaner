/**
 * Created by rocke on 15-5-1.
 */

function Mqtt(){
	var micoMqtt = api.require("micoMqtt");
	var host="api.easylink.io";
	var topicStr="58f341ed/c893464d0759/#";
 	var pushTopic = "58f341ed/c893464d0759/in.json";
	var username = "";
	var password = "";
	this.start = function (){
		micoMqtt.startMqtt({
			host:config.host,
			username : config.username,
			password : config.password,
			clientID : "aca213caec5c",
			topic : config.topicStr
		}, function(ret, err){
			if(ret.status){
			    api.alert({msg:'start success'});
			  //  $api.alert({msg:"alert$api"});
			}else{
			    alert("error");
			    api.alert({msg:err.msg});
			}
		});
	}
	
	this.stop = function () {
		micoMqtt.stopMqtt(function(ret, err) {
		});
	}
	
	
}


function setAuto () {
	var cmd = {"read":"0"}
    // var cmd = {"fjset":"3"}
    // var cmd = {"power":"1"}
	micoPublish("58f341ed/c893464d0759/in.json",JSON.stringify(cmd));
// 	micoPublish("58f341ed/c893464d0759/#",JSON.stringify(cmd));
	alert(JSON.stringify(cmd));
}


/*
*以下是APICloud模块连接的方式
* */

function mqttStart() {
	alert("restart")
	var micoMqtt = api.require("micoMqtt");
	micoMqtt.stopMqtt(function(ret, err) {
		alert(JSON.stringify(ret));
	});
    micoSubscribe(config.host, "", "", config.topicStr,  config.clientId);
}

//publish的功能
function micoPublish(topicStr, payloadStr) {
	var micoMqtt = api.require("micoMqtt");
	var command = payloadStr;
	micoMqtt.publish({
		topic : topicStr,
		command : command
	}, function(ret, err) {
		alert(JSON.stringify(ret));
		if(ret.status){
		}
	});
}

//subscribe的功能
function micoSubscribe(host, username, password, topicStr, clientID) {
	var micoMqtt = api.require("micoMqtt");
	var host = host;
	var username = username;
	var password = password;
	var clientID = clientID;
	var topic = topicStr;
	micoMqtt.startMqtt({
		micoMqtt : micoMqtt,
		host : host,
		username : username,
		password : password,
		clientID : clientID,
		topic : topic
	}, function(ret, err) {
		if (ret.status) {
		    alert("started");
			micoMqtt.recvMqttMsg(function(ret, err) {
				alert("getData");
				alert(JSON.stringify(ret));
				chgtxt(ret.subs);
			});
		}
	});
}

