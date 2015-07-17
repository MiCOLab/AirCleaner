function Internal() {
	var dic = {};
	var on="on";
	var off="off";
	var $fj;
	this.xinf = "0";
	this.djiaren = "0";
	
	function pushValue(key,value) {
		var obj={};
		obj[key]=String(value);
	 	inDoor.publishCmds(obj);
	}
	function pad(num, n) {  
	  	var len = num.toString().length;  
	    while(len < n) {  
	        num = "0" + num;  
	        len++;  
	    }  
	    return num;   
	}  
	
	function toggle(id) {
		$e = dic[id];
		bindVal(id, $e.state == on ? off : on);
		return bindVal(id);
	}
	
	function bindSpan(id,value){
		var $e = dic[id];
		$e.html(value);
	}
	
	function bindVal(id,value) {
		if (value == "1"){
			value = on;
		}else if (value == "0"){
			value = off;
		}
		var $e = dic[id];
		
		if (value == null){
			return $e && $e.state;
		}
		$e.attr("src", value == on ? $e.onSrc : $e.offSrc);
		$e.state = value;
//		obj.cb && obj.cb(value);
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
//		alert("interal"+JSON.stringify(data))
		for (var key in data){
			if(key=="fj"){
				$fj.val(data[key]);
//				alert($fj.val());
			}else if (key == "auto"){
				fixSDorZN(data[key]);	
			}else{
				var $e = dic[key];
				if ($e){
					if($e.ctype == "span"){
						$e.html(Number(data[key]));
					}else{
						bindVal(key, data[key]);
					}
				}
				if(key == "pm25"){
					fixInLevelChange(data[key]);
				}else if(key == "xinf"){
					this.xinf = data[key];
				}else if (key == "djiaren"){
					this.djiaren = data[key];
				}
			}
		}
	}
	
	/**
	 * @param {String} name
	 */
	this.initTbtn = function(id) {
		var $e = $("img[name='"+id+"']");
		$e.ctype = "img"
		$e.onSrc = $e.attr("src");
		$e.offSrc = $e.attr("off");
		$e.state = on;
		
		if((id != "timing-on") && (id != "xinf")){
			$e.click(function () {
				toggle(id);
				pushValue(id, $e.state == on ? "1" : "0");
			})
		}
		dic[id] = $e;
	}
	
	this.setTiming = function(value,type){
		var times = value.split(":");
		var mins = Number(times[0]) * 60 + Number(times[1]);
		bindVal("timing-on", mins == 0 ? "0" : "1");
		if(mins == 0){
			pushValue("power",bindVal("power") == on ? "1":"0");
		}else{
			value = pad(mins,4);
			pushValue(type,value);
		}
	}
	
	this.setXinf = function (datas) {
		if (datas['xinf'] != null){
			this.xinf = datas['xinf'];
			pushValue("xinf", this.xinf);
			bindVal("xinf",this.xinf);
			if(datas['xinf'] == "0"){
				datas['djiaren'] = "0";
			}
		}
		if (datas['djiaren'] != null){
			this.djiaren = datas['djiaren'];
			pushValue("djiaren",this.djiaren);
		}
//		alert(JSON.stringify(datas))
	}
	
	this.bindSpan = function(id,$e) {
		$e.ctype = "span";
		dic[id] = $e;
	}
	
	this.init = function () {
		internal.initTbtn("power");
		internal.initTbtn("xinf");
		internal.initTbtn("sleep");
		internal.initTbtn("timing-on");
		$fj = $("#fj");
		var timeId = 0;
		function setFj () {
			pushValue("fjset",$fj.val());
		}
		$fj.change(function (e) {
			clearTimeout(timeId);
			timeId = setTimeout(setFj,500)
		})
		var $indoor = $("#inDoor");
		internal.bindSpan("pm25",$indoor.find("span[name=PM25]"));
		internal.bindSpan("co2",$indoor.find("span[name=CO2]"));
//		internal.parseSubs({"fj":"1","power":"1","jiare":"0","pmjb":"1","auto":"0","co2jb":"0","co2":"0440","pm25":"099","wd1":"+25","xinf":"0","wd2":"+26","sleep":"0"})
	}
}
var internal = new Internal();
