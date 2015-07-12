$(function(){
	/*
	 *创建一个弹出框
	 *t添加/修改
	 */
	 function creatBox(id, name, pwd, email){
	 	var _id = id || 'new',
	 		_name = name || '',
	 		_pwd = pwd || '',
	 		_email = email || '';
	 	if (_id == 'new') {
	 		var _title = '添加会员',
	 			_btn = '确认添加';
	 	} else{
	 		var _title = '编辑会员',
	 			_btn = '确认修改';
	 	}
	 	var html = $('<form class="userbox ui-alertbox">'
						+'<h2 class="ui-title">'+_title+'<span class="x">&times;</span></h2>'
						+'<input type="hidden" name="id" id="id" value="'+_id+'" />'
						+'<ul class="ul">'
							+'<li>'
								+'<label for="name">用户名：</label>'
								+'<input type="text" name="name" id="name" class="ui-text" value="'+_name+'" />'
							+'</li>'
							+'<li>'
								+'<label for="pwd">密码：</label>'
								+'<input type="text" name="pwd" id="pwd" class="ui-text" value="'+_pwd+'" />'
							+'</li>'
							+'<li>'
								+'<label for="email">邮箱：</label>'
								+'<input type="text" name="email" id="email" class="ui-text" value="'+_email+'">'
							+'</li>'
							+'<li>'
								+'<label></label>'
								+'<input type="submit" class="ui-btn" value="'+_btn+'">'
							+'</li>'
						+'</ul>'
						+'</form>');
	 	//---追加到页面
	 	$('body').append(html);
	 	//---.x 关闭弹窗
	 	html.on('click','.x',function(){
	 		html.remove();
	 	});
	 	//---验证
	 	html.validate({
	 		rules: {
	 			name: {
	 				required: true,
	 				remote: {
	 					url: '/admin/user/check',
	 					type: 'POST'
	 				}
	 			},
	 			pwd: {
	 				required: true,
	 				minlength: 5
	 			},
	 			email: {
	 				required: true,
	 				remote: {
	 					url: '/admin/user/check',
	 					type: 'POST'
	 				}
	 			}
	 		},
	 		messages: {
	 			name: {
	 				required: '必填项',
	 				remote: '已注册'
	 			},
	 			pwd: {
	 				required: '必填项',
	 				minlength: '密码不能小于{0}个字符'
	 			},
	 			email: {
	 				required: '必填项',
	 				remote: '已注册'
	 			}
	 		}
	 	});
	 	//---.ui-btn 提交数据
	 	html.on('click','.ui-btn',function(e){
	 		e.preventDefault();
	 		var userInfo = {
	 			id: $('#id').val(),
	 			name: $('#name').val(),
	 			pwd: $('#pwd').val(),
	 			email: $('#email').val()
	 		}
 			if (!userInfo.name) {
 				return;
 			}
 			if (!userInfo.pwd) {
 				return;
 			}
 			if (!userInfo.email) {
 				return;
 			}
 			if (userInfo.id == 'new') {
 				$.post('/admin/user/add',userInfo,function(data){
 					if (data.errno) {
 						alert(data.errmsg);
 					}
 					var _html = '<tr>'
									+'<td>'+data.data+'</td>'
									+'<td>'+userInfo.name+'</td>'
									+'<td>'+userInfo.email+'</td>'
									+'<td><span class="edit">编辑</span><span class="del">删除</span></td>'
								+'</tr>';
					if ($('#nousers').length) {
						$('#nousers').remove();
					}
					$('#usersTable').append(_html);
					html.remove();
 				});
 			} else{
 				$.post('/admin/user/edit',userInfo,function(data){
 					if (data.errno) {
 						alert(data.errmsg);
 						return;
 					}
 					var _html = '<td>'+userInfo.id+'</td>'
								+'<td>'+userInfo.name+'</td>'
								+'<td>'+userInfo.email+'</td>'
								+'<td><span class="edit">编辑</span><span class="del">删除</span></td>';
					//通过点击编辑时标记的id查询
					$('#thisId').html(_html);
					html.remove();
 				});
 			}
	 	});
	 };
	 //---点击 添加会员
	$('#add').on('click',function(){
		creatBox();
	});
	//---点击 编辑
	$('#usersTable').on('click','.edit',function(){
		var _thisTr = $(this).parents('tr'),
			_id = _thisTr.find('td').eq(0).text();
		_thisTr.attr('id', 'thisId');
		$.post('/admin/user/getuser',{id:_id},function(data){
			//console.log(data);
			creatBox(data.data.id, data.data.name, data.data.pwd, data.data.email);
		});
	});
	//---点击 删除
	$('#usersTable').on('click','.del',function(){
		var _thisTr = $(this).parents('tr'),
			_id = _thisTr.find('td').eq(0).text();
		$.post('/admin/user/del',{id:_id},function(data){
			if (data.errno) {
				alert(data.errmsg);
				return;
			}
			_thisTr.remove();
			if (!$('#usersTable tbody tr').length) {
				$('#usersTable tbody').append($('<tr id="nousers"><td colspan="4">暂时没有人注册成为会员，刷新页面试试</td></tr>'));
			}
		});
	});
});