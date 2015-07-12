$(function(){
	//添加 form表单
	$('#addForm').validate({
		ignore: [],
		rules: {
			name: {
				required: true,
				remote: {
					url: '/admin/shop/check',
					type: 'POST'
				}
			},
			logo: {
				required: true
			},
			cover: {
				required: true
			},
			tel: {
				required: true
			},
			address: {
				required: true
			},
			intro: {
				required: true
			}
		},
		messages: {
			name: {
				required: '必填项',
				remote: '已存在'
			},
			logo: {
				required: '必填项'
			},
			cover: {
				required: '必填项'
			},
			tel: {
				required: '必填项'
			},
			address: {
				required: '必填项'
			},
			intro: {
				required: '必填项'
			}
		},
		submitHandler: function(){
			var data = $('#addForm').serialize();
			var id = $('#id').val();
			if (id) {
				var url = '/admin/shop/edit';
			} else{
				var url = '/admin/shop/add';
			}
			$.post(url,data,function(data){
				if (data.errno) {
					alert(data.errmsg);
					return;
				}
				window.location.href = '/admin/shop'
			});
		}
	});
	//编辑的时候
	if($('#id').val()){
		$('#name').rules('remove','remote');
	}
	//删除
	$('#shopsTable').on('click','.del',function(){
		var _thisTr = $(this).parents('tr'),
			_id = _thisTr.find('td').eq(0).text();
		$.post('/admin/shop/del',{id: _id},function(data){
			if(data.errno){
				alert(data.errmsg)
				return;
			}
			_thisTr.remove();
			if (!$('#shopsTable tbody tr').length) {
				$('#shopsTable tbody').append($('<tr><td colspan="4">暂时没有餐店入驻，刷新页面试试</td></tr>'));
			}
		});
	});
	//上传logo
	$('#upLogo').on('change',function(){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(e){
			if (xhr.readyState == 4 && xhr.status == 200) {
				$('#imgLogo').addClass('img-logo').attr('src', xhr.responseText);
				$('#logo').val(xhr.responseText);
			}
		}
		xhr.open('POST', '/admin/shop/addimg', true);
		xhr.setRequestHeader("X-FILENAME", 'file');
		xhr.send($('#upLogo')[0].files[0]);
	});
	//上传封面
	$('#upCover').on('change',function(){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(e){
			if (xhr.readyState == 4 && xhr.status == 200) {
				$('#imgCover').addClass('img-cover').attr('src', xhr.responseText);
				$('#cover').val(xhr.responseText);
			}
		}
		xhr.open('POST', '/admin/shop/addimg', true);
		xhr.setRequestHeader("X-FILENAME", 'file');
		xhr.send($('#upCover')[0].files[0]);
	});
});