
var nowData = null;
var liveProvinceCode = null;
var liveCityCode = null;
var liveAreaCode = null;
var houseProvinceCode = null;
var houseCityCode = null;
var houseAreaCode = null;
var secHouseProvinceCode = null;
var secHouseCityCode = null;
var secHouseAreaCode = null;
var liveProvinceName = null;
var liveCityName = null;
var liveAreaName = null;
var houseProvinceName = null;
var houseCityName = null;
var houseAreaName = null;
var secHouseProvinceName = null;
var secHouseCityName = null;
var secHouseAreaName= null;
var blackflag = null;
var houseNoFlag = null;
var loadflag = null;
var $fangchanInfo = null;
var submitFlag = true;

(function($){
	$(function(){
		var $person = $('form[name=person_in]');
		var $myAddInfo = $('form[name=MyAddInfo]');
		
	$.ajax({    //初始化 查询现有的房产信息
			type: 'POST',
			url: '/do/zed/initFangchanInfo' ,
			data: {
				'type':'init'
			},
			success: function(response){
				if(response.resultCode == "0000" || response.resultCode == "0001"){
					window.location = '/microWebsite/jdcx_check.html';
				}else if(response.resultCode == "0002" || response.resultCode == "555"){
					alertMsg(response.resultMsg);
					return;
				}
				
				
				nowData = response.today;
				var applyAmt = response.applyAmt;
				$("#applyAmt").val(applyAmt==null?"":applyAmt/10000);
				$fangchanInfo = response.fangchanInfo; 
				if($fangchanInfo == undefined){return;}
				liveProvinceCode = $fangchanInfo.liveProvinceCode;// '住宅所在省编码';
				liveCityCode = $fangchanInfo.liveCityCode;// '住宅所在市编码';
				liveAreaCode = $fangchanInfo.liveAreaCode;// '住宅所在区编码';
				liveProvinceName = $fangchanInfo.liveProvinceName;// '住宅所在省';
				liveCityName = $fangchanInfo.liveCityName;// '住宅所在市';
				liveAreaName = $fangchanInfo.liveAreaName;// '住宅所在区';
				var inpt0101Test = (liveProvinceName == null ?"":liveProvinceName)+(liveCityName== null ?"":liveCityName)+(liveAreaName== null ?"":liveAreaName);
				$('#inpt0101').val(inpt0101Test);
				$('#inpt0102').val($fangchanInfo.liveDetailAddr);// '住宅详细地址';
				$.setSelect($('#inpt0103'),$fangchanInfo.marriageStatus);// '婚姻状况(10:未婚,22:已婚有子女,24:已婚无子女,40:离婚,60:丧偶,50:再婚)';
				$defaultCheckbox($('#isSpouseOwner'),$fangchanInfo.isSpouseOwner);// '配偶是否为共有人(0:否,1:是)';
				$("#inpt0201").val($fangchanInfo.spouseName);//'配偶姓名';
				$.setSelect($('#inpt0202'),$fangchanInfo.spouseCertificateType);// '配偶证件类型(01:身份证,02:军官证,03:士兵证)';
				$("#inpt0203").val($fangchanInfo.spouseCertificateNo);// '配偶证件号码';
				$("#inpt0204").val($fangchanInfo.spouseBirthDate);// '配偶出生日期';
				$("#hbir").val($fangchanInfo.spouseBirthDate);// '配偶出生日期';隐藏 
				$("#inpt0205").val($fangchanInfo.spouseMobile);// '配偶手机号';
				$("#inpt0301").val($fangchanInfo.houseMum);// '房产证号';
				$("#inpt0302").val($fangchanInfo.ownerName);// '产权人姓名';
				$("#userName").val($fangchanInfo.ownerName);// '产权人姓名';
				houseProvinceCode = $fangchanInfo.houseProvinceCode;// '房屋所在省编码';
				houseCityCode = $fangchanInfo.houseCityCode;// '房屋所在市编码';
				houseAreaCode = $fangchanInfo.houseAreaCode;// '房屋所在区编码';
				houseProvinceName = $fangchanInfo.houseProvinceName;// '房屋所在省';
				houseCityName = $fangchanInfo.houseCityName// '房屋所在市';
				houseAreaName = $fangchanInfo.houseAreaName;// '房屋所在区';
				$('#inpt0311_1').val($fangchanInfo.houseLocated);// '房屋坐落';
				$("#inpt0311").val((houseProvinceName == null ?"":houseProvinceName)+(houseCityName== null ?"":houseCityName)+(houseAreaName== null ?"":houseAreaName));// '房屋坐落
				$("#inpt0311_2").val($fangchanInfo.houseCommunityName);// '房屋小区名称
				$("#inpt0308").val($fangchanInfo.houseRegistDate);// '房产证登记时间';
				$.setSelect($('#inpt0303'),$fangchanInfo.houseNature);// '房产性质(010:商品房,020:拆迁安置房,030:房改房,040:自建房,050:经济适用房,060:老房子,070:其他)';
				$.setSelect($('#inpt0304'),$fangchanInfo.houseType);// '房屋类型(10:普通住宅,20:联排别墅,30:独栋别墅,40:其他)';
				$.setSelect($('#inpt0307'),$fangchanInfo.landSource);// '土地来源(10:出让,20:转让,30:划拨,40:其他)';
				$("#inpt0312").val($fangchanInfo.houseArea); // '房屋面积';
				$('#inpt0313').val($fangchanInfo.floor);//楼层
	        	$('#inpt0313_1').val($fangchanInfo.totalFloor);//总楼层
	        	
	        	$setCheckbox($('#isParkingGarden'), $fangchanInfo.isParkingGarden);// '是否有车位或花园(0:否,1:是)';
	        	//$('#inpt0306').val($fangchanInfo.houseBuildYear);// '建成年代';
	        	var selectB = $('#inpt0306');
	        	var optionHtml = "";
	        	var nowYear = nowData.substring(0,4);
	        	for ( var i = 0; i < 70; i++) {
	        		if((nowYear-i) == $fangchanInfo.houseBuildYear){
	        			optionHtml +="<option value='"+(nowYear-i)+"' selected='selected'>"+(nowYear-i)+"</option>";
	        		}else{
	        			optionHtml +="<option value='"+(nowYear-i)+"'>"+(nowYear-i)+"</option>";
	        		}
				}
	        	selectB.html(optionHtml);
	        	$.setSelect($('#inpt0305'),$fangchanInfo.houseSituation);// '房产现状(01:自住,02:租赁,03:空置,04:其他)';
	        	$setCheckbox($('#isHaveSecHouse'), $fangchanInfo.isHaveSecHouse);// '是否有二套房(0:否,1:是)';
	        	$('#inpt0402').val($fangchanInfo.secHouseOwnerName);// '二套房产权人姓名';
	        	$('#inpt0402m').val($fangchanInfo.secHouseArea);// '二套房建筑面积';
	        	$.setSelect($('#inpt0403'),$fangchanInfo.secHouseType);// '二套房房屋类型';
	        	secHouseProvinceCode = $fangchanInfo.secHouseProvinceCode;// '二套房所在省编码';
	        	secHouseCityCode = $fangchanInfo.secHouseCityCode;// '二套房所在市编码';
	        	secHouseAreaCode = $fangchanInfo.secHouseAreaCode;// '二套房所在区编码';
	        	secHouseProvinceName = $fangchanInfo.secHouseProvinceName;// '二套房所在省';
	        	secHouseCityName = $fangchanInfo.secHouseCityName;// '二套房所在市';
	        	secHouseAreaName = $fangchanInfo.secHouseAreaName;// '二套房所在区';
	        	var inpt0404Test = (secHouseProvinceName == null ?"":secHouseProvinceName)+(secHouseCityName== null ?"":secHouseCityName)+(secHouseAreaName== null ?"":secHouseAreaName);
	        	$('#inpt0404').val(inpt0404Test);// '二套房省市区';
				$('#inpt0404_1').val($fangchanInfo.secHouseDetailAddr);// '二套房坐落地址';
				$setCheckbox($('#isHouseMortgage'), $fangchanInfo.isHouseMortgage);// '房产是否已有抵押(0:否,1:是)';
				$setCheckbox($('#isCommercialBank'), $fangchanInfo.isCommercialBank);// '是否为商业银行(0:否,1:是)';
				$.setSelect($('#inpt0503'),$fangchanInfo.loanType);// '一押贷款种类(0001:纯商业贷款,0002:公积金贷款,0003:公积金组合贷款,0004:其他贷款)';
				$("#inpt0504").val($fangchanInfo.loanRightHolder);// '一押权利人';
				$("#inpt5055m").val($fangchanInfo.loanAmount==null?"":$fangchanInfo.loanAmount/10000);// '一押贷款金额';
				$("#inpt5056m").val($fangchanInfo.loanBalance==null?"":$fangchanInfo.loanBalance/10000);// '一押贷款余额';
				//判断是否显示配偶信息填写项
				if($fangchanInfo.marriageStatus == '10' || $fangchanInfo.marriageStatus == '40' ||$fangchanInfo.marriageStatus == '60'
					|| $fangchanInfo.marriageStatust=='' ){
					   $('#inpt0201').val('');
					   $('#inpt0202').val('身份证');
					   $('#inpt0203').val('');
					   $('#inpt0204').val('');
					   $('#inpt0205').val('');
					   $('#Bir').css('display','none');
					   $('#other_info').slideUp();
					}else if($fangchanInfo.marriageStatus == '22' || $fangchanInfo.marriageStatus == '24' ||$fangchanInfo.marriageStatus == '50'){
					   $('#other_info').slideDown();
					}
				if($fangchanInfo.spouseCertificateType == '01' || $fangchanInfo.spouseCertificateType == null){
					  $('#Bir').css('display','none');
					   $('#inpt0203').blur(function(){
							var idcard = $(this).val();
							var year = idcard. substr(6,4);//年
							var month = idcard. substr(10,2);//月
							var day = idcard. substr(12,2);//日
							$('#hbir').val(year+'-'+month+'-'+day);
						})	
					}else{
					   $('#Bir').css('display','block');
					}
			    //是否显示出生日期
				if($('#inpt0202').val() == '01'){
				    $('#Bir').css('display','none');
				    $('#inpt0204').val("");
					$('#inpt0203').blur(function(){
					var idcard = $(this).val();
					var year = idcard. substr(6,4);//年
					var month = idcard. substr(10,2);//月
					var day = idcard. substr(12,2);//日
					$('#hbir').val(year+'-'+month+'-'+day);
					})	
				}else{
				   $('#Bir').css('display','block');
				}
			    //二套房初始化
			    HaveTwoHouse('inpt04','mytwoh1');
			    //已有抵押
			    HaveTwoHouse('inpt05','mytwoh2');
			    HaveTwoHouse('TwoHouse3','mytwoh3');
			},
			dataType: 'json'
		});

	$save = function(needGY,isNext,saveType){
			//保存房产信息
			var JSONObj=new Object();
			/*
			 * (解决)省市区的编码
			 * (解决)住宅地址禁掉
			 * (解决)房产登记日期	系统调出日期控件，且录入日期距离申请日不超过6个月时，系统立即提示“房产证持证时间不符合宅e贷政策”，弹出框1s后消失。
			 * 输入案例：XX省（直辖市）XX市XX区XX路XX号。其中“XX省（直辖市）XX市XX区”为下拉框选择，“XX路XX号”为手动输入，且系统调出数字输入键。
			 * (解决)当地址中没有“一、二、三、四、五、六、七、八、九、十、〇、壹、贰、叁、肆、伍、陆、柒、捌、玖、零、1、2、3、4、5、6、7、8、9、0“中任意一个，提示“房屋详细地址不完整”， 弹出框1s后消失。
			 * (不要了)1)	房产信息补充页面的信息分为：个人信息，抵押房产信息，下一步按钮需要触发后台数据库进行保存，同时支持用户的修改，当前保存的内容覆盖前一次的内容。
			 * 当用户杀掉进程再次进入时，后台系统需要将该用户的信息传个前端，用户将进入未完成的页面 ；
			 * （原型？）用户填写完“配偶信息“时，需要后台系统查询黑名单系统 ，查询配偶是否为黑名单用户，如果在黑名单中，前端将弹窗提示用户“不符合申请条件”， 点击页面中的“我知道了”返回产品首页。如果不在黑名单系统中，前端不需要提示；
5)	当用户填写完“房产证号”时，需要请求安硕系统中已经抵押的房产信息中是否有相同的房产证号，如果有相同则系统则反馈该房产已被抵押，请更换房产。反馈采用浮层1s消失。如果没有相同的则不需要反馈；
9)	(默认展示)当用户在“已抵押信息”中“一押权利人，是否为商业银行”的选项中选择“否”时，则余下的信息输入框将不展示，反之则展示。显示内容采用抽屉式展示；
3，(解决)建成年代：录入年代距离当前超过30年直接拒绝
6，客户录入的出生日期小于18周岁或者大于60周岁直接拒绝
产权人 和二套房产权人验证 只能输入中文字符和中文的逗号，不能有两个逗号之间没内容的情况
共有人页面没有删除按钮
			 */
			var $fangchanInfo = {};
			if(saveType == "all" || saveType == "info"){
				$fangchanInfo.liveProvinceCode =liveProvinceCode;// '住宅所在省编码';
				$fangchanInfo.liveCityCode = liveCityCode;// '住宅所在市编码';
				$fangchanInfo.liveAreaCode = liveAreaCode;// '住宅所在区编码';
				$fangchanInfo.liveProvinceName =liveProvinceName;// '住宅所在省';
				$fangchanInfo.liveCityName = liveCityName;// '住宅所在市';
				$fangchanInfo.liveAreaName = liveAreaName;// '住宅所在区';
				$fangchanInfo.liveDetailAddr = $('#inpt0102').val();// '住宅详细地址';
				$fangchanInfo.marriageStatus =$('#inpt0103').val();// '婚姻状况(10:未婚,22:已婚有子女,24:已婚无子女,40:离婚,60:丧偶,50:再婚)';
				if($fangchanInfo.marriageStatus == '22' || $fangchanInfo.marriageStatus == '24'||$fangchanInfo.marriageStatus == '50'){
					if($('#isSpouseOwner').find('input[type=checkbox]')[0].checked == true){// '配偶是否为共有人(0:否,1:是)';
						$fangchanInfo.isSpouseOwner = "1";
					}else{
						$fangchanInfo.isSpouseOwner = '0';
					}
					$fangchanInfo.spouseName = $("#inpt0201").val()//'配偶姓名';
					$fangchanInfo.spouseCertificateType = $('#inpt0202').val();// '配偶证件类型(01:身份证,02:军官证,03:士兵证)';
					$fangchanInfo.spouseCertificateNo = $("#inpt0203").val().toUpperCase();// '配偶证件号码';
					if($fangchanInfo.spouseCertificateType == "01"){
						$fangchanInfo.spouseBirthDate = $("#hbir").val();// '配偶出生日期';隐藏 
					}else{
						$fangchanInfo.spouseBirthDate = $("#inpt0204").val();// '配偶出生日期';
					}
					$fangchanInfo.spouseMobile = $("#inpt0205").val();// '配偶手机号';
				}
			}
			if(saveType == "all" || saveType == "fangchan"){
				$fangchanInfo.houseMum = $("#inpt0301").val();// '房产证号';
				$fangchanInfo.ownerName = $("#inpt0302").val();// '产权人姓名';
				$fangchanInfo.houseProvinceCode = houseProvinceCode;// '房屋所在省编码';
				$fangchanInfo.houseCityCode = houseCityCode;// '房屋所在市编码';
				$fangchanInfo.houseAreaCode = houseAreaCode;// '房屋所在区编码';
				$fangchanInfo.houseProvinceName = houseProvinceName;// '房屋所在省';
				$fangchanInfo.houseCityName = houseCityName;// '房屋所在市';
				$fangchanInfo.houseAreaName = houseAreaName;// '房屋所在区';
				
				$fangchanInfo.houseLocated = $('#inpt0311_1').val();// '房屋坐落';
				$fangchanInfo.houseCommunityName = $("#inpt0311_2").val();// '房屋小区名称';
			
				$fangchanInfo.houseRegistDate = $("#inpt0308").val();// '房产证登记时间';
				$fangchanInfo.houseNature =  $('#inpt0303').val();// '房产性质(010:商品房,020:拆迁安置房,030:房改房,040:自建房,050:经济适用房,060:老房子,070:其他)';
				$fangchanInfo.houseType = $('#inpt0304').val();// '房屋类型(10:普通住宅,20:联排别墅,30:独栋别墅,40:其他)'
				$fangchanInfo.landSource = $('#inpt0307').val();// '土地来源(10:出让,20:转让,30:划拨,40:其他)';
				$fangchanInfo.houseArea = $("#inpt0312").val(); // '房屋面积';
				$fangchanInfo.floor = $('#inpt0313').val();//楼层
				$fangchanInfo.totalFloor = $('#inpt0313_1').val();//总楼层
				if($('#isParkingGarden').find('input[type=checkbox]')[0].checked == true){// '是否有车位或花园(0:否,1:是)';
					$fangchanInfo.isParkingGarden = "1";
				}else{
					$fangchanInfo.isParkingGarden = '0';
				}
				$fangchanInfo.houseBuildYear = $('#inpt0306').val();// '建成年代';
				$fangchanInfo.houseSituation = $('#inpt0305').val();// '房产现状(01:自住,02:租赁,03:空置,04:其他)';
				if($('#isHaveSecHouse').find('input[type=checkbox]')[0].checked == true){// '是否有二套房(0:否,1:是)';
					$fangchanInfo.isHaveSecHouse = "1";
					$fangchanInfo.secHouseOwnerName = $('#inpt0402').val();// '二套房产权人姓名';
					$fangchanInfo.secHouseArea = $('#inpt0402m').val()// '二套房建筑面积';
					$fangchanInfo.secHouseType =  $('#inpt0403').val();// '二套房房屋类型';
					
					$fangchanInfo.secHouseProvinceCode = secHouseProvinceCode;// '二套房所在省编码';
					$fangchanInfo.secHouseCityCode = secHouseCityCode;// '二套房所在市编码';
					$fangchanInfo.secHouseAreaCode = secHouseAreaCode;// '二套房所在区编码';
					$fangchanInfo.secHouseProvinceName = secHouseProvinceName;// '二套房所在省';
					$fangchanInfo.secHouseCityName = secHouseCityName;// '二套房所在市';
					$fangchanInfo.secHouseAreaName = secHouseAreaName;// '二套房所在区';
					
					$fangchanInfo.secHousePca = $('#inpt0404').val();// '二套房所在省市区';
					$fangchanInfo.secHouseDetailAddr = $('#inpt0404_1').val();// '二套房坐落地址';
				}else{
					$fangchanInfo.isHaveSecHouse = '0';
				}
			
				if($('#isHouseMortgage').find('input[type=checkbox]')[0].checked == true){// '房产是否已有抵押(0:否,1:是)';
					$fangchanInfo.isHouseMortgage = "1";
					if($('#isCommercialBank').find('input[type=checkbox]')[0].checked == true){// '是否为商业银行(0:否,1:是)';
						$fangchanInfo.isCommercialBank = "1";
						$fangchanInfo.loanType =  $('#inpt0503').val();// '一押贷款种类(0001:纯商业贷款,0002:公积金贷款,0003:公积金组合贷款,0004:其他贷款)'
						$fangchanInfo.loanRightHolder = $("#inpt0504").val();// '一押权利人';
						$fangchanInfo.loanAmount = $("#inpt5055m").val()*10000;// '一押贷款金额';
						$fangchanInfo.loanBalance = $("#inpt5056m").val()*10000;// '一押贷款余额';
					}else{
						$fangchanInfo.isCommercialBank = '0';
					}
				}else{
					$fangchanInfo.isHouseMortgage = '0';
				}
			}
			if(isNext && $fangchanInfo.isHouseMortgage == 1){
				if(secondMortgageCity.indexOf(houseAreaCode) > -1){
					window.location="apply_failed.html?flag=secondMortgage";
				}
			}
			
			var applyAmt=$("#applyAmt").val(); // 申请金额
			JSONObj.fangchanStr = JSON.stringify($fangchanInfo);//转化成json数据
			JSONObj.nextStep = isNext?"1":"0";
			JSONObj.applyAmt = applyAmt==""?"":applyAmt*10000;
			//保存房产信息
			$("#waitpic").show();
			if(submitFlag){
				submitFlag = false;
			}else{
				return;
			}
			var reqUrl;
			if(saveType=='info'){
				reqUrl = '/do/zed/savePersonalInfo';
			}else if(saveType=='fangchan'){
				reqUrl = '/do/zed/saveFangchanInfo';
			}else if(saveType=='all'){
				reqUrl = '/do/zed/submitFangchanInfo';
			}else{
				alert('操作类型出错');
				return;
			}

			$.ajax({
				    type: 'POST',
				    url: reqUrl ,
				    data: JSONObj,
				    success: function(response){
						$("#waitpic").hide();
						submitFlag = true;
						if(response.resultCode == "0000" || response.resultCode == "0001"){
							window.location = '/microWebsite/jdcx_check.html';
						}else if(response.resultCode == "9999"){
							if(!isNext){
								return;
							}
							if(needGY){
								window.location.href ="step4_1.html";
							}else{
								window.location.href ="step5.html";
							}
						}else if(response.resultCode == "0006"){//黑名单
							window.location = "apply_failed.html";
						}else if(response.resultCode == "0009" || response.resultCode == "0012" || response.resultCode == "0004" || response.resultCode == "0016"){
							alertMsg(response.resultMsg);
						}else{
							alertMsg("系统异常，请稍后再试");
						}
				    } ,
				    dataType: 'json'
				});
		}
	//默认选中
		$defaultCheckbox = function($obj,code){
			$setCheckbox($obj,code);
			if(code == "" || code == undefined){
				$obj.find('input[type=checkbox]')[0].checked = true;
			}
		}
		//checkbox赋值
		$setCheckbox = function($obj,code){
			if(code == '1'){
				$obj.find('input[type=checkbox]')[0].checked = true;
			}
			else{
				$obj.find('input[type=checkbox]')[0].checked = false;
			}
		}
		//对checkbox取值
		$getCheckbox = function($obj){
			if($obj.find('input[type=checkbox]')[0].checked){
				return $obj.find('.but_txt2').attr('code')
			}else{
				return $obj.find('.but_txt1').attr('code')
			}
		}
		//给空值初始化
		$formatEmpty = function(data){
			if(data == 'null' || data == undefined){
				data = "";
			}
			return data;
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
		//建成年代最大值
		changeYear = function(){
			var selectB = $('#inpt0306');
        	var optionHtml = "";
        	if($("#inpt0308").val() != ""){
	        	var nowYear = $("#inpt0308").val().substring(0,4);
	        	for ( var i = 0; i < 70; i++) {
        			optionHtml +="<option value='"+(nowYear-i)+"'>"+(nowYear-i)+"</option>";
				}
	        	selectB.html(optionHtml);
        	}
		}
		alertMsg = function(content){
			art.dialog({
				  title:false,
				  close:false,
				  cancel:false,
			      content: content,
				  time:(2)
			});
		}
	});
})(window.jQuery)

function cityReturn(parentName,provinceCodeP,level,id){
	$('.myreturn').bind("click",function(){
		if(level == 1){
			$('.addressul').html('');
			$('.dialog_full').css('display','none');
		}else if(level == 2 ){
			getAddress(id);
		}else{
			showCity(parentName,provinceCodeP,id);
		}
	})
}

function showCity(parentName,provinceCodeP,id){
	  var thistext = parentName;
	  var cityCode = provinceCodeP;
	  provinceCode_t = cityCode;
	  $('.addresstop .span1').text(thistext);
	  $('.addressul').html('');
	  $('.addressul').append('<p class="top_choose"><input class="myreturn" type="button" value=""><i>请选择市</i></p><ul class="addressul2"></ul>');
	  getChild(cityCode,"addressul3");
	  cityReturn("","",2,id);
	   //获得市下区县
    $('.addressul3 li').bind("click",function(){
	       
         var thistext2 = $(this).text();
         var cityCode = $(this).attr('data-cityCode');
         cityCode_t = cityCode;
         
		   $('.addresstop .span2').text(thistext2);
	       $('.addressul').html('');
	       $('.addressul').append('<p class="top_choose"><input class="myreturn" type="button" value=""><i>请选择区/县</i></p><ul class="addressul2"></ul>');
		   getChild(cityCode,"addressul4"); 
		   cityReturn(parentName,provinceCodeP,3,id);
		   //点击区、县
	      $('.addressul4 li').bind("click",function(){
		        var thistext3 = $(this).text();
		        var cityCode = $(this).attr('data-cityCode');
		        areaCode_t = cityCode;
		        var isAccept = $(this).attr('data-isAccept');
/*		        if(isAccept == "N"){
		        	alertMsg("该区域暂不支持");
		        	return false;
		        }*/
			    $('.addresstop .span3').text(thistext3);
			    var inputVal = $('.addresstop .span1').text()+ $('.addresstop .span2').text()+$('.addresstop .span3').text();
				$('#'+id).val(inputVal);
				$('.addressul').html('');
              if(id == "inpt0101"){
              	 liveProvinceCode = provinceCode_t;
              	 liveCityCode = cityCode_t;
              	 liveAreaCode = areaCode_t;
              }else if(id == "inpt0404"){
              	 secHouseProvinceCode = provinceCode_t;
              	 secHouseCityCode = cityCode_t;
              	 secHouseAreaCode = areaCode_t;
              }
				$('.dialog_full').css('display','none');
		    });
  }); 
}

function getAddress(id){
	    var getid= id;
	    var provinceCode_t = null;
	    var cityCode_t = null;
	    var areaCode_t = null;
	    $('.addressul').html('');
	    $('.dialog_full').css('display','block');
	    $('.addressul').append('<p class="top_choose"><input class="myreturn" type="button" value=""><i>请选择省份</i></p><ul class="addressul2"></ul>');
		//显示省份
		 /*for(var i=0;i<Allprovince.length;i++){
		   $('.addressul').append('<ul class="addressul2"><li class="pro_li" data-cityCode="'+Allprovince[i][1]+'" data-parentCode="'+Allprovince[i][2]+'">'+Allprovince[i][0]+'</li></ul>');
	     }*/
	     getChild("000000","addressul2");
		 cityReturn("","",1,getid);
		 //获得省份下的市
		 $('.addressul2 li').bind("click",function(){
		     
			  var thistext = $(this).text();
			  var cityCode = $(this).attr('data-cityCode');
			  var parentCode = $(this).attr('data-parentCode');
			  provinceCode_t = cityCode;
			  
			  var parentNameP = thistext;
			  var provinceCodeP = cityCode;
			  $('.addresstop .span1').text(thistext);
			  $('.addressul').html('');
			  $('.addressul').append('<p class="top_choose"><input class="myreturn" type="button" value=""><i>请选择市</i></p><ul class="addressul2"></ul>');
			  getChild(cityCode,"addressul3");
			  cityReturn("","",2,getid);
			   //获得市下区县
		      $('.addressul3 li').bind("click",function(){
			       
		           var thistext2 = $(this).text();
		           var cityCode = $(this).attr('data-cityCode');
		           cityCode_t = cityCode;
		           
				   $('.addresstop .span2').text(thistext2);
			       $('.addressul').html('');
			       $('.addressul').append('<p class="top_choose"><input class="myreturn" type="button" value=""><i>请选择区/县</i></p><ul class="addressul2"></ul>');
				   getChild(cityCode,"addressul4"); 
				   cityReturn(parentNameP,provinceCodeP,3,getid);
				   //点击区、县
			      $('.addressul4 li').bind("click",function(){
				        var thistext3 = $(this).text();
				        var cityCode = $(this).attr('data-cityCode');
				        areaCode_t = cityCode;
				        var isAccept = $(this).attr('data-isAccept');
				        /*if(isAccept == "N"){
				        	alertMsg('该区域暂不支持');
				        	return false;
				        }*/
					    $('.addresstop .span3').text(thistext3);
					    var inputVal = $('.addresstop .span1').text()+ $('.addresstop .span2').text()+$('.addresstop .span3').text();
						$('#'+getid).val(inputVal);
						$('.addressul').html('');
	                    if(getid == "inpt0101"){
	                    	 liveProvinceCode = provinceCode_t;
	                    	 liveCityCode = cityCode_t;
	                    	 liveAreaCode = areaCode_t;
	                    	 liveProvinceName = $('.addresstop .span1').text();
	                    	 liveCityName = $('.addresstop .span2').text();
	                    	 liveAreaName = $('.addresstop .span3').text();
	                    }else if(getid == "inpt0404"){
	                    	 secHouseProvinceCode = provinceCode_t;
	                    	 secHouseCityCode = cityCode_t;
	                    	 secHouseAreaCode = areaCode_t;
	                    	 secHouseProvinceName = $('.addresstop .span1').text();
	                    	 secHouseCityName = $('.addresstop .span2').text();
	                    	 secHouseAreaName = $('.addresstop .span3').text();
	                    }
						$('.dialog_full').css('display','none');
				    });
	        }); 
	      })
	}
	
	var submitFlag2 = true;
	function getChild(cityCode,className){
		if(!submitFlag2){
       	 return;
        }
        submitFlag2 = false;
		$.ajax({
        	type:"post",
 			url:"/do/zed/queryByGCityRelativeId/"+cityCode,                 
 			dataType:'json',
 			async:false,
 			success:function (response){
				if(response.resultCode == "1002"){
					var list = response.list;
					submitFlag2 = true;
					for ( var i = 0; i < list.length; i++) {
						 $('.addressul').append('<ul class="'+className+'"><li class="pro_li" data-cityCode="'+list[i].gcityId
								 +'" data-isAccept="'+list[i].isAccept+'">'+list[i].gcityName+'</li></ul>');
					}
	         	}
			}
         });
	}
	function dateDiff(interval, date1, date2){
	    var objInterval = {'YEAR':1000 * 60 * 60 * 24*365,'MONTH':1000 * 60 * 60 * 24*30,'D':1000 * 60 * 60 * 24,'H':1000 * 60 * 60,'M':1000 * 60,'S':1000,'T':1};
	    interval = interval.toUpperCase();
	    var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
	    var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
	    try {
	       return Math.round((dt2.getTime() - dt1.getTime()) / eval('objInterval.'+interval));
	     }catch (e){
	       return e.message;
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
	  //临时放在页面上处理
	  var secondMortgageCity = "440607,330102,330103,420112,210202,130207,350503,130208,331082,130225,320303,130107,330110,640104,340111,130304,350583,430412,330402,340506,130324,370282,130204,350212,440883,441284,440804,330183,130303,320581,340103,440881,130205,350203,441302,350521,321182,130323,330105,130902,210212,130322,350582,130209,420606,420106,330784,420105,420102,330104,420103,321012,210204,120105,320311,350505,350504,420111,330481,350205,130302,340311,441802,331081,350206,130224,130223,330108,130229,430405,340102,210211,350581,430407,420104,340304,330411,350213,340503,441881,330109,430408,130182,340303,340104,420602,640105,210203,330106,330681,320305,440802,130203,130202,130181,130283,130227,130903,441882,130281,640106,430406,350211,340504,440882,440803,420107,130321,441283,350502,130185,440811,441203,320302,340302";