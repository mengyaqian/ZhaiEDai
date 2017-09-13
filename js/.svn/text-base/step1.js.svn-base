	var beforeUrl;
	var mediaSourceCode = getMediaSouceWap();
	$(function(){
		step1.init();
		var openId = getUrlParam("weChatId");
		var mgmchannel = getUrlParam("mgmchannel");
		beforeUrl = "?openId="+openId+"&WT.mc_id="+mediaSourceCode+"&mgmchannel="+mgmchannel;
	})
	var step1 = {
		/**省级编码 */
		provinceCode : "",
		provinceName : "",
		/**市级编码*/
		cityCode : "",
		cityName : "",
		/**区级编码*/
		districtCode : "",
		districtName : "",
		/**防止ajax重复提交*/
		submitFlag1 : true,
		submitFlag2 : true,
		
		/**省市区浮层变量*/
		resource :  null,
		level : null,
		resourceLevel : null,
		
		/**选择的月份*/
		chooseMonth : null,
		/**省级试点标识*/
		provinceFlowFlag : null,
		
		init:function(){
			this.bind();
		},
		bind:function(){
			var self = this;
			$(".checkmonth li").bind("click",function(){
				self.checkMonth(this);
			});
			$("#btnNext-1").click(function(){
				 $('#weixin_alertbox').css('display','block');
				 $('#black_full1').css('display','block');
				 SetDivCenter('weixin_alertbox');
			})
			$("#tags").click(function(){
				self.showProvince();
			})
			$("#calculate").click(function(){
				self.calculate();
			})
			$('#jine').bind('input propertychange', function(){
				    var vals = $('#jine').val().replace(/[^\d.]/g,'');
					$('#jine').val(vals);
			}) 
			$("#btnNext").bind("click",function(){
				var inpt0309 = document.step1.inpt0309.value;
				if(inpt0309 == ''){
					art.dialog({
						  title:false,
		                  close:false,
						  cancel:false,
					      content: '请填写地址',
						  time:(2)
						  });
					return false;
			     }else{
			    	 var params = "&provinceCode="+self.provinceCode+
			    	 				"&cityCode="+self.cityCode+"&areaCode="+self.districtCode
			    	 				+"&provinceName="+self.provinceName+"&cityName="+self.cityName
			    	 				+"&areaName="+self.districtName;
			    	 $("#btnNext-2").attr("href",$("#btnNext-2").attr("href")+beforeUrl+params);
			    	 
			    	 $('.black_full').css('display','block');
				     $('.step_dia2').css('display','block');
				 }
				/*localStorage.setItem("provinceCode",self.provinceCode);
				localStorage.setItem("cityCode",self.cityCode);
				localStorage.setItem("areaCode",self.districtCode);
				localStorage.setItem("provinceName",self.provinceName);
				localStorage.setItem("cityName",self.cityName);
				localStorage.setItem("areaName",self.districtName);*/
			});
			$('.hotcity li').click(function(){
				self.resource = "hotCity";
				self.cityReturn("","");
				var cityName = $(this).text();
				var cityCodeP = $(this).attr('data-cityCode');
				var provinceName = $(this).attr('data-provinceName');
				var provinceCodeP = $(this).attr('data-gcityRelativeId');
				var cityFlowFlag = $(this).attr('data-cityFlowFlag');
				if(provinceCodeP != ""){
					if(cityFlowFlag != "0"){
			        	window.location = "/m/product/zed/1.0/download.html?WT.mc_id="+mediaSourceCode;
			        	return;
			        }
					self.resourceLevel = 3;
					self.showArea(cityName,cityCodeP,provinceName,provinceCodeP);
					return;
				}
				self.provinceFlowFlag = cityFlowFlag;
				self.resourceLevel = 2;
				self.showCity(cityName,cityCodeP);
			});
		},
		checkMonth:function(month){
			var self = this;
		    var num =  parseInt($(month).children("span").text());
		    self.chooseMonth = num;
		    $(".six_box1").html("");
			$(".checkmonth li").css('border','1px solid #cacaca')
            $(month).css('border','1px solid red');
		},
		calculate : function(){
			var self = this;
			var jine = $("#jine").val();
			var re=/^([1-9]\d{0,4}|0)(\.\d{1,2})?$/;
	        if (re.test(jine) == false ){
				art.dialog({
		             title:false,
                     close:false,
		             cancel:false,
	                 content: '您输入的房产价值不正确(最多两位小数)',
		             time:(2)
		             });
				return false;
			}
	        if(self.chooseMonth == null || self.chooseMonth == ""){
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
             			$("#jine2").hide();
             			$(".six_box1").html("");
             			var html ="<ul>";
             			for ( var i = 0; i < list.length; i++) {
             				html +="<li><i class='style1'>"+list[i].monthTerm+"期</i><span>"+list[i].monthSum+"</span></li>";
						}
             			html +="</ul>";
             			$(".six_box1").html(html);
             			$(".six_box1").show();
             		}
     			}
             });
		},
		addressul2 : function(temp){
			var self = this;
			var provinceName = $(temp).text();
			var provinceCode = $(temp).attr('data-cityCode');
			var cityFlowFlag = $(temp).attr('data-cityFlowFlag');
			self.provinceFlowFlag = cityFlowFlag;
			self.showCity(provinceName,provinceCode);
		},
		addressul3:function(temp,parentName,provinceCodeP){
			var self = this;
			var cityName = $(temp).text();
			var cityCodeP = $(temp).attr('data-cityCode');
			var cityFlowFlag = $(temp).attr('data-cityFlowFlag');
			if(cityFlowFlag != "0"){
	        	window.location = "/m/product/zed/1.0/download.html?WT.mc_id="+mediaSourceCode;
	        	return;
	        }
			self.showArea(cityName,cityCodeP,parentName,provinceCodeP);
		},
		cityReturn:function(parentName,provinceCodeP){
			var self = this;
			$('.myreturn').bind("click",function(){
				if(self.level == "1"){
					$('.addressul').html('');
					$('.dialog_full').css('display','none');
				}else if(self.level == "2"){
					if(self.resource == "hotCity" && self.resourceLevel == 2){
						$('.addressul').html('');
						$('.dialog_full').css('display','none');
						return;
					}
					self.showProvince();
				}else if(self.level == "3"){
					if(self.resource == "hotCity" && self.resourceLevel == 3){
						$('.addressul').html('');
						$('.dialog_full').css('display','none');
						return;
					}
					self.showCity(parentName,provinceCodeP);
				}
			});
		},
		showProvince: function(){
			var self = this;
			self.resource = "";
			self.level = "1";
		    $('.dialog_full').css('display','block');
		    $('.addressul').html('');
		    $('.addressul').append('<p class="top_choose"><input class="myreturn" type="button" value=""><i>请选择省份</i></p><ul class="addressul2"></ul>');
			//显示省份
		    self.getChild("000000","addressul2");
		    provinceFlowFlag = null;
			$('.addressul2 li').bind("click",function(){
				self.addressul2(this);
			});
			self.cityReturn("","");
		},
		showCity : function(parentName,provinceCodeP){
			var self = this;
			self.level = "2";
			$('.dialog_full').css('display','block');
			$('.addressul').html('');
			$('.addressul').append('<p class="top_choose"><input class="myreturn" type="button" value=""><i>请选择市</i></p><ul class="addressul2"></ul>');
			self.getChild(provinceCodeP,"addressul3");
			$('.addressul3 li').bind("click",function(){
				self.addressul3(this,parentName,provinceCodeP);
			});
			self.cityReturn("","");
		},
		showArea : function(cityNameP,cityCodeP,parentName,provinceCodeP){
			var self = this;
			self.level = "3";
			$('.dialog_full').css('display','block');
			$('.addressul').html('');
			$('.addressul').append('<p class="top_choose"><input class="myreturn" type="button" value=""><i>请选择区/县</i></p><ul class="addressul2"></ul>');
		    self.getChild(cityCodeP,"addressul4");
		    self.cityReturn(parentName,provinceCodeP);
		    $('.addressul4 li').bind("click",function(){
		        var areaName = $(this).text();
		        var districtCodeP = $(this).attr('data-cityCode');
		        var isAccept = $(this).attr('data-isAccept');
		        if(isAccept != "1"){
		        	/*art.dialog({
			             title:false,
	                     close:false,
			             cancel:false,
		                 content: '当前地区不符合宅e贷政策',
			             time:(2)
			             });*/
		        	window.location="apply_failed.html?flag=notAccept";
		        	return false;
		        }
			    var inputVal = (parentName==cityNameP?"":parentName)+ cityNameP+areaName;
				$('#tags').val(inputVal);
				self.provinceCode = provinceCodeP;
				self.cityCode = cityCodeP;
				self.districtCode = districtCodeP;
				self.provinceName = parentName;
				self.cityName = cityNameP;
				self.districtName = areaName;
				$('.addressul').html('');
				$('.dialog_full').css('display','none');
		    });
		},
		getChild : function(cityCode,className){
			var self = this;
			if(!self.submitFlag2){
	       	 return;
	        }
			self.submitFlag2 = false;
			$.ajax({
	        	type:"post",
	 			url:"/do/zed/queryByGCityRelativeId/"+cityCode,                 
	 			dataType:'json',
	 			async:false,
	 			success:function (response){
					if(response.resultCode == "1002"){
						var list = response.list;
						self.submitFlag2 = true;
						for ( var i = 0; i < list.length; i++) {
							var cityName = list[i].gcityName;
							 $('.addressul').append('<ul class="'+className+'"><li class="pro_li" data-cityCode="'+list[i].gcityId
									 +'" data-isAccept="'+list[i].isAccept+'" data-gcityRelativeId="'+list[i].gcityRelativeId+'" data-cityFlowFlag="'+list[i].cityFlowFlag+'">'+list[i].gcityName+'</li></ul>');
						}
					}else{
						self.submitFlag2 = true;
						art.dialog({
				             title:false,
		                     close:false,
				             cancel:false,
			                 content: response.resultMsg,
				             time:(2)
				             });
			        	return false;
					}
	         	}
	         });
		},
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
	   * WAP端获取MediaSouce
	   */
	  function getMediaSouceWap() {
	      // 先从mc_id中取
	      var theUrl = window.location.href;
	      var paramIndex = theUrl.indexOf("WT.mc_id=");
	      var mediaSource;
	      if (paramIndex != -1) {
	          mediaSource = theUrl.substring(paramIndex);
	          var pIndex = mediaSource.indexOf("&");
	          if (pIndex != -1) {
	              mediaSource = mediaSource.substring(0, pIndex);
	          }
	          mediaSource = mediaSource.substring(9);
	          //mediaSource = rspLoanCommon.unhtml(mediaSource,null);
	      } else {
	          mediaSource = "";
	      }

	      // 若cookie中为空，则默认为 'CXX-FUWUWX-'
	      if (!mediaSource || mediaSource == 'direct' || mediaSource == 'null') {
	          mediaSource = 'CXX-FUWUWX';
	      }
	      //mediaSource = mediaSource.substring(0,32);
	      $('#mediaSource').val(mediaSource);
	      return mediaSource;
	  };
