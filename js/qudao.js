	  
	$(function(){
		qudao.init();
	})
	
	var qudao = {
		submitFlag : false,
		init : function(){
			$.ajax({
				type:"post",
	 			url:"/do/zed/getMediaSource",                 
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
	    			}else if(response.resultCode=='001'){
	    				var MediaSourceName = "";
	    				if(response.MediaSource == "CXX-WXDLUFAXHK-015-WAP-ZED2.0N"){
	    					MediaSourceName = "好贷网";
	    				}else if(response.MediaSource == "CXX-WXDLUFAXHK-053-WAP-ZED2.0N"
	    					|| response.MediaSource == "CXX-WXMWWNUFND--CSM-M0017ZED"){
	    					MediaSourceName = "优房网";
	    				}else if(response.MediaSource == "CXX-WXDLUFAXHK-054-WAP-ZED2.0N"
	    					|| response.MediaSource == "CXX-WXMWWGBLNR--CSM-M0017ZED"){
	    					MediaSourceName = "安徽博洛尼尔";
	    				}else if(response.MediaSource == "CXX-WXDLUFAXHK-055-WAP-ZED2.0N"
	    					|| response.MediaSource == "CXX-WXMWWXZHOY--CSM-M0017ZED"){
	    					MediaSourceName = "肇煜";
	    				}else if(response.MediaSource == "CXX-WXDLUFAXHK-056-WAP-ZED2.0N"
	    					|| response.MediaSource == "CXX-WXMWWIRNQN--CSM-M0017ZED"){
	    					MediaSourceName = "融氢金融";
	    				}else if(response.MediaSource == "CXX-WXDLUFAXHK-051-LIST1-1-ZED"
	    					|| response.MediaSource == "CXX-WXDLUFAXHK-051-LIST2-1-ZED"
	    					|| response.MediaSource == "CXX-WXDLUFAXHK-051-LIST2-2-ZED"
	    					|| response.MediaSource == "CXX-WXDLUFAXHK-051-LIST2-3-ZED"
	    					|| response.MediaSource == "CXX-WXDLUFAXHK-051-LIST2-4-ZED"
	    					|| response.MediaSource == "CXX-WXDLUFAXHK-051-LIST2-5-ZED"){
	    					MediaSourceName = "平安普惠联盟贷";
	    				}else if(response.MediaSource == "CXX-WXHAOWZHYN--CSM-M0015ZED"){
	    					MediaSourceName = "璋赢";
	    				}else if(response.MediaSource == "CXX-WXHAIWSHYR--CSM-M0016ZED"){
	    					MediaSourceName = "上海聿融";
	    				}else if(response.MediaSource == "CXX-WXHAOGHONH--CSM-M0016ZED"){
	    					MediaSourceName = "鸿欢";
	    				}else if(response.MediaSource == "CXX-WXHAIAPHLM-Q001-CSM-M0017ZED"
	    					|| response.MediaSource == "CXX-WXHAIAPHLM-Q002-CSM-M0017ZED"
	    					|| response.MediaSource == "CXX-WXHAIAPHLM-Q003-CSM-M0017ZED"){
	    					MediaSourceName = "普惠联盟微信";
	    				}else{
	    					MediaSourceName = "默认渠道";
	    				}
	    				$("#qudao").val(MediaSourceName);
	    			}else if(response.resultCode=='0000'){
	    				window.location = '/microWebsite/jdcx_check.html';
	    			}else{
	    				art.dialog({
	         				title:false,
	                        close:false,
	       		             cancel:false,
	       	                 content: '系统错误,请稍后重试',
	       		             time:(2)
	   		             });
	    			}
				}
			});
			this.bind();
		},
		bind : function(){
			var self = this;
			$('#btnNext').click(function(){
				self.qudaoreg();
			})
		},
		qudaoreg : function (){
			var self = this;
		    var input_tel = $('#input_tel').val();	//手机号码
			if(input_tel == ''){
			    art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '请填写手机号',
					  time:(2)
				});
				return false;
			}
			if(! /^1[34578]\d{9}$/.test(input_tel)){
			     art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '手机号填写错误，请重新填写',
					  time:(2)
				 });
				 return false;
			 }
			if(self.submitFlag){
				return;
			}
			self.submitFlag = true;
			$.ajax({
				type:"post",
	 			url:"/do/zed/savaSubMediaSource",                 
	 			dataType:'json',
	 			async:false,
	 			data :{
					ChannelName : input_tel
				},
	 			success : function(response){
					self.submitFlag = true;
					if(response.errorCode=='555'){
             			art.dialog({
             				title:false,
                            close:false,
	       		             cancel:false,
	       	                 content: '系统错误,请稍后重试',
	       		             time:(2)
       		             });
        			}else if(response.resultCode = "01"){
						location.href = "step4.html";
					}else if(response.resultCode = "99"){
						art.dialog({
							  title:false,
			                  close:false,
							  cancel:false,
						      content: '系统异常，请稍后再试',
							  time:(2)
						 });
					}else if(response.resultCode=='0000'){
	    				window.location = '/microWebsite/jdcx_check.html';
	    			}else{
	    				art.dialog({
	         				title:false,
	                        close:false,
	       		             cancel:false,
	       	                 content: '系统错误,请稍后重试',
	       		             time:(2)
	   		             });
	    			}
				}
			})
			
		}
	}
	
	
	 