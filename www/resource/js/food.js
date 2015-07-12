$(function(){
	//--初始化
	var banner = $('#banner'),
		img = banner.find('.img'),
		imgs = banner.find('.imgs img');
	img.attr('src', imgs.eq(0).attr('src'));
	//--鼠标事件
	imgs.on('mouseenter',function(){
		img.attr('src', imgs.eq($(this).index()).attr('src'));
	});
	//--图片延迟加载
	$('img.lazy').Lazy();
});