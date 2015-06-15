function Internal() {
	var dic = {};
	var on="on";
	var off="off";
	var $fj;
	
	function pushValue(key,value) {
		var obj={};
		obj[key]=String(value);
		publishCmds(obj);
	}
	
	function toggle(id) {
		var state =bindVal(id);
		bindVal(id, state == on ? off : on);
		return bindVal(id);
	}
	
	function bindVal(id,value) {
		if (value == "1"){
			value = on;
		}else if (value == "0"){
			value = off;
		}
		var obj = dic[id];
		if (obj == null) return;
		var $e = obj.e;
		if (value == null){
			if($e.hasClass(obj[on])){
				return on;
			}else{
				return off;
			}
		}
		if (value == on){
			$e.removeClass(obj.off);
			$e.addClass(obj.on);
		}else if (value == off){
			$e.removeClass(obj.on);
			$e.addClass(obj.off);
		}
		obj.cb && obj.cb(value);
	}
	
	/**
	 * @param {IDString} id;
	 * @param {ClassString} onCls;
	 * @param {ClassString} offCls;
	 */
	this.bind=function (id,onCls,offCls,cb) {
		var $e = $("#"+id);
		$e.click(function () {
			var state = toggle(id);
			if (id == "power"){
				bindVal("powera",state);
			}
			if (id == "sleep"){
				bindVal("sleepa", state);
			}
			if(id=="timing-on" || id=="sleep"){
				pushValue(id, state == on ? "0001" : "0000");
			}else if (id == "powera"){
				bindVal("power",state);
				return;
			}else if(id == "sleepa"){
				bindVal("sleep",state);
				return;
			}else{
				pushValue(id, state == on ? "1" : "0");
			}
		})
		dic[id] = {e:$e,on:onCls,off:offCls,cb:cb};
	}
	
	this.parseSubs = function (data) {
//		alert("parse in Internal"+JSON.stringify(data));
		for (var key in data){
			if(key=="fj"){
				$fj.val(data[key]);
			}else{
				bindVal(key, data[key]);
			}
		}
	}
	this.init = function () {
		internal.bind("power","power-on","power-off");
		internal.bind("powera","power-on","power-off");
		internal.bind("xinf","xinfen-on","xinfen-off");
		internal.bind("sleep","sleep-on","sleep-off");
		internal.bind("sleepa","sleep-on","sleep-off");
		internal.bind("timing-on","timer-on","timer-off");
		internal.bind("auto","auto-on","auto-off",hideCpanel);
		$fj = $("#fj");
		var timeId = 0;
		function setFj () {
			pushValue("fjset",$fj.val());
		}
		
		$fj.change(function (e) {
			clearTimeout(timeId);
			timeId = setTimeout(setFj,500)
		})
	}
}

var internal = new Internal();
