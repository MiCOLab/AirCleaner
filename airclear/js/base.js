function inputInfo(id,txt) {
	var _obj = $("#"+id);
	if (_obj.length > 0) {
	    _obj.attr("placeholder", txt);	 
		_obj.focusin(function(){ 	
			 $(".footclose,.noaccount").hide();
		}).focusout(function(){ 
			 $(".footclose,.noaccount").css("display","inline-block");
        }); 
	}
}