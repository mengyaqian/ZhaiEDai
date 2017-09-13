
	$(function(){
		step2.init();
	})
	var step2 = {
		/**防止ajax重复提交*/
		submitFlag1 : true,
		submitFlag2 : true,
		init : function(){
			this.bind();
		},
		bind : function(){
			var self = this;
			$('#tels').bind('input propertychange', function() { 
			     this.value = this.value.replace(/[^\d]/g, '');
			});
			$("#btnCode").click(function(){
				self.getCode();
			});
			$("#btnNext").click(function(){
				self.auth_judge();
			})
		},
		getCode : function(){
			var self = this;
			var tels = $('.tels').val();
		    if(tels == ''){
				 art.dialog({
						  title:false,
		                  close:false,
						  cancel:false,
					      content: '请先填写手机号',
						  time:(2)
						  });
				return false;
			}else if(! /^1[34578]\d{9}$/.test(tels)){
			    art.dialog({
					  title:false,
		              close:false,
					  cancel:false,
				      content: '您提供的手机号码格式不正确，请重新填写',
					  time:(2)
					  });
			    return false;
			}
		    if(!self.submitFlag1){
		   	 return;
		    }
		    self.submitFlag1 = false;
		    $.ajax({
				url : "/do/common/sendSmsCommon",
				type : "post",
				dataType:"json",
				data : {
		    		mobile : tels
				},
				success : function(response){
					if(response.errorCode == '555'){
						art.dialog({ 
							  title:false,close:false,cancel:false,
						      content: '系统异常，请稍后重试！',
							  time:(2)
						});
						self.submitFlag1 = true;
					}else if(response.resultCode == "0000"){
						window.location = '/microWebsite/jdcx_check.html';
					}else if(response.sendCode == "000"){ 
						art.dialog({ 
							  title:false,close:false,cancel:false,
						      content: response.sendMsg,
							  time:(2)
						});
						$('.tels').attr("readonly","true");
						/** 发送成功显示倒计时 */
						$('.send_code').css({'background':'#e1e1e1','color':'#a0a0a0','border':'0'})
						var countTime =119;
						var countDown = setInterval(function(){
							setTimeout(function(){countTime--;} ,1000 );
							$("#btnCode").val(countTime+"秒后重发"); 
							if(countTime == 0 ){
								clearInterval(countDown);
								$('.send_code').css({'float':'right',
								  'width': '35%',
								  'height': '28px',
								  'border': '1px solid #f7593b',
								  'color': '#f7593b',
								  '-moz-border-radius': '5px',
								  '-webkit-border-radius': '5px',
								  'border-radius': '5px',
								  'padding-left': '0',
								  'background':''})   
								$("#btnCode").val("发送验证码"); 
								self.submitFlag1 = true;
							}
						}, 1000);
					}else{
						art.dialog({ 
							  title:false,close:false,cancel:false,
						      content: response.sendMsg,
							  time:(2)
						});
						self.submitFlag1 = true;
					}
				}
			});
		},
		auth_judge :function (){
			var self = this;
			var tels = document.auth_form.tels.value;
			var yzm = document.auth_form.yzm.value;
			if(tels == ''){
				 art.dialog({
						  title:false,
		                  close:false,
						  cancel:false,
					      content: '请填写手机号',
						  time:(2)
						  });
				 return false;
			}else if(! /^1[34578]\d{9}$/.test(tels)){
			    art.dialog({
						  title:false,
		                  close:false,
						  cancel:false,
					      content: '您提供的手机号码格式不正确，请重新填写',
						  time:(2)
						  });
			    return false;
			}else if(yzm == ''){
				 art.dialog({
						  title:false,
		                  close:false,
						  cancel:false,
					      content: '请填写验证码',
						  time:(2)
						  });
				 return false;
			}else if(yzm&&!/^\d{6}$/.test(yzm)){
				 art.dialog({
					  title:false,
		              close:false,
					  cancel:false,
				      content: '请填写正确的验证码',
					  time:(2)
					  });
				 return false;
			}
			var storage = window.localStorage;
		    if(!self.submitFlag2){
		      	 return;
		       }
		    self.submitFlag2 = false;
		    $("#waitpic").show();
		    $.ajax({
				url : "/zed/zedCodeCheckAndInitInfo.do",
				type : "post",
				dataType:"json",
				data : {
		    		mobile : tels,
		    		validCode : yzm,
		    		houseProvinceCode : getUrlParam("provinceCode"),
		    		houseCityCode : getUrlParam("cityCode"),
		    		houseAreaCode :getUrlParam("areaCode"),
		    		houseProvinceName : getUrlParam2("provinceName"),
		    		houseCityName : getUrlParam2("cityName"),
		    		houseAreaName :getUrlParam2("areaName"),
		    		mediaSourceCode : getUrlParam("WT.mc_id"),
		    		openId :getUrlParam("openId"),
		    		mgmchannel :getUrlParam("mgmchannel")
				},
				success : function(response){
					$("#waitpic").hide();
					if(response.errorCode == '555'){
						art.dialog({ 
							  title:false,close:false,cancel:false,
						      content: '系统异常，请稍后重试！',
							  time:(2)
						});
						self.submitFlag2 = true;
					}else if(response.resultCode == "0000"){
						window.location = '/microWebsite/jdcx_check.html';
					}else if("000" == response.smsCode){//验证动态码成功
						if("0100" == response.resultCode){//初始化数据成功
							location.href="step3.html";
						}else if("0103" == response.resultCode){//已存在3笔宅e贷
							window.location.href="/m/product/zed/2.0/apply_failed.html?flag=alreadyFull";
							return;
						}else if("0104" == response.resultCode){//有正在申请中的产品，跳转至最新节点页
							loadingZed(response);
						}else if("0106" == response.resultCode){//有正在申请中的产品，跳转至最新节点页
							location.href="step1.html";
						}else{
							art.dialog({
								  title:false,
					              close:false,
								  cancel:false,
							      content: "系统异常",
								  time:(2)
							});
							self.submitFlag2 = true;
						}
					}else if(response.smsCode == "611" || response.smsCode == "609" 
						|| response.smsCode == "608" || response.smsCode == "501" ){//验证失败
						art.dialog({
							  title:false,
				              close:false,
							  cancel:false,
						      content: response.smsMsg,
							  time:(2)
						});
						self.submitFlag2 = true;
					}else{
						art.dialog({
							  title:false,
				              close:false,
							  cancel:false,
						      content: "系统错误，请稍后再试",
							  time:(2)
						});
						self.submitFlag2 = true;
					}
				}
			});
		}
	}
	function loadingZed(response){
		if("001" == response.jdCode){
			alert("您暂时还没有进度，请进入产品首页进行申请！");
		}else if("000" == response.jdCode){
			//GG同步申请单状态
			if(null != response.synApplyStatus && ""!= response.synApplyStatus){
				switch(response.synApplyStatus){
					//7100:预约成功
					case "7100":location.href="/m/product/zed/2.0/yuyue.html";break;
					//7200,7300,7400:签约中
					case "7200":
					case "7300":
					case "7400":
						location.href="/m/product/zed/2.0/qy_in.html";break;
						//7500,4600:放款中
					case "7500":
					case "4600":
						location.href="/m/product/zed/2.0/fk_in.html";break;
						//4800:放款成功
					case "4800":location.href="/m/product/zed/2.0/fk_success.html";break;
					//500000:回退APP
//					case "500000":
//						if("080103" == response.status){
//							location.href="/m/product/zed/2.0/step4.html";break;
//						}else{
//							alert("系统需要15-20分钟进行处理，请耐心等待！");break;
//						}
					//430000:回退APP超时取消
					case "430000":
						location.href="/m/product/zed/2.0/apply_cancel.html";break;
					//420000:主动取消；410000：超时取消
					case "420000":
					case "410000":
						location.href="/m/product/zed/2.0/yuyue.html";break;
						//800100:拒绝
					case "800100":location.href="/m/product/zed/2.0/apply_failed.html";break;
					//3000:回退信审
					case "3000":location.href="/m/product/zed/2.0/holding.html?flag=hideWechat";break;
					//3500:切换为老流程
					case "3500":location.href="/m/product/zed/2.0/apply_failed.html?flag=contactService";break;
				}
			}else{
				switch(response.status){
					//手机验证页：010101（手机验证通过）
					case "010101":location.href="/m/product/zed/2.0/step3.html";break;
					//身份验证通过：020101
					case "020101":location.href="/m/product/zed/2.0/step3.html";break;
					//身份验证不通过，黑名单：020102
					case "020102":location.href="/m/product/zed/2.0/apply_failed.html";break;
					//银行卡鉴权成功：030101
					case "030101":
						if("1" == response.showChannelFlag){
							location.href="/m/product/zed/2.0/qudao.html";break;
						}else{
							location.href="/m/product/zed/2.0/step4.html";break;
						}
					//银行卡鉴权失败：030102
					case "030102":location.href="/m/product/zed/2.0/step3.html";break;
					//渠道保存成功：040101
					case "040101":location.href="/m/product/zed/2.0/step4.html";break;
					//配偶身份验证通过：050101
					case "050101":location.href="/m/product/zed/2.0/step4.html";break;
					//配偶身份验证不通过：050102
					case "050102":location.href="/m/product/zed/2.0/apply_failed.html";break;
					//房产证号校验通过：050201
					case "050201":location.href="/m/product/zed/2.0/step4.html";break;
					//房产唯一性校验不通过：050202
					case "050202":location.href="/m/product/zed/2.0/step4.html";break;
					//夫妻不能超过三套抵押房产校验不通过：050203
					case "050203":location.href="/m/product/zed/2.0/step4.html";break;
					//房产信息保存成功有其他共有人：050301
					case "050301":location.href="/m/product/zed/2.0/step4_1.html";break;
					//房产信息保存成功无其他共有人：050401
					case "050401":location.href="/m/product/zed/2.0/step5.html";break;
					//共有人信息保存成功：060101
					case "060101":location.href="/m/product/zed/2.0/step5.html";break;
					//电子签名成功：070101，发起风控
					case "070101":
					//发起风控失败：070202，再次发起风控
					case "070202":
						if(null != response.launchCreditMap 
								&& "801" == response.launchCreditMap.resultCod){//发起风控成功
							window.location.href="/m/product/zed/2.0/holding.html";
						}else{//发起风控失败
							alert("系统异常");
						}
						break;
					//电子签名失败：070102
					case "070102":location.href="/m/product/zed/2.0/step5.html";break;
					//发起风控成功：070201
					case "070201":location.href="/m/product/zed/2.0/holding.html";break;
					//风控审批通过：080101,APP静默注册
					case "080101":
						if(null != response.appResgistMap){
							if("000" == response.appResgistMap.registCode){
								window.location.href="/m/product/zed/2.0/yuyue.html";
							}else if("002" == response.appResgistMap.registCode){
								window.location.href="/m/product/zed/2.0/appFailed.html?mobile="+response.appResgistMap.mobile+"&oldMobile="+response.appResgistMap.oldMobile;
							}else{
								alert("系统异常");
							}
						}
						break;
					//风控审批失败：080102
					case "080102":location.href="/m/product/zed/2.0/apply_failed.html";break;
					//回退APP：080103
					case "080103":location.href="/m/product/zed/2.0/step4.html";break;
					//APP静默注册成功：080201
					case "080201":location.href="/m/product/zed/2.0/yuyue.html";break;
					//APP静默注册失败：080202
					case "080202":
						location.href="/m/product/zed/2.0/appFailed.html?mobile="+response.mobile+"&oldMobile="+response.oldMobile;break;
					//手机号已注册，但身份证不一致(线下夺权)：080203,再次注册APP
//					case "080203":location.href="/m/product/zed/2.0/appFailed.html";break;
					//门店预约成功：090101
					case "090101":location.href="/m/product/zed/2.0/yuyue.html";break;
					//门店预约失败：090102
					case "090102":location.href="/m/product/zed/2.0/yuyue.html";break;
				}
			}
		}else{
			art.dialog({
				  title:false,
	              close:false,
				  cancel:false,
			      content: "系统错误，请稍后再试",
				  time:(2)
			});
		}
	}
	  /**
	   * 截取URL相关参数
	   */
	  function getUrlParam(name) {
	  	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	  	var r = window.location.search.substr(1).match(reg);
	  	if (r != null) return unescape(r[2]);
	  	return "";
	  }
	  
	  /**
	   * 截取URL相关参数(汉字)
	   */
	  function getUrlParam2(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	  	var r = window.location.search.substr(1).match(reg);
	  	if (r != null) return decodeURI(r[2]);
	  	return "";
	  }
