$(function() {
	function isEmail(str) {
		var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
		return reg.test(str);
	}
	//------email
	$('#email').on('blur',function(){
		if(this.value.length && !isEmail(this.value)){
			this.className = 'ui-text err';
			return;
		}
		this.className = 'ui-text';
	});
	//------提交
	$('#btn').on('click',function(){
		var _ths = $(this);
		_ths.attr('disabled', 'disabled');
		if($('#email').val().length && !isEmail($('#email').val())){
			alert('邮箱格式不对');
			_ths.removeAttr('disabled');
			return;
		}
		if(!$('#pwd').val().length){
			alert('请输入密码');
			_ths.removeAttr('disabled');
			return;
		}
		var data = {
			id: $('#id').val(),
			pwd: $('#npwd').val(),
			email: $('#email').val(),
			old: $('#pwd').val()
		}
		$.post('/user/set',data,function(data){
			if(data.errno){
				alert(data.errmsg);
			}else{
				alert(data.data);
				window.location.href = '';
			}
			_ths.removeAttr('disabled');
		});
	});
});