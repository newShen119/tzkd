// @登录 || 2016-10-18
$(function(){

	// 更改表单验证提示信息位置
	$("input").next("span.error").css({
		"position": "absolute",
		"top": 50,
		"left": 125,
	})

	//默认参数配置
	$.validator.setDefaults({

		//配置错误提示的节点，默认为label，这里配置成 span （errorElement:'span'）
		errorElement:'span',

		// 验证成功后的回掉函数
		submitHandler: function() {
		  alert("验证成功，提交完成!");
		},
	});
	
	$("#login-form").validate({
		onblur: true, 
		rules : {
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
		}
	})
})