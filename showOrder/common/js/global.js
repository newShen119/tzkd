/*  @global.js  全局JS  || 2016-10-13 */

//placeholder 兼容性处理
$(function(){ 

		//判断浏览器是否支持placeholder属性
		supportPlaceholder = 'placeholder'in document.createElement('input');
		console.log(supportPlaceholder);

		var  placeholder = function(element){
			var text = element.attr('placeholder'),
			defaultValue = element.defaultValue;
			if(!defaultValue){
				element.val(text).addClass("phcolor");
				$("[placeholder]")
					.css({
						"color": "#999",
					})
					.on("focus", function(){
						$(this).val("");
						$(this).css({
							"color": "#333",
						});
					})
					.on("change", function(){
						$(this).css({
							"color": "#333",
						});
					  });
			}
 
			element.focus(function(){
				if(element.val() == text){
					$(this).val("");
				}
			});

			element.blur(function(){
				if(element.val() == ""){
					$(this).val(text).css({
						"color": "#999",
					})
				};
			});
 
			//输入的字符不为灰色
			element.keydown(function(){
				$(this).css({
					"color": "#333",
				})
			});
		 };
 
	//当浏览器不支持placeholder属性时，调用placeholder函数
	if(!supportPlaceholder){
		$('input').each(function(){
			  text = $(this).attr("placeholder");
			if($(this).attr("type") == "text"){
				placeholder($(this));
			};
		});
		 $('textarea').each(function(){
			placeholder($(this));
		});
	};
});

//表单效果处理
$(function(){
  	$("input, textarea").on("focus", function(){
		$(this).addClass("focus");
 	 })
  	.on("blur",function(){
		$(this).removeClass("focus");
  	});
});


/* @ backtop.js -- 回到顶部 || 2016-10-14  */
$(function(){

	//back-top
	function BackTop(element,options){
	  	this.element = $(element);
	  	this.options = $.extend({}, BackTop.defaults, options);
	  	this.init();
	};

	BackTop.defaults = {
	  	speed: 400, //动画持续时间:number
	  	destination: 0, //回到离顶部的距离:number
	  	mode: "move", //运动方式:string
	  	position: 100//达到该滚动距离时出现按钮
	};

	BackTop.prototype.init = function(){

	  	var _window = $(window),
	    	element = this.element,
	   	mode = this.options.mode,
	   	position = this.options.position;

	    	this.element.hide();

		if(mode == "move"){
		         element.on("click",$.proxy(this.move,this));
		}else if(mode == "go"){
		    	element.on('click', $.proxy(this.go, this));
		};
	  	_window.on('scroll', $.proxy(this.checkPosition, this));
	};

	BackTop.prototype.move = function(){

	  	var element = $('html,body'),
	    	speed = this.options.speed,
	   	destination = this.options.destination;

	 	 if(!element.is(':animated')){
	    		element.animate({
	      			scrollTop: destination
	    		},speed);
	  	};
	};

	BackTop.prototype.go = function(){
	 	var element = $('html,body'),
	    	destination = this.options.destination;
	  	element.scrollTop(destination);
	};

	BackTop.prototype.checkPosition = function(){
	 	var _window = $(window) ,
	    	element = this.element ,
	    	position = this.options.position ;

	  	if( _window.scrollTop() > position ){
	    		element.fadeIn();
	 	}else {
	    		element.fadeOut();
	 	};
	};

	$.fn.extend({
	  	backTop:function(options){
	    		return this.each(function(){
	       			new BackTop(this, options);
	    		});
	 	},
	});
	$("#toolbar .t1").eq(0).backTop();
})


//表格美化 || 2016-10-16 10:22
$(function(){
	$(".tb.effect").css({
		"box-shadow": "0 0 50px blue",
	})
})