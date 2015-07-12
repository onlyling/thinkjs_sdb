$(function(){
	//---注册方式切换
	var nav = $('#nav'), items = $('#items');
	nav.on('click','li',function(){
		var _this = $(this);
		_this.addClass('on').siblings().removeClass('on');
		items.find('.item').eq(_this.index()).addClass('on').siblings().removeClass('on');
	});
	//---邮箱注册验证
	$('#emailLog').validate({
		rules: {
			name: {
				required: true
			},
			pwd: {
				required: true
			},
		},
		messages: {
			name: {
				required: '请填写邮箱'
			},
			pwd: {
				required: '请填写密码'
			},
		}
	});
});