	$(function(){
		var mediaSourceCode = getMediaSouceWap();
		var openId = getUrlParam("weChatId");
		var mgmchannel = getUrlParam("mgmchannel");
		$("#btnNextSTR").attr("href",$("#btnNextSTR").attr("href")+"?openId="+openId+"&WT.mc_id="+mediaSourceCode+"&mgmchannel="+mgmchannel);
	});

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