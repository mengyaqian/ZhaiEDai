	$(function(){
		initData();
	})
	function initData(){
		$.ajax({
			type:"post",
 			url:"/do/zed/querySuccAppointInfo",                 
 			dataType:'json',
 			async:false,
 			success : function(response){
				if(response.errorCode=='555'){
         			art.dialog({
         				title:false,
                        close:false,
       		             cancel:false,
       	                 content: '系统错误,请稍后重试',
       		             time:(2)
   		             });
    			}else if(response.queryAppointCode=='0000'){
    				window.location.href='/microWebsite/jdcx_check.html';
    			}else if(response.queryAppointCode=='000'){
    				$("#appMobile").html(response.appBindMobile);
    				$("#address").html(response.address);
    				$("#date").html(response.appointmentDate);
    				$("#time").html(response.appointmentTime);
    			}else if(response.queryAppointCode=='001'){
    				art.dialog({
         				title:false,
                        close:false,
       		             cancel:false,
       	                 content: '无预约信息！',
       		             time:(2)
   		             });
    			}else {
    				art.dialog({
         				title:false,
                        close:false,
       		             cancel:false,
       	                 content: '系统异常！',
       		             time:(2)
   		             });
    			}
			}
		});
	}