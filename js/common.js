$(window).load(function(){  
    $("#loadingBox").hide();  
})

//发送验证码倒计时
var countdown=180; 
function settime(obj) { 
    var tels = $('.tels').val();
    if(tels == ''){
		 art.dialog({
				  title:false,
                  close:false,
				  cancel:false,
			      content: '请先填写手机号',
				  time:(1)
				  });
		return false;
	}
    if (countdown == 0) { 
        obj.removeAttribute("disabled");    
        obj.value="发送验证码"; 
        countdown = 180; 
        return;
    } else { 
	    $('.send_code').css({'background':'#e1e1e1','color':'#a0a0a0','border':'0'})
        obj.setAttribute("disabled", true); 
        obj.value=countdown+"秒后重发"; 
        countdown--; 
    } 
setTimeout(function() { 
   settime(obj)}
    ,1000) 
}
function queryHintCallback(loadingBox){
    var loadingBox = document.getElementById(loadingBox);
    loadingBox.style.display="none";
}
function SetDivCenter(objId) {
    var divId = document.getElementById(objId);
    var dleft = 0;
    var dtop = 0;
        dleft = (document.documentElement.clientWidth - divId.clientWidth) / 2 + document.documentElement.scrollLeft;
        dtop = (document.documentElement.clientHeight - divId.clientHeight) / 2 + document.body.scrollTop;
    if (dleft < 0) {
        dleft = 0;
    }
    if (dtop < 0) {
        dtop = 0;
    }
    divId.style.left = dleft + "px";
    divId.style.top = dtop + "px";
}


   