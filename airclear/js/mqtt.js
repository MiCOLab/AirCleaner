var config = {
	host:"api.easylink.io",
	topicStr:"58f341ed/c893464d0759/#",
	publicTopic:"58f341ed/c893464d0759/in.json",
	clientId:"aca213caec5c",
	username:"",
	password:""
}

	var opts=[
		{label:"读取状态",cmd:{read:"0"}},
		{label:"电源关",cmd:{power:"0"}},
		{label:"电源开",cmd:{power:"1"}},
		{label:"新风关",cmd:{xinfen:"0"}},
		{label:"新风开",cmd:{xinfen:"1"}},
		{label:"智能关",cmd:{auto:"0"}},
		{label:"智能开",cmd:{auto:"1"}},
		{label:"风速1",cmd:{fjset:"1"}},
		{label:"风速2",cmd:{fjset:"2"}},
		{label:"风速3",cmd:{fjset:"3"}},
	];
	var html="";
	for (var i = 0; i < opts.length; i++) {
		var cmd = JSON.stringify(opts[i].cmd);
		html += "<option value='"+cmd+"'>"+opts[i].label+" "+cmd+'</option>'
	}
$("#cmds").html(html);
function cmdHandler(){
	var cmd = $("#cmds").val();
	alert(cmd)
	micoPublish(config.publicTopic,cmd);
}


function onData(ret,err) {
	alert("getData in index");
	alert(JSON.stringify(ret));
//	var subs = ret.subs;
//	alert("getData"+subs['read']);
//	if (subs['read'] != 0){
//		alert("realMsg:"+JSON.stringify(ret))
//	}
	chgtxt(ret.subs);
}
    

function mqttStart() {
    micoSubscribe(config.host, "", "", config.topicStr,  config.clientId);
}

function stopMqtt () {
	var micoMqtt = api.require("micoMqtt");
	micoMqtt.stopMqtt(function(ret, err) {
		alert("stop:"+JSON.stringify(ret));
	});
}


function publishCmds(cmd) {
	micoPublish(config.publicTopic,JSON.stringify(cmd));
}

//publish的功能
function micoPublish(topicStr, payloadStr) {
	alert("micoPublish: "+payloadStr)
	var micoMqtt = api.require("micoMqtt");
	var command = payloadStr;
	micoMqtt.publish({
		topic : topicStr,
		command : command
	}, function(ret, err) {
		alert("publish_ret:"+JSON.stringify(ret));
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
			micoMqtt.recvMqttMsg(function (ret,error) {
				alert("getData in index");
				alert(JSON.stringify(ret));
			});
			publishCmds({read:"0"});
			alert("started");
		}
	});
}