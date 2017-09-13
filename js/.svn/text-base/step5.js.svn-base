
function getURLParam(name){
    var reg = new RegExp("(?:^|&|\\?)" + name + "=([^&]*)(?:&|$)"),paramslist=top.location.search.match(reg),result="";
    if(paramslist){
    	return paramslist[1];
    }
    return result;
}

$(function(){
	var agreeSignzp=false,clickcout=0,imgdata64="",secclick=true,sq = {
			init:function(){
				/** 初始化签名插件 */
				this.testAnySign(112321321);
				/** 初始化签名插件配置 */
				this.testSetTemplateData();
				this.bind();
				this.updateTime();
			},
			data:{},
			bind:function(){
				var self = this;
				// 授权书显示
				  $(".sqshu").click(function(){
				    $("#popup-shouquan").show();
				  })
				// 平安普惠用户注册协议
				  $(".zhucexieyi").click(function(){
				    $("#popup-xieyi").show();
				  })
				/** 点“签名”显示签名的canvas &&  再次签名显示canvas */
				$("#btnNext-SGN").bind("touchstart",function(){
					self.testPopupDialog(20);
					$("#btnNext-sign").hide();
					$("#qian-img").hide();
					$("#dialog").show();
					$("#xss_20").hide();
				});
				/** 签字后的确认按钮 */
				$("#btnNext").bind("touchend",function(){
					sign_confirm();
					/** 未签字后的确认按钮 */
					$(".mesWindowBottom").bind("touchend",function(){
						closeWindow();
					});
				});
				/** 签字后的取消按钮 */
				$("#btnNext-CNL").bind("touchend",function(){
					agreeSignzp = false;
					cancelSign();
				});
				/** 签字后的清屏按钮 */
				$("#btnNext-CLR").bind("touchend",function(){
					agreeSignzp = false;
					clear_canvas();
				});
				/** 同意授权 */
				$(".s-btn").bind("touchend",function(){
					if(agreeSignzp){
						if(secclick){
							secclick = false;
							//$(".shenpiWrap").show();
							self.agreeSign();
						}
					}else{
						alert("请先签名");
					}
				});
			},
			updateTime:function(){
				var self = this;
				$.ajax({
					type:"POST",
					url:"/do/zed/enterSign",
					dataType:"json",
					success:function(response){
						if(response.resultCode == "success"){
							$("#signDate").html(response.enterSignDate);
						}else{
							window.location = '/microWebsite/jdcx_check.html';
						}
					}
				});
			},
			setAlertTitle:function(){
                document.title = "返回结果";
            },
          //配置模板数据
			testSetTemplateData:function(){
		       // var formData = "{\"bjcaxssrequest\":{\"submitinfo\":[{\"username\":\"测星雨\",\"identitycardnbr\":\"320902198901191012\"},{\"username\":\"测星雨123\",\"identitycardnbr\": \"320902198901191012\"}]}}";
		        var formData = "<html><head></head><body><div id=\"colArea\" class=\"pageFormContent\" style=\"width:95%;background:#f9fbf9;display:block;\"><div class=\"unit\"><label class=\"fontLabel\">keyword：</label></div><div class=\"unit\"><label class=\"fontLabel\">列名2：</label></div><div class=\"unit\"><label class=\"fontLabel\">列名3：</label></div></div></body></html>";
		        var businessId = "719314ea7b88304004c8ff498";//集成信手书业务的唯一标识
		        var template_serial = "1#4000";//用于生成PDF的模板ID
		        var channel = "10010";//渠道号，由信手书提供，请咨询项目经理
		        var res;
		        //配置JSON格式签名原文
		        res = apiInstance.setTemplate(TemplateType.HTML,formData,businessId,template_serial);
		        if(!!res){
		         //alert("setTemplateData success");
		            return res;
		        }else{
		            //alert("setTemplateData error");
		            return res;
		        }
		    },
		  //添加签名框
		  testAddSignatureObj:function(objId){
		        var context_id = objId;
		        var signatureConfig = new SignatureConfig(new Signer("李明", "11011111111"), new SignRule_KeyWord("客户签名：",'2',0,1));
		        var res = apiInstance.addSignatureObj(context_id,signatureConfig);
		        if(!!res){
		          //alert("addSignatureObj "+context_id+" success");
		            return res;
		        }else{
		            //alert("addSignatureObj "+context_id+" error");
		            return res;
		        }
		    },
		  //demo总入口
		  testAnySign:function(channel){
		    	var self = this;
		        var res;
		        var callback = function(context_id,context_type,val){
		        	if(context_type == CALLBACK_TYPE_START_RECORDING || context_type == CALLBACK_TYPE_STOP_RECORDING){
		        		return;
		        	}
		            if(context_type == CALLBACK_TYPE_SIGNATURE){
		                //签名回显
		                document.getElementById("xss_20").src = "data:image/gif;base64," + val;
		                imgdata64 = val;
		                self.testGenData();
		                self.confirmTest();
		            }else if(context_type == CALLBACK_TYPE_ON_PICTURE_TAKEN){
		                document.getElementById("preview").src = "data:image/gif;base64," + val;
		            }else if(context_type == CALLBACK_TYPE_ON_MEDIA_DATA){
		            	var audio = document.createElement("audio");
		                if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")){
		                    audio.src = "data:image/gif;base64," + val;
		                    audio.play();
		                }
		            }else if(context_type == 3){
		            	$("#btnNext-sign").show();
				        $("#qian-img").show();
				        $("#dialog").hide();
				        $("#xss_20").hide();
		            }
		            self.setAlertTitle();
		            //alert("收到浏览器回调：" + "context_id：" + context_id + " context_type：" + context_type + " value：" + val);
		        };//测试回调，将回调数据显示
		        ////////////////////////////////////////////////
		        apiInstance = new AnySignApi();
		        //初始化签名接口
		        res = apiInstance.initAnySignApi(callback,channel);
		        if(!res){
		        	//alert("init error");
		        }else{

		        }	

		        //注册单字签字对象20
		        res = self.testAddSignatureObj(20);
		        if(!res){
		            //alert("testAddSignatureObj error");
		        }else{

		        }
		        //注册一个单位签章
		        var cachet_config = new CachetConfig(new Signer("小明","110xxxxxx"), new SignRule_Tid("1121_cachet"), true);
		        res = apiInstance.addChachetObj(cachet_config);
		        if(!res){
		            //alert("addChachetObj error");
		        }else{

		        }
		        //将配置提交
		        res = apiInstance.commitConfig();
		        if(res){
		        	//alert("Init ALL 初始化成功");
		        }else{
		        	//alert("Init ALL 初始化失败");
		        }
		    },
		  //生成签名加密数据
		  testGenData:function(){
		    var self = this;
	        try {
	            self.data.res = apiInstance.getUploadDataGram();
	        }catch(err){
	            //alert(err);
	        }
	        
	    },
	  //弹出签名框签名
	  testPopupDialog:function(context_id){
	        switch (apiInstance.showSignatureDialog(context_id)){
	            case RESULT_OK:
	                break;
	            case EC_API_NOT_INITED:
	                alert("信手书接口没有初始化");
	                break;
	            case EC_WRONG_CONTEXT_ID:
	                alert("没有配置相应context_id的签字对象");
	                break;
	        }
	    },
	    //提交
	    confirmTest:function(){
	    	var self = this;
	    	var strJSON = self.data.res;
            //为了防止后台XSS过滤，暂时将加密字符串某些字符替换
           var strJSONStr =  strJSON.replace(/"/g, "#");
            var pSign = "";
            $(".zpp").each(function(i,e){
            	 var str = e.innerHTML;
                 if($(e).attr("flag")){
                   pSign += (str + "#");
                 }else{
                   pSign += (str + "&");
                 }
            });
            //陆金所注册协议追加
            /*pSign += "#";
            $(".zpp2").each(function(i,e){
	            var str = e.innerHTML.replace(/\n/g,"");
	            	pSign += (str + "&");
            });*/
            pSign += $("#zpp").text();
            pSign = pSign.replace(/<[^<>]*>/g,"");
            pSign = pSign.replace(/\s/g,"")
            var pramets = {
        			imageData:"data:image/png;base64,"+imgdata64,
        			signData:strJSONStr,
        			p:pSign
        			
        		}
	    	$("#waitpic").show();
            $.ajax({
    			type : 'POST',
    			url : '/do//zed/zedESign',
    			dataType : 'json',
    			data : pramets,
    			success : function(response) {
	            	agreeSignzp = false;
	            	if(response.errorCode=='555'){
	            		$("#waitpic").hide();
	            		art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
						      content: "系统错误,请稍后重试",
							  time:(2)
						});
					} else if(response.resultCode == "0000"){//session超时
						window.location = '/microWebsite/jdcx_check.html';
					} else if(response.resultCode == "801"){
						//验证成功
						window.location.href="holding.html";
					}else if(response.resultCode == "0000" || response.resultCode == "404"){
						//超时,进度查询
						$("#waitpic").hide();
						art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
						      content: "修改状态再刷新",
							  time:(2)
						});
						//window.location.href="step1-2.html";
					}else{
						$("#waitpic").hide();
						art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
						      content: "系统错误,请稍后重试",
							  time:(2)
						});
					}
    			}
    		});
	    }
};
	sq.init();

})