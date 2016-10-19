//define Slider class
function Slider(element, options){
	this.element = $(element);
	this.options = $.extend({}, Slider.defaults, options);
	this.init();
};

//set default paramas
Slider.defaults = {
	width: $(window).width(),
	height: 400,
	speed: 500,
	time: 3000,
	autoplay: true,
	type: 'easing',
	data:[
		{
			"aHref" : "javascript:;void(0)",
			"imgSrc": "img/swiper01.jpg",
		},{
			"aHref" : "javascript:;void(0)",
			"imgSrc": "img/swiper02.jpg",
		},{
			"aHref" : "javascript:;void(0)",
			"imgSrc": "img/swiper03.jpg",
		},{
			"aHref" : "javascript:;void(0)",
			"imgSrc": "img/swiper04.jpg",
		},{
			"aHref" : "javascript:;void(0)",
			"imgSrc": "img/swiper05.jpg",
		}
	],
};

//initialization
Slider.prototype.init = function(){

	var _this = this,
		time = this.options.time;

	this.timer = null;
	this.index = 0;
	this.index1 = 0;

	this.createSliderMain();
	this.setSliderMainCss();

	this.createSliderPagination();
	this.createBtn();
	this.btnBindEvent();

	clearInterval(_this.timer);
	this.timer = setInterval(function(){
		_this.btnNext.trigger("click");
	},time);

	this.element.hover(function(){
		clearInterval(_this.timer);
		_this.sliderBtn.css({
			"display": "block",
		});
	},function(){
		_this.timer = setInterval(function(){
			_this.btnNext.trigger("click");
		},time)
		_this.sliderBtn.css({
			"display": "none",
		});
	});
};

// create slider-main and slider-item nodes
Slider.prototype.createSliderMain = function(){
	var data = this.options.data,
	      string = '';

	for(var i = 0; i < data.length; i++){
		console.log(data[i].imgSrc);
		 string += "<div class='slider-item'><a href="+data[i].aHref+"><img src="+data[i].imgSrc+"></a></div>";
	};

	var sliderMain = "<div class='slider-main'>"+string+"</div>";
	this.element.append(sliderMain);

	this.sliderMain = $('.slider-main',this.element).eq(0);
};

//set style for slider-main and slider-item nodes
Slider.prototype.setSliderMainCss = function(){

	this.element.css({
		"position": "relative",
		"overflow": "hidden",
		"width": this.options.width,
		"height": this.options.height,
	});

	console.log(this.element);// .slider

	this.sliderMain.css({
		"position": "absolute",
		"left": 0,
		"width":  this.options.width * this.options.data.length,
		"height":  this.options.height,
	});

	this.sliderItem = $(".slider-item");
	this.sliderItem.css({
		"float": "left",
		"overflow": "hidden",
		"width": this.options.width,
		"height": this.options.height,
	});
	this.sliderItem.find("a,img").css({
		"display": "block",
		"width": "100%",
		"height": "100%",
	})
};

//create slider-pagination 
Slider.prototype.createSliderPagination = function(){

	var _this = this,
		string = "",
		data = this.options.data;

	for(var i = 0; i < data.length; i++){
		string += "<li class='pagination-item'>"+parseInt(i+1)+"</li>";
	};

	var sliderPagination = "<ul class='slider-pagination'>"+string+"</ul>";
	this.element.append(sliderPagination);

	this.sliderPagination = $('.slider-pagination', this.element).eq(0);

	this.sliderPaginationItem = $(".pagination-item", this.element);
	this.sliderPaginationItem.eq(this.index).addClass("active");

	this.sliderPaginationItem.bind("click", function(){
		_this.index = $(this).index();
		_this.index1 =  $(this).index();
		_this.move();
	});
};

//create slider-btn
Slider.prototype.createBtn = function(){

	var _this = this;
	var sliderBtn = "<div class='slider-btn'><a class='prev' href='javascript:;void(0)'><</a><a class='next' href='javascript:;void(0)'>></a></div>";
	this.element.append($(sliderBtn));
	this.sliderBtn = $(".slider-btn", this.element);

	this.sliderBtn.css({
		display: "none",
	});

	this.btnPrev = $(".prev", _this.element).eq(0);
	this.btnNext = $(".next", _this.element).eq(0);
};

// binding event for btn
Slider.prototype.btnBindEvent = function(){
	var _this = this;
	_this.btnNext.bind("click",function(){
		if(_this.sliderMain.is(":animated")){
			return ;
		}
		if( _this.index == _this.options.data.length - 1){
			_this.index = 0;
			_this.sliderItem.eq(0).css({
				"position": "relative",
				"left": _this.options.data.length * _this.options.width,
			});
		}else{
			_this.index ++;
		};
		_this.index1 ++;
		_this.move();
 	});

	this.btnPrev.bind("click",function(){
		if(_this.sliderMain.is(":animated")){
			return ;
		};
		if(_this.index == 0){
			_this.index = _this.options.data.length - 1;
			_this.sliderItem.eq(_this.options.data.length - 1).css({
				"position": "relative",
				"left": - _this.options.data.length * _this.options.width,
			});
		}else {
			_this.index --;
		}
		_this.index1 --;
		_this.move();
	});
};

// define slider-main move function
Slider.prototype.move = function(){
	var _this = this;
	var p = parseInt(_this.options.width) * _this.index1;
	_this.sliderPaginationItem.removeClass("active");
	_this.sliderPaginationItem.eq(_this.index).addClass("active");
	_this.sliderMain.animate({
		"left": - p ,
	},this.options.speed,function(){
		if(_this.index == 0){
			_this.index1 = 0;
			_this.sliderItem.eq(0).css({
				"position": "static",
			});
			_this.sliderMain.css({
				"left":0,
			});
		}else if(_this.index == _this.options.data.length - 1){
			_this.index1 = _this.options.data.length - 1;
			_this.sliderItem.eq(_this.index).css({
				"position": "static",
			});
			_this.sliderMain.css({
				"left": - _this.index * _this.options.width,
			});
		};
	});
};

// put Slider on jQuery 
$.fn.extend({
	slider:function(options){
		return this.each(function(){
			new Slider(this, options);
		});
	},	
});

//消息滚动
function Newslist(element,options){
	this.element = $(element);
	this.options = $.extend({},Newslist.defaults, options);
	this.init();
}

Newslist.defaults = {
	time: 3000,
	speed: 800,
	type: "swing",
	"listName": "list",
	"itemName": "item"
}

Newslist.prototype.init = function(){
	var _this = this;
	this.index = 0;
	var listName = this.options.listName;
	var itemName = this.options.itemName;
	var time = this.options.time;
	this.list = this.element.find("."+listName).eq(0);
	this.item  = this.list.find("."+itemName);	
	var h = this.item.height();
	this.timer = setInterval(function(){
		_this.move(h);
	},time)
}

Newslist.prototype.move = function(h){

	var type = this.options.type;
	var speed = this.options.speed;

	this.index++;
	if(this.index == this.item.length){
		this.list.css({
			top:h
		})
		this.index = 0;
	}

	this.list.animate({
		"top": -this.index*h
	},speed,type);
}


$.fn.extend({
	newslist:function(options){
		return this.each(function(){
			new Newslist(this, options);
		})
	}
})



$(function(){

	//首页轮播图实例化
	$('#banner .slider').eq(0).slider({
		height:400,
		data:[
			{
				"aHref" : "javascript:;void(0)",
				"imgSrc": "img/banner-01.png",
			},{
				"aHref" : "javascript:;void(0)",
				"imgSrc": "img/banner-02.jpg",
			},{
				"aHref" : "javascript:;void(0)",
				"imgSrc": "img/banner-03.jpg",
			},{
				"aHref" : "javascript:;void(0)",
				"imgSrc": "img/banner-04.jpg",
			}
		],
	});

	//消息滚动实例化
	$(".listBox").newslist();

	//给当前页对应header li 添加类
	$("#header .nav li").eq(0).addClass("active");


	$("tr:even").css({
		background: "#a6c6f0"
	})

	//美化表格样式
	$("tr:odd").find("td:odd").css({
		"background": "#C5D9F1",
	});

	$("tr:odd").find("td:even").css({
		"background": "#DBECFD",
	});


	// css3效果
	$("#serve .item").css({
		"box-shadow": " 0 0 50px black",
	});
})
