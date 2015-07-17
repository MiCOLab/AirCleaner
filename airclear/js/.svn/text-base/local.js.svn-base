var config
var evtName;
function getDevId () {
	config = params;
	alert(JSON.stringify(config))
	$mico.getDevid(config.devip,"1234",config.devToken,function (ret,error) {
		config.device_id = ret.device_id;
		alert(JSON.stringify(ret));
		alert(JSON.stringify(error));
		api.sendEvent({
		    name: evtName,
		    extra: config
		});
	})
}

function run() {
	var p = api.pageParam;
	evtName = p.id;
	eval(p.code+"()");
}