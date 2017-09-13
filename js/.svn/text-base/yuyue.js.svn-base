
	$(function(){
		  var w = $('.money').width()/2;
		  $('.money').css('margin-left','-'+w+'px');
	})
	var yuyue ={
		chooseMonth : "",
		mds : {},
		submitFlag1 : true,
		submitFlag2 : true,
		maxValue : null,
		nowDate : null,
		init : function(){
			this.bind();
			this.getAmtAndMdMsg();
		},
		bind : function(){
			var self = this;
			$(".checkmonth li").bind("click",function(){
				self.checkMonth(this);
			});
			$("#calculate").click(function(){
				self.calculate();
			})
		},
		getAmtAndMdMsg : function(){
			var self = this;
			$.ajax({
            	type:"post",
     			url:"/do/zed/zedAppointmentInit",                 
     			dataType:'json',
     			async:false,
     			success:function (response){
					if(response.errorCode == '555'){
						self.displayError("系统异常,请稍后重试",2);
					}else if(response.retCode == "0000"){
						window.location = '/microWebsite/jdcx_check.html';
					}else if(response.retCode == "000"){
						if("add" == response.appointType){//未预约过
							if(response.getStoreCode == "0"){
								$(".money").text((response.amt/10000).toFixed(2));
								$("#myvalue").val((response.amt/10000).toFixed(2));
								self.nowDate = response.time;
								self.maxValue = (response.amt/10000).toFixed(2);
								self.mds = response.body.appointmentList;
								var html = "";
								html +="<li>请选择便于您办理业务的门店</li>";
								for ( var i = 0; i < self.mds.length; i++) {
									html += "<li style='display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis; '><s></s><i>门店"+(i+1)+"</i><span data-storeCode='"+self.mds[i].storeCode+"'>"+self.mds[i].address+self.mds[i].storeName+"</span><p class='mypbg'></p></li>";
								}
								$("#yymdul").html(html);
								//点击门店，获取值
							  $('.yymdul span').click(function(){
							     $('.yymdul li').removeClass('libg');
							     $(this).parent().addClass('libg');
							     var res = $(this).text();
								 $('#input_md').val(res);
								 var storeCode = $(this).attr("data-storeCode");
								 yuyue.chooseMd(storeCode);
								 closediar();
							  })
							}else if(response.getStoreCode == "1"){
								self.displayError("由于门店繁忙，请联系4001000800进行电话预约",3);
							}else if(response.getStoreCode == "2"){
								self.displayError(response.getStoreMsg,3);
							}else{
								self.displayError("系统异常",2);
							}
						}else if("update" == response.appointType){//已预约过
							if("000" == response.queryAppointCode){//查询成功
								$(".money").text((response.amt/10000).toFixed(2));
								$("#myvalue").val((response.amt/10000).toFixed(2));
								self.nowDate = response.time;
								self.maxValue = (response.amt/10000).toFixed(2);
								$('#mydate97').val(response.appointmentDate);
								$('#input_md').val(response.address+response.storeName);
								$("#input_yytime").val(response.appointmentTimeBegin+"～"+response.appointmentTimeEnd);
								$("#storeName").val(response.storeName);
								$("#storeCode").val(response.storeCode);
								$("#input_md").parent().unbind("click");
							}else{
								self.displayError("系统异常",2);
							}
						}else{
							self.displayError("预约类型异常",2);
						}
					}else if(response.retCode == "002"){
						self.displayError("预约类型异常",2);
					}else{
						self.displayError("系统异常",2);
					}
             	}
             });
		},
		displayError:function(message,displayTime){
			art.dialog({
 				title:false,
                close:false,
	            cancel:false,
	            content: message,
	            time:(displayTime)
	        });
		},
		chooseMd : function(storeCode){
			var self = this;
			for ( var i = 0; i < self.mds.length; i++) {
				if(self.mds[i].storeCode == storeCode){
					$("#mydate97").val(self.mds[i].appointmentDate);
					var appointmentDay = self.mds[i].appointmentDate.substring(8,10); 
					var mydate = new Date(self.nowDate);
					if(parseInt(appointmentDay) != mydate.getDate()){
						$("#yuyueTime").html("<li>09:00:00～10:00:00</li><li>10:00:00～11:00:00</li><li>14:00:00～15:00:00</li><li>15:00:00～16:00:00</li><li>16:00:00～17:00:00</li>");
					}else{
						var hoursHtml = "";
						var hours = mydate.getHours();//当前小时
						   if(hours < 9){
							   hoursHtml="<li>9:00:00～10:00:00</li><li>10:00:00～11:00:00</li><li>14:00:00～15:00:00</li><li>15:00:00～16:00:00</li><li>16:00:00～17:00:00</li>";
						   }else if(hours == 9){
							   hoursHtml="<li>10:00:00～11:00:00</li><li>14:00:00～15:00:00</li><li>15:00:00～16:00:00</li><li>16:00:00～17:00:00</li>";
						   }else if(hours < 14 && hours >= 10){
							   hoursHtml="<li>14:00:00～15:00:00</li><li>15:00:00～16:00:00</li><li>16:00:00～17:00:00</li>";
						   }else if(hours == 14){
							   hoursHtml="<li>15:00:00～16:00:00</li><li>16:00:00～17:00:00</li>";
						   }else if(hours == 15){
							   hoursHtml="<li>16:00:00～17:00:00</li>";
						   }else if(hours >= 16){
							   hoursHtml="<li>今日预约已结束，请重新选择日期</li>";
						   }
						   $("#yuyueTime").html(hoursHtml);
					}
					$("#input_yytime").val(self.mds[i].appointmentTimeBegin+"～"+self.mds[i].appointmentTimeEnd);
					$("#storeName").val(self.mds[i].storeName);
					$("#storeCode").val(self.mds[i].storeCode);
				}
			}
		},
		submit : function(){
			var self = this;
			var times = $("#input_yytime").val().split("～");
			var appointmentDate = new Date($("#mydate97").val());
			var  mydate = new Date(self.nowDate);
			if(mydate.getFullYear() == appointmentDate.getFullYear() 
					&& mydate.getMonth() == appointmentDate.getMonth() 
					&& mydate.getDate() > appointmentDate.getDate()){
				self.displayError("请重新选择日期",2);
				return;
			}
			var appointmentBeginTime = times[0].split(":")[0];
			var hours = mydate.getHours();//当前小时
			if(mydate.getFullYear() == appointmentDate.getFullYear() 
					&& mydate.getMonth() == appointmentDate.getMonth() 
					&& mydate.getDate() == appointmentDate.getDate() 
					&& appointmentBeginTime <= hours){
				self.displayError("请重新选择时间",2);
				return;
			}
			
            if(!self.submitFlag2){
            	return;
            }
            self.submitFlag2 = false;
			$.ajax({
            	type:"post",
     			url:"/do/zed/commitAppointApply",                 
     			dataType:'json',
     			data : {
					storeCode : $("#storeCode").val(),
					storeName : $("#storeName").val(),
					appointmentDate : $("#mydate97").val(),
					appointmentBeginTime : times[0],
					appointmentEndTime : times[1]
				},
     			async:false,
     			success:function (response){
					if(response.errorCode == '555'){
						self.displayError("系统异常,请稍后重试",2);
             			self.submitFlag2 = true;
             			$("#waitpic").hide();
        			}else if(response.retCode == "0000"){
    					window.location = '/microWebsite/jdcx_check.html';
    				}else if(response.retCode == "000"){
    					if(response.commitCode == "0"){
    						window.location ="success.html";
						}else if(response.resultCode == "2" || response.resultCode == "3"){//已预约、预约日期或时间段不可用
							self.displayError(response.resultMsg,3);
							self.submitFlag2 = true;
	             			$("#waitpic").hide();
						}else if(response.resultCode == "1"){//预约接口异常
							self.displayError("由于门店繁忙，请联系4001000800进行电话预约！",2);
							self.submitFlag2 = true;
	             			$("#waitpic").hide();
						}else{
							self.displayError("系统异常",2);
							self.submitFlag2 = true;
						}
    				}else if(response.retCode == "005"){
    					self.displayError("激活失败",2);
						self.submitFlag2 = true;
    				}else{
    					self.displayError("系统错误",2);
						self.submitFlag2 = true;
             			$("#waitpic").hide();
					}
             	}
             });
		},
		checkMonth:function(month){
			var self = this;
		    var num =  parseInt($(month).children("span").text());
		    self.chooseMonth = num;
		    $("#con_one_1").html("");
			$(".checkmonth li").css('border','1px solid #cacaca')
            $(month).css('border','1px solid red');
		},
		calculate : function(){
			var self = this;
			var jine = $("#myvalue").val().trim();
			var re=/^([1-9]\d{0,4}|0)(\.\d{1,2})?$/;
			 if (re.test(jine) == false){
					art.dialog({
			             title:false,
	                     close:false,
			             cancel:false,
		                 content: '房产价值有效范围为15~'+self.maxValue,
			             time:(2)
			             });
					return false;
				}
	        if ( parseFloat(jine) <parseFloat(15) || parseFloat(jine) >parseFloat(self.maxValue)){
				art.dialog({
		             title:false,
                     close:false,
		             cancel:false,
	                 content: '房产价值有效范围为15~'+self.maxValue,
		             time:(2)
		             });
				return false;
			}
	        if(self.chooseMonth == ""){
	        	art.dialog({
		             title:false,
                     close:false,
		             cancel:false,
	                 content: '请选择借款期数',
		             time:(2)
		             });
				return false;
	        }
	        var loanAmount = accMul(jine,0.6);
            $(".jine1").html(commafy(loanAmount));
            if(!self.submitFlag1){
            	return;
            }
            self.submitFlag1 = false;
            $.ajax({
            	type:"post",
     			url:"/zed/zedCounter.do",                 
     			dataType:'json',
     			data:{
            	 	loanAmount : loanAmount,
            	 	loanTerm : self.chooseMonth
             	},
     			async:false,
     			success:function (response){
             		self.submitFlag1 = true;
             		if(response.errorCode=='555'){
	         			art.dialog({
	         				title:false,
	                        close:false,
	       		             cancel:false,
	       	                 content: '系统错误,请稍后重试',
	       		             time:(2)
	   		             });
	    			}else if(response.retCode == "0000"){
             			var list = response.calcMonthList;
             			$("#con_one_1").html("");
             			var html ="";
             			for ( var i = 0; i < list.length; i++) {
             				html +="<ul class='hk_list_bd_b'><li class='w12'>"+list[i].monthTerm+"期</i>";
             				html +="<li>"+list[i].guaranteeFee+"</li>";
             				html +="<li>"+list[i].monthCorpus+"</li>";
             				html +="<li>"+list[i].monthInterest+"</li>";
             				html +="<li>"+list[i].monthSum+"</li></ul>";
						}
             			$("#con_one_1").html(html);
             			$("#con_one_1").show();
             		}else if(response.retCode == "0102"){
             			window.location = '/microWebsite/jdcx_check.html';
             		}else{
             			art.dialog({
	         				title:false,
	                        close:false,
	       		             cancel:false,
	       	                 content: '系统异常',
	       		             time:(2)
	   		             });
             		}
     			}
             });
		}
	}
	 /**
     * 乘法函数，用来得到精确的乘法结果
     * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
     * 调用：accMul(arg1,arg2)
     * 返回值：arg1乘以 arg2的精确结果
     */
    function accMul(arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
           m += s1.split(".")[1].length;
       }catch (e) {
       }
       try {
           m += s2.split(".")[1].length;
       }catch (e) {
       }
       return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
   }
    
     /**
      * 数字格式转换成千分位
      * @param{Object}num
      */
     function commafy(num){
        if((num+"").trim()==""){
           return"";
        }
        if(isNaN(num)){
           return"";
        }
        num = num+"";
        if(/^.*\..*$/.test(num)){
           var pointIndex =num.lastIndexOf(".");
           var intPart = num.substring(0,pointIndex);
           var pointPart =num.substring(pointIndex+1,num.length);
           intPart = intPart +"";
            var re =/(-?\d+)(\d{3})/
            while(re.test(intPart)){
               intPart =intPart.replace(re,"$1,$2")
            }
           num = intPart+"."+pointPart;
        }else{
           num = num +"";
            var re =/(-?\d+)(\d{3})/
            while(re.test(num)){
               num =num.replace(re,"$1,$2")
            }
        }
         return num;
     }