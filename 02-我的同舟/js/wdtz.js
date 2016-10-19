// @ 我的同舟 || 2016-10-18
$(function(){


	//常用用户名
	jQuery.validator.addMethod("enOrNum",function(value, element){
		var enOrNum = /^[a-zA-Z][a-zA-Z0-9_]*$/;
		return this.optional(element) || (enOrNum.test(value));
	},"请输入英文、数字、或下划线");


	//邮编验证
	jQuery.validator.addMethod("postCode",function(value,element){
		var postCode = /^[1-9]{1}[0-9]{5}$/;
		return this.optional(element) || (postCode.test(value));
	},"邮编格式不正确")

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
	}, "身份证格式不对");

	//select下拉框验证
	$.validator.addMethod("valueNotEquals", function(value, element, arg){
		console.log(arg);
	 	return arg != value;
	}, "您必须选择一个选项");



	//默认参数配置
	$.validator.setDefaults({

		//配置错误提示的节点，默认为label，这里配置成 span （errorElement:'span'）
		errorElement:'span',

		// 验证成功后的回掉函数
		submitHandler: function() {
		  alert("验证成功，提交完成!");
		},
	});

	//修改资料表单验证
	$(".xgzl form").validate({

		onblur: true, 

		rules : {

			//邮箱
			User_Email: {
				email: true,
			},

			//身份证
			User_IDCard: {
				idCard: true,
			},

			//手机号码
			User_Mobile: {
				mobile: true,
			},
		},
	});

	//修改密码表单验证
	$('.xgmm form').validate({

		onblur: true, 

		rules: {

			//旧密码
			txtOldPassword: {
				required: true,
			},

			// 新密码
			txtPassword: {
				required: true,
				rangelength:[6,20],
			},

			// 确认新密码
			txtPassword1: {
				required: true,
				equalTo: "#txtPassword",
			}
		}
	});


	//添加发件人地址表单验证
	$(".tjfjrdz form").validate({

		onblur: true, 

		rules: {

			//地址序号
			address_num: {
				required: true,
				number: true,
			},

			//标签名
			address_TagName: {
				required: true,
			},

			//联系人
			address_ContName: {
				required: true,
			},

			//省份
			address_Province: {
				required:true,
				valueNotEquals: "default",
			},

			//城市
			address_City: {
				required: true,
			},

			//邮编
			address_Zipcode: {
				required: true,
			},

			//地址
			address_Address: {
				required: true,
			},

			//邮件
			address_Email: {
				required: true,
				email: true,
			},

			//手机
			address_Mobile: {
				required: true,
				mobile: true,
			},
		},
	});

	//添加收件人地址
	$(".tjsjrdz form").validate({

		onblur:true,

		rules: {
			address_num: {
				required: true,
				number: true,
			},
			address_TagName: {
				required: true,
			},
			address_contactName: {
				required: true,
			},
			address_Province: {
				valueNotEquals: "default",
			},
			address_City: {
				valueNotEquals: "default",
			},
			address_Area: {
				valueNotEquals: "default",
			},
			address_Address: {
				required:true,
			},
			address_Zipcode: {
				required: true,
			},
			address_Email: {
				required: true,
				email: true,
			},
			address_Mobile: {
				required: true,
				mobile: true,
			},
			IDName: {
				required:true,
			},
			IDnum: {
				required: true,
				idCard: true,
			},
			IDvalidity: {
				required: true,
			},
		},
	});
})