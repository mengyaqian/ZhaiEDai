var submitFlag = true;
(function($){
	$(function(){
		var $box = $('.mybox');//页面主容器
		var $arrNei = new Array();//保存共有人数据的数组
		var $step = 0;
		temp = temp+'<div class="add_com_p" id="inpt00-add"><i></i>添加共有人</div>';
		$('.mybox').html(temp);
		$("#waitpic").show();
		$.ajax({    //初始化 查询现有的共有人信息
			type: 'POST',
			url: '/do/zed/initOwnersInfo' ,
			success: function(response){
				$("#waitpic").hide();
				if(response.errorCode == "0002"){
					art.dialog({
						  title:false,
		                  close:false,
						  cancel:false,
					      content: response.errorMsg,
						  time:(2)
					});
					return;
				}else if(response.resultCode == "0000" || response.resultCode == "0001"){
					window.location = '/microWebsite/jdcx_check.html';
				}
				
				var $spouseList = response.ownerList;//共有人信息
				if($spouseList == null){
					return;
				}
				for( var $i = 0;$i < $spouseList.length; $i ++){
					$step ++ ;
					var $nei = $.addSpouse( $spouseList[$i]);//获得一个共有人模块
					$('#inpt00-add').before($nei);
					$arrNei[$step] = $nei;
				}
			},
			dataType: 'json'
		});
		
		var $saveFail = function (){$.ajax({    //共有人信息保存失败
			type: 'POST',
			url: '/do/zed/saveFail' ,
			date: {
				'type':'saveFail'
			},
			success: function(response){
				alert(response);
			},
			dataType: 'json'
		});}
		$('#inpt00-add').click(//添加一个共有人模块
		function(){
				$step ++ ;
				var $nei = $.addSpouse(  {});
				$('#inpt00-add').before($nei);
				$arrNei[$step] = $nei;
			}		
		);
		
		$.save = function(){
				//组装数组
				if(submitFlag){
					submitFlag = false;
				}else{
					return;
				}
				var objArray=[];
				var obj=null;
				var JSONObj=new Object();
				for(var $i = 1; $i <= $step;$i ++){
					obj=new Object();
					obj.idZedOwnerSpouseInfo = $arrNei[$i].idZedOwnerSpouseInfo;// '主键';
					obj.ownerName=$arrNei[$i].find('#input31').val();// '共有人姓名';
					obj.ownerCertificateType=$arrNei[$i].find('#input32').val();// '共有人证件类型';
					obj.ownerCertificateNo=$arrNei[$i].find('#input33').val().toUpperCase();// '共有人证件号码';
					obj.ownerBirthDate=$arrNei[$i].find('#input34').val();// '共有人出生日期';
					if(obj.ownerCertificateType == "01"){
						var idcard = $arrNei[$i].find('#input33').val();
						var year = idcard. substr(6,4);//年
						var month = idcard. substr(10,2);//月
						var day = idcard. substr(12,2);//日
						obj.ownerBirthDate = year+'-'+month+'-'+day;
					}
					obj.ownerMobile=$arrNei[$i].find('#input35').val();// '共有人手机号';
					obj.relationshipWithBorrowner=$arrNei[$i].find('#input36').val();// '共有人与借款人关系';
					if($arrNei[$i].find('#input37').is(':checked') ){// '该共有人是否有配偶（0：否，1是）';
						obj.isHaveSpouse = "1";
						obj.spouseName=$arrNei[$i].find('#input38').val();// '共有人配偶姓名';
						obj.spouseCertificateType=$arrNei[$i].find('#input39').val();// '共有人配偶证件类型';
						obj.spouseCertificateNo=$arrNei[$i].find('#input40').val().toUpperCase();// '共有人配偶证件号码';
						obj.spouseBirthDate=$arrNei[$i].find('#input41').val();// '共有人配偶出生日期';
						if(obj.spouseCertificateType == "01"){
							var idcard = $arrNei[$i].find('#input40').val();
							var year = idcard. substr(6,4);//年
							var month = idcard. substr(10,2);//月
							var day = idcard. substr(12,2);//日
							obj.spouseBirthDate = year+'-'+month+'-'+day;
						}
						obj.spouseMobile=$arrNei[$i].find('#input42').val();// '共有人配偶手机号(0:否,1:是)';
					}else{
						obj.isHaveSpouse = '0';
					}
					objArray.push(obj);
				}
				
				JSONObj.ownersStr=JSON.stringify(objArray);//转化成json数据
				$("#waitpic").show();
				$.ajax({
				    type: 'POST',
				    url: '/do/zed/saveOwnersInfo' ,
				    data: JSONObj,
				    success: function(response){
						$("#waitpic").hide();
						submitFlag = true;
						if(response.resultCode == "9999"){
							window.location.href ="step5.html";
						}else if(response.resultCode == "0004"){
							art.dialog({
								  title:false,
				                  close:false,
								  cancel:false,
							      content:response.resultMsg,
								  time:(2)
							});
							return;
						}else if(response.resultCode == "0000" || response.resultCode == "0001" ){
							window.location = '/microWebsite/jdcx_check.html';
						}else{
							art.dialog({
								  title:false,
				                  close:false,
								  cancel:false,
							      content: "系统异常，请稍后再试",
								  time:(2)
							});
							return;
						}
				    } ,
				    dataType: 'json'
				});
			}
		
		//生成一个共有人模块
		$.addSpouse = function( $date){
			var $re = '';
			if($date.ownerName != undefined){
				$re = 'readOnly="true"';
			}else{
				$re = '';
			}
			var $nei = $('<div class="common_box" id="common_box_'+$step+'"><div class="comm_p_tit"><i class="i_icon"></i>共有人<span class="comm_p_span">'+$step+'</span>'
			   +'<p class="common_close" id="close_'+$step+'"></p></div>'
			   +'<div class="mycon"><div class="con myid"><ul class="con_ul">'
			   +'<li><i>姓名</i><input type="text" class="po_name_text" '+$re+' name="input31" id="input31"  value="'+$.isNull($date.ownerName) +'"></li>'
			   +'<li class="showID"><i>证件类型</i><p class="selectp">'
			   +'<select  onchange="getContent(this.value,this.options[this.selectedIndex].text,this)" id="input32" name="idtype" >'
				   +' <option value ="01" selected="selected">身份证</option> '
				   +'<option value ="02">军官证</option>'
				   +'<option value ="03">士兵证</option>'
			   +'</select>'
			   +'</p><span></span></li>'
			   +'<li><i>证件号码</i><input name="input33" id="input33" maxlength="18" type="text" value="'+$.isNull($date.ownerCertificateNo)+'"></li>'
			   +'<li class="birthdayid" style="display:none"><i>出生日期</i><input type="date" class="scroller" name="input34" id="input34" value="'+$.isNull($date.ownerBirthDate)+'" ></li>'
			   +'<li><i>手机号</i><input type="tel" name="input35" id="input35" maxlength="11" value="'+$.isNull($date.ownerMobile)+'"></li>'
			   +'<li class="cqr_li connect"><i style="width:30%;">与借款人关系</i><p class="selectp">'
			   +'<select  id="input36" name="idtype" > '
				   +'<option value ="0302">父母</option> '
				   +'<option value ="0304">子女</option>'
				   +'<option value ="0307">同事</option>'
				   +'<option value ="0305">朋友</option>'
				   +'<option value ="0310">其他</option>'
			   +'</select></p><span></span></li>'
			   +'<li><i class="i3">该共有人是否有配偶</i>'
			   +'<div class="checkbox"><i class="but_txt1">否</i><i class="but_txt2">是</i>'
			   +'<input type="checkbox" class="MCheck" name="input37" id="input37" /><label></label></div></li></ul></div>'
			   +'<div class="showcomP other_info" style="display:none"><p class="other_tit bt0">'
			   +'<i>配偶信息</i></p><ul class="con2"><li><i>配偶姓名</i>'
			   +'<input type="text" name="input38" id="input38" class="po_name" value="'+$.isNull($date.spouseName)+'"></li>'
			   +'<li class="bor_no showID"><i>证件类型</i><p class="selectp">'
			   +'<select  onchange="getContent(this.value,this.options[this.selectedIndex].text,this.id)" id="input39" name="idtype" > '
				   +' <option value ="01" selected="selected">身份证</option> '
				   +'<option value ="02">军官证</option>'
				   +'<option value ="03">士兵证</option>'
			   +'</select></p>'
			   +'<span></span></li>'
			   +'<li><i>证件号码</i><input type="text" name="input40" maxlength="18" id="input40" value="'+$.isNull($date.spouseCertificateNo)+'"></li>'
			   +'<li class="birthdayid" id="spouseBirthday" style="display:none"><i>出生日期</i><input type="date" class="scroller" name="input41" id="input41" value="'+ $.isNull($date.spouseBirthDate)+'"  ></li>'
			   +'<li><i>手机号</i><input type="tel" name="c" id="input42" class="mytelyz" maxlength="11" value="'+$.isNull($date.spouseMobile) +'"></li></ul></div></div></div>');
			
			//初始化id和下拉列表
			$nei.idZedOwnerSpouseInfo = $.isNull($date.idZedOwnerSpouseInfo);
			$.setSelect($nei.find("#input32"),$.isNull( $date.ownerCertificateType));
			$.setSelect($nei.find("#input36"),$.isNull( $date.relationshipWithBorrowner));
			$.setSelect($nei.find("#input39"),$.isNull( $date.spouseCertificateType));
			//初始化共有人配偶模块
			if($.isNull( $date.isHaveSpouse) == '1'){
				$nei.find('#input37').attr('checked',true) ;
				$nei.find('.myid').next().slideDown();
			}
			$nei.find('.common_close').click(function (){
					   $nei.remove();
						$step -- ;
						for(var i = 0;i < $step; i++){
							myi=i+1;
							$(".mybox .common_box ").eq(i).find(".comm_p_span").text(myi);
						}
						var newArray = new Array();
						newArray.push("");
						for(var i = 1;i < $arrNei.length; i++){
							if($arrNei[i] != $nei){
								newArray.push($arrNei[i]);
							}
						}
						$arrNei = newArray;
				});
			$nei.find('#input39').change(function (){
				$nei.find('#input40').val("");
				if($nei.find('#input39').val() != "01"){
					$nei.find("#spouseBirthday").show();
				}else{
					$nei.find("#spouseBirthday").hide();
				}
			});
			  $nei.find("#input38").blur(function(){
			      var po_name = $(this).val();
				  var is =$.inArray(po_name, myarr);
				  if(is >=0){//如果输入的配偶名字在房产人名字内
				    art.dialog({
					 title:false,
		             close:false,
		             cancel:false,
					 okVal:'是',
					 cancelVal:'否',
		             content:po_name+'是否为房产共有人'+po_name,
		             },
				        function(){    		
		            	 $nei.find(".mytelyz").live("click",function(){
							    thid = this.id;//获取当前id
								var spl = thid.split('_');
								var spl_res = spl[1]; //得到当前模块为第几个
								//分别获取该模块值
								var a =  $nei.find('#input31').val();//共有人姓名
								var b = $nei.find('#input32').find("option:selected").text();//共有人证件类型
								var c = $nei.find('#input33').val();//共有人证件号码
								var d = $nei.find('#input34').val();//共有人出生日期
								var e = $nei.find('#input35').val();//共有人手机号
								var f = $nei.find('#input36').val();//共有人与借款人关系
								var g = $nei.find('#input37').is(':checked');//共有人是否有配偶
								var h = $nei.find('#input38').val();//共有人配偶姓名
								var m = $nei.find('#input39').find("option:selected").text();//共有人配偶证件类型
								var n = $nei.find('#input40').val();//共有人配偶证件号码
								var o = $nei.find('#input41').val();//共有人配偶出生日期
								var p = $nei.find('#input42').val();//共有人配偶手机号
								//把该模块的值带到后面重复的人
								var myis = is+1;
								//alert(myis);
								$nei.find('#input32').find("option:selected").text(m);
								$nei.find('#input33').val(n);
								$nei.find('#input34').val(o);
								var aa = 	$('#input34').val();
								if(m == '身份证'){
									$nei.find('#input34').parent('.birthdayid').css('display','none');
								}else{
									$nei.find('#input34').parent('.birthdayid').css('display','block');
								}
								$nei.find('#input35').val(p);
								$nei.find('#input36').val(f);
								var isshow = $nei.find('#input37').parents('.myid').next();
								if(g==true){
									$nei.find('#input37').attr('checked','checked');
									 isshow.slideDown();
								}else{
								    isshow.slideUp();
								}
								$nei.find('#input38').val(a);
								$nei.find('#input39').find("option:selected").text(b);
								$nei.find('#input40').val(c);
								$nei.find('#input41').val(d);
								if(b == '1'){
									$nei.find('#input41').parent('.birthdayid').css('display','none');
								}else{
									$nei.find('#input41').parent('.birthdayid').css('display','block');
								}
								$nei.find('#input42').val(e);
							 });			 
		                },
		                function(){
						   return;
		                }
		            ); 
				  }else{return;}
			   })
			return $nei;
		}

		   //验证
			$('.step31reg').live("click",function(){
			      //var len_commbox = $('.common_box').length;
			      for(var i=1;i<=$step ;i++){
								//分别获取该模块值
						var aa = $arrNei[i].find('#input31').val();//共有人姓名
						var bb = $arrNei[i].find('#input32').val();//共有人证件类型
						var cc = $arrNei[i].find('#input33').val();//共有人证件号码
						var dd = $arrNei[i].find('#input34').val();//共有人出生日期
						var ee = $arrNei[i].find('#input35').val();//共有人手机号
						var ff = $arrNei[i].find('#input36').val();//共有人与借款人关系
						var gg = $arrNei[i].find('#input37').is(':checked');//共有人是否有配偶
						var hh = $arrNei[i].find('#input38').val();//共有人配偶姓名
						var mm = $arrNei[i].find('#input39').val();//共有人配偶证件类型
						var nn = $arrNei[i].find('#input40').val();//共有人配偶证件号码
						var oo = $arrNei[i].find('#input41').val();//共有人配偶出生日期
						var pp = $arrNei[i].find('#input42').val();//共有人配偶手机号
						var commtrue = $arrNei[i].find('#input41').is(":visible");
						var peotrue = $arrNei[i].find('#input34').is(":visible");
						var namereg = /^[\u4E00-\u9FA5\·]{2,10}$/;
						if(aa ==''){
						  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '请填写（共有人'+i+'）姓名',
							  time:(2)
						  });
						  return false;
						} 
						if(!namereg.test(aa)){
							  art.dialog({
								  title:false,
								  close:false,
								  cancel:false,
								  content: '共有人'+i+'姓名不符合规范，请重新填写',
								  time:(2)
							  });
							  return false;
						} 
						if(bb == ''){ 
							  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '请选择（共有人'+i+'）证件类型',
							  time:(2)
							  });
							  return false;
						}
						if(cc == ''){
							  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '请填写（共有人'+i+'）证件号码',
							  time:(2)
							  });
							   return false;
						}
						if(bb == '01' && !idCardValidate($arrNei[i].find('#input33'))){
							  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '您提供的（共有人'+i+'）身份证号码有误，请重新填写',
							  time:(2)
							  });
							return false;
						}
						if(dd == '' & peotrue==true){
							  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '请填写（共有人'+i+'）出生日期',
							  time:(2)
							  });
							  return false;
						}
						if(ee == ''){
							  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '请填写（共有人'+i+'）手机号码',
							  time:(2)
							  });
							  return false;
						}
						if(ee!='' && ! /^1[34578]\d{9}$/.test(ee)){
						  art.dialog({
						  title:false,
						  close:false,
						  cancel:false,
						  content: '您提供的（共有人'+i+'）手机号码格式不正确，请重新填写',
						  time:(2)
						  });
						  return false;
					   }
					   if(ff == ''){
							  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '请选择（共有人'+i+'）与借款人关系',
							  time:(2)
							  });
							  return false;
							}
						if(gg == true){
						   if(hh == ''){
							  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '请填写（共有人'+i+'）配偶姓名',
							  time:(2)
							  });
							  return false;
						   }
						   if(!namereg.test(hh)){
								  art.dialog({
									  title:false,
									  close:false,
									  cancel:false,
									  content: '（共有人'+i+'）配偶姓名不符合规范，请重新填写',
									  time:(2)
								  });
								  return false;
							}
						   if(mm == ''){ 
							  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '请选择（共有人'+i+'）配偶证件类型',
							  time:(2)
							  });
							  return false;
							}
							if(nn == ''){
								  art.dialog({
								  title:false,
								  close:false,
								  cancel:false,
								  content: '请填写（共有人'+i+'）配偶证件号码',
								  time:(2)
								  });
								   return false;
							}
							if(mm == '01' && !idCardValidate($arrNei[i].find('#input40'))){
								  art.dialog({
								  title:false,
								  close:false,
								  cancel:false,
								  content: '您提供的（共有人'+i+'）身份证号码有误，请重新填写',
								  time:(2)
								  });
								return false;
							}
							if(commtrue==true && oo == '' ){
								  art.dialog({
								  title:false,
								  close:false,
								  cancel:false,
								  content: '请填写（共有人'+i+'）出生日期',
								  time:(2)
								  });
								  return false;
							}
							if(pp == '' ){
								  art.dialog({
								  title:false,
								  close:false,
								  cancel:false,
								  content: '请填写（共有人'+i+'）手机号码',
								  time:(2)
								  });
								  return false;
							}
							if(pp!='' && ! /^1[34578]\d{9}$/.test(pp)){
							  art.dialog({
							  title:false,
							  close:false,
							  cancel:false,
							  content: '您提供的（共有人'+i+'）手机号码格式不正确，请重新填写',
							  time:(2)
							  });
							  return false;
						   }
						}
						if(ff != '0301' && ff !='0302' && ff != '0304'){
							 art.dialog({
								  title:false,
								  close:false,
								  cancel:false,
								  content: '您提供的（共有人'+i+'）与借款人关系不符合宅e贷政策',
								  time:(2)
								  });
							 return false;
						}
			      }
				    $('.waitpic').css('display','block').show(1).delay(2000).hide(1);
				    $.save();
	        })		
		//处理undefined值
		$.isNull = function($str){
			if($str == undefined){
				$str = '';
			}
			return $str;
		}
		
		//给select赋值
		$.setSelect = function($sele, $val){
			var $options = $sele.find("option");
			for(var $i = 0;$i < $options.length; $i ++){
				if($options[$i].value == $val){
					$options[$i].selected = true;
				}
			}
		}
		
	});
})(window.jQuery);
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