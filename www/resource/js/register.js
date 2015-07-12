$(function(){
	//---注册方式切换
	var nav = $('#nav'), items = $('#items');
	nav.on('click','li',function(){
		var _this = $(this);
		_this.addClass('on').siblings().removeClass('on');
		items.find('.item').eq(_this.index()).addClass('on').siblings().removeClass('on');
	});
	//---邮箱注册验证
	$('#emailReg').validate({
		rules: {
			email: {
				required: true,
				email: true,
				remote: {
					url: '/register',
					type: 'POST'
				}
			},
			name: {
				required: true,
				remote: {
					url: '/register',
					type: 'POST'
				}
			},
			pwd: {
				required: true,
				minlength: 5
			},
			rpwd: {
				required: true,
				equalTo: '#pwd'
			}
		},
		messages: {
			email: {
				required: '必须填写邮箱',
				email:'请输入正确的邮箱地址',
				remote: '该邮箱已被使用'
			},
			name: {
				required: '必须填写用户名',
				remote: '该用户名已存在'
			},
			pwd: {
				required: '必须填写密码',
				minlength: '密码不能小于{0}个字符'
			},
			rpwd: {
				required: '请再次输入密码',
				equalTo: '密码不一致'
			}
		}
	});
});