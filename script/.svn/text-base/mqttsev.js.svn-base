/**
 * Created by rocke on 15-5-1.
 */

/*
*以下是APICloud模块连接的方式
* */
//publish的功能
function micoPublish(topicStr, payloadStr) {
	var micoMqtt = api.require("micoMqtt");
	var topic = topicStr;
	var command = payloadStr;
	micoMqtt.publish({
		topic : topic,
		command : command
	}, function(ret, err) {
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
			micoMqtt.recvMqttMsg(function(ret, err) {
				chgtxt(ret.subs);
			});
		}
	});
}

//stop mqtt
function stopMqtt() {
	var micoMqtt = api.require("micoMqtt");
	micoMqtt.stopMqtt(function(ret, err) {
	});
}
