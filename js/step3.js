
	/**
	 * 页面初始化执行
	 */
	$(function(){
		step3.init();
	});
	var step3 = {
		isSend : false,
		init : function(){
			this.bind();
		},
		bind: function(){
			var self = this;
			//卡号自动四位分开
		    $("#bank_num").bind("input propertychange", function(){
		    	var value=$(this).val().replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");    
		        $(this).val(value);
		        var t=$(this).val();
		        $(this).val("").focus().val(t);
		    })
			//身份证号长度限制
			$("#idcard").bind("input propertychange", function(){
				var idcard = $('#idcard').val();
			    if(idcard.length >18){
			    	var myid = idcard.substr(0,18);
					$('#idcard').val(myid);
				}
			})
			//身份证号长度限制
			$("#seebank").bind("click", function(){
				$('#black_full1').css('display','block');
			    $('#diabank1').css('display','block');
			})
			//关闭支持银行卡弹框
			$("#closediar").bind("click", function(){
				$('#black_full1').css('display','none');
				$('#diabank1').css('display','none');
			})
			//关闭弹框2
			$("#closediar2").bind("click", function(){
				$('#black_full1').css('display','none');
		     	$('#diabank2').css('display','none');
			})
			//验证
			$("#btnNext").bind("click", function(){
				self.step4reg();
			})
		},
		step4reg : function (){
		    var names = document.step4.names.value;	//姓名
		    var idcard = document.step4.idcard.value;	//身份证号
			idcard = idcard.replace(/[ ]/g,"");//去掉银行卡号的空格，方便验证
		    var input_41 = document.step4.input_41.value;	//银行卡号
			input_41 = input_41.replace(/[ ]/g,"");//去掉银行卡号的空格，方便验证
		    var input_42 = document.step4.input_42.value;	//手机号
			var namereg = /^[\u4E00-\u9FA5\·]{2,10}$/;
			if(names == ''){
			    art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '请填写姓名',
					  time:(2)
				});
				return false;
			}
			if(!namereg.test(names)){
			    art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '姓名不符合规范，请重新填写',
					  time:(2)
				});
				return false;
			}
			if(idcard == ''){
			    art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '请填写身份证号',
					  time:(2)
				});
				return false;
			}
			if(!idCardValidate($("#idcard"))){
				art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '您提供的身份证号码有误，请重新填写',
					  time:(2)
				});
				return false;
			 }
			 if(input_41 == ''){
				 art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '请填写银行卡号',
					  time:(2)
				 });
				 return false;
			}
			if( !/^[0-9]+$/g.test(input_41)){
				art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '银行卡号格式填写错误，请重新填写！',
					  time:(2)
				});
				return false;
			}
			if(input_42 == ''){
				art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '请填写手机号',
					  time:(2)
				});
				return false;
			}
			if(! /^1[34578]\d{9}$/.test(input_42)){
			     art.dialog({
					  title:false,
	                  close:false,
					  cancel:false,
				      content: '手机号填写错误，请重新填写',
					  time:(2)
				 });
			     return false;
			 }
			this.checkBlack(names,idcard,input_41,input_42);
		},
		//黑名单检验
		checkBlack :function (names,idcard,bankCard,bankMobile){
			  var self = this;
			  if(self.isSend){
				  return;
			  }
			  self.isSend = true;
			  $("#waitpic").show();
			  $.ajax({
					type:"post",
					url:"/zed/checkBlacklist.do",
					dataType:"json",
					data : {
						names : names,
						idcard : idcard.toUpperCase()
					},
					success:function (response){
						if(response.errorCode=='555'){
	             			self.showError('系统错误,请稍后重试');
	             			$("#waitpic").hide();
	        			}else if(response.resultCode == "0000"){
	    					window.location = '/microWebsite/jdcx_check.html';
	    				}else if(response.resultCode == "0105"){
							self.showError(response.resultMsg);
						    self.isSend = false;
						    $("#waitpic").hide();
						}else if(response.retCode == "0000" && response.retFlag == "0"){
							//非黑名单，绑卡
							self.bindCard(bankCard,bankMobile);
							//window.location = 'qudao.html';
						}else if(response.retCode == "0000" && response.retFlag == "1"){
							//黑名单
							window.location = "apply_failed.html";
						}else{
							self.showError(response.resultMsg);
						    self.isSend = false;
						    $("#waitpic").hide();
						}
					}
				});
		  },
		  //绑卡
		  bindCard: function (bankCard,bankMobile){
			  var self = this;
			  $.ajax({
					type:"get",
					url:"/do/zed/bindCard",
					dataType:"json",
					data : {
					  	bankEnc : bankCard,
						telephone : bankMobile
					},
					success:function (response){
						if(response.errorCode=='555'){
							self.showError('系统错误,请稍后重试');
	             			$("#waitpic").hide();
	        			}else if(response.resultCode == "0000" || response.resultCode == "005"){
	    					window.location = '/microWebsite/jdcx_check.html';
	    				}else if(response.resultCode == "000"){//成功，跳转到录单页
	    					if(response.redirectFlag == "0"){
	    						window.location = 'step4.html';
	    					}else{
	    						window.location = 'qudao.html';	
	    					}
						}else if(response.resultCode == "003"){//平安付卡鉴权失败
							var msg = "";
	    					if(response.bindCardFailNum == "1"){
	    						msg = "银行卡鉴权失败，您还有二次机会";
	    					}else if(response.bindCardFailNum == "2"){
	    						msg = "银行卡鉴权失败，您还有一次机会";
	    					}else if(response.bindCardFailNum == "3"){
	    						msg = "银行卡鉴权失败，请明天再试";
	    					}
	    					self.showError(msg);
	    					self.isSend = false;
	             			$("#waitpic").hide();
						}else{
							self.showError(response.resultMsg);
							self.isSend = false;
							$("#waitpic").hide();
						}
					}
				});
		  },
		  showError:function(message){
			  art.dialog({
				  title:false,
				  close:false,
				  cancel:false,
				  content: message,
				  time:(2)
			  });
		  }
	}

	 
	  
	  
	  
	  
	  //身份证校验
	  function idCardValidate(id){
	  	var $idCardEle = $(id);
	      var idCardVal = $idCardEle.val();
	      var reg = /^(?:\d{8}(?:0[1-9]|1[0-2])[0123]\d{4}|\d{6}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])[0123]\d{4}[0-9Xx])?$/;
	      if(!idCardVal){
	     		return false;
	      }else if(idCardVal && !reg.test(idCardVal)){
	     		return false;
	      }else{
	          var errorMsg = idCard(idCardVal);
	          if(errorMsg!=true){
	  	   		return false;
	          }else {
	             return true;
	          }
	      }
	        
	  }
	  function idCard(idcard) {
	  	var Errors = [
	  	       true,
	  	       "身份证号码位数不对","身份证号码校验错误",
	  	       "身份证号码校验错误","身份证地区非法"];
	  	var area = {
	  	       11: "\u5317\u4eac",       12: "\u5929\u6d25",      13: "\u6cb3\u5317",       14: "\u5c71\u897f", 15: "\u5185\u8499\u53e4",  21: "\u8fbd\u5b81",       22: "\u5409\u6797",       23: "\u9ed1\u9f99\u6c5f",
	  	       31: "\u4e0a\u6d77",      32: "\u6c5f\u82cf",  33: "\u6d59\u6c5f",       34: "\u5b89\u5fbd",       35: "\u798f\u5efa", 36: "\u6c5f\u897f",       37: "\u5c71\u4e1c",       41: "\u6cb3\u5357",       42: "\u6e56\u5317",
	  	       43: "\u6e56\u5357",       44: "\u5e7f\u4e1c", 45: "\u5e7f\u897f", 46: "\u6d77\u5357",      50: "\u91cd\u5e86",       51: "\u56db\u5ddd",    52: "\u8d35\u5dde",      53: "\u4e91\u5357",       54: "\u897f\u85cf",
	  	       61: "\u9655\u897f",       62: "\u7518\u8083",       63: "\u9752\u6d77",      64: "\u5b81\u590f",       65: "\u65b0\u7586",     71: "\u53f0\u6e7e",       81: "\u9999\u6e2f",       82: "\u6fb3\u95e8",       91: "\u56fd\u5916"
	  	};
	  	var Y, JYM;
	  	var S, M;
	  	var idcard_array = new Array();
	  	idcard_array = idcard.split("");
	  	if(idcard == ""){//为空
	  	       return true;
	  	}
	  	if (area[parseInt(idcard.substr(0, 2))] == null) {
	  	       return Errors[4]
	  	}
	  	switch (idcard.length) {
	  	case 18:
	  	       if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
	  	              ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
	  	       } else {
	  	              ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/
	  	       }
	  	       if (ereg.test(idcard)) {
	  	              S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
	  	              Y = S % 11;
	  	              M = "F";
	  	              JYM = "10X98765432";
	  	              M = JYM.substr(Y, 1);
	  	              if(idcard_array[17] == "x"){
	  	                idcard_array[17] = "X";
	  	              }
	  	              if (M == idcard_array[17]) {
	  	                     return Errors[0]
	  	              } else {
	  	                     return Errors[3]
	  	              }
	  	       } else {
	  	              return Errors[2]
	  	       }
	  	       break;
	  	default:
	  	       return Errors[1];
	  	       break
	  	}
	      return true
	  }