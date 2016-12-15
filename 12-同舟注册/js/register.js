 // 表单验证 || 2016-10-17 需要核对规则！
$(function(){

	//默认参数配置
	$.validator.setDefaults({

		//配置错误提示的节点，默认为label，这里配置成 span （errorElement:'span'）
		errorElement:'span',

		// 验证成功后的回掉函数
		submitHandler: function() {
		  alert("验证成功，提交完成!");
		},
	});


	//常用用户名
	jQuery.validator.addMethod("enOrNum",function(value, element){
		var enOrNum = /^[a-zA-Z][a-zA-Z0-9]{5,14}$/;
		return this.optional(element) || (enOrNum.test(value));
	},"以英字母开头、包含数字，英文字母，6-15位");

	//手机验证规则  
	jQuery.validator.addMethod("mobile", function (value, element) {
	   var mobile = /^1[3|4|5|7|8]\d{9}$/;
		return this.optional(element) || (mobile.test(value));
	}, "手机号码格式不对");


	//邮箱或手机验证规则  
	jQuery.validator.addMethod("emailOrMobile", function (value, element) {
	   var mm = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
		return this.optional(element) || (mm.test(value));
	}, "格式不对");

	//身份证
	jQuery.validator.addMethod("idCard", function (value, element) {
	    var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
	    var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//(18位)
	    return this.optional(element) || (isIDCard1.test(value)) || (isIDCard2.test(value));
	}, "格式不对");

    $("form").eq(0).validate({
    	onblur: true, 
    	rules: {

    		//username
    		username: {
    			required: true,
    			rangelength:[6,15],
    			enOrNum: true,
    		},

    		//password
    		password: {
    			required: true,
    			rangelength:[6,20],
    		},

    		//confirm
    		confirm: {
    			required: true,
    			equalTo: "#password",
    			rangelength:[6,20],
    		},

    		//firstName
    		firstName: {
    			required: true,
    		},

    		//mobile
    		mobile: {
    			required: true,
    			mobile: true,
    		},

    		//email
    		email: {
    			required: true,
    			email:true,
    		},

    		agree: {
    			required: true,
    		}
    	}
    })
})


//获取用户协议数据 || 2016-10-18
$(function(){

	//设置遮罩大小
	$(".mask").css({
		"width": $("body").width(),
		"height": $("body").height(),
	});


	$("#protocol_link").on("click", function(){
		$(".dialog").css({
			"display": "block",
		});
		$(".mask").css({
			"display": "block",
		});
	});


	$(".dialog-close").on("click", function(){
		$(".dialog").css({
			"display": "none",
		});
		$(".mask").css({
			"display": "none",
		});
	});


	$("#agree").attr("checked",false);
	$("button.btn-register").on("click", function(){
		if( $("#agree").attr("checked") == undefined){
			alert("请阅读《用户注册协议》并同意！");
			return false;
		};
	});


	$(".protocol-btn button").on("click", function(){
		//显示弹框
		$(".dialog").css({
			"display": "none",
		});
		//显示遮罩
		$(".mask").css({
			"display": "none",
		});
		// 选中同意协议
		$("#agree").attr("checked","checked");
	})
})