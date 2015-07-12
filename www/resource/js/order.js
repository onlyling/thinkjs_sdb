$(function(){
	//缓存
	var pay = $('#pay');
	//提交订单
	$('#getPay').on('click',function(){
		pay.addClass('on');
	});
	//关闭选择
	pay.on('click','.x',function(){
		pay.removeClass('on');
	});
	//去付款
	$('#goPay').on('click',function(){
		if (!$('input[name="way"]:checked').val()) {
			alert('请选择付款方式');
			return;
		}
		$('#order').submit();
	});
});