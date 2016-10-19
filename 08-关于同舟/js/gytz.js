//选项卡切换
$(function(){
	var aItems = $(".side .item");
	var aNewsItems = $(".main .news");
	aItems.eq(0).addClass("on");
	aNewsItems.hide();
	aNewsItems.eq(0).show();
	$(".side .item").bind("click",function(){
		var _this = $(this);
		aItems.removeClass("on");
		_this.addClass("on");
		aNewsItems.hide();
		aNewsItems.eq(_this.index()).show();
	});
});