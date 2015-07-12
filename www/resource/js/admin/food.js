$(function(){
	//添加 form表单
	$('#addForm').validate({
		ignore: [],
		rules: {
			name: {
				required: true,
				remote: {
					url: '/admin/food/check',
					type: 'POST'
				}
			},
			banner: {
				required: true
			},
			content: {
				required: true
			},
			price: {
				required: true
			},
			sold: {
				required: true
			},
			setmeal: {
				required: true
			},
			shopid: {
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
			banner: {
				required: '必填项'
			},
			content: {
				required: '必填项'
			},
			price: {
				required: '必填项'
			},
			sold: {
				required: '必填项'
			},
			setmeal: {
				required: '必填项'
			},
			shopid: {
				required: '必填项'
			},
			intro: {
				required: '必填项'
			}
		},
		submitHandler: function(form){
			var data = $('#addForm').serialize();
			var id = $('#id').val();
			if (id) {
				var url = '/admin/food/edit';
			} else{
				var url = '/admin/food/add';
			}
			$.post(url,data,function(data){
				if (data.errno) {
					alert(data.errmsg);
					return;
				}
				window.location.href = '/admin/food'
			});
		}
	});
	//编辑的时候
	if($('#id').val()){
		$('#name').rules('remove','remote');
	}
	//删除
	$('#foodsTable').on('click','.del',function(){
		var _thisTr = $(this).parents('tr'),
			_id = _thisTr.find('td').eq(0).text();
		$.post('/admin/food/del',{id: _id},function(data){
			if(data.errno){
				alert(data.errmsg)
				return;
			}
			_thisTr.remove();
			if (!$('#foodsTable tbody tr').length) {
				$('#foodsTable tbody').append($('<tr><td colspan="5">暂时没有美食上架，刷新页面试试</td></tr>'));
			}
		});
	});
	//只能输入数字
	$('.fnNum').on('keypress',function(e){
		var keyCode = e.which;
		if(keyCode == 46 || (keyCode >= 8 && keyCode <= 57) || keyCode == 8){
			return true;
		}else{
			return false;
		}
	});
	//套餐变化的时候
	function setmealChange(){
		var val = [];
		$('#setmealList .item').each(function(index, el) {
			var item = '',
				_el = $(el);
			item =_el.find('.name').text()+'|'+_el.find('.price').text()+'|'+_el.find('.num').text();
			val.push(item);
		});
		if (!val.length) {
			$('#setmeal').val('');
			return;
		}
		$('#setmeal').val(val);
	}
	//点击 添加套餐
	$('#setmealList .tool .ui-btn').on('click',function(){
		var _tool = $(this).parents('.tool'),
			_name = _tool.find('.name').val(),
			_price = _tool.find('.price').val(),
			_num = _tool.find('.num').val();
		if (!_name || !_price || !_num) {
			alert('信息不全');
			return;
		};
		_tool.find('.name').val('');
		_tool.find('.price').val('');
		_tool.find('.num').val('');
		_tool.before($('<div class="item"><span class="name">'+_name+'</span><span class="price">'+_price+'</span><span class="num">'+_num+'</span><span class="x">&times;</span></div>'));
		setmealChange();
	});
	//点击 删除套餐
	$('#setmealList').on('click','.x',function(){
		$(this).parents('.item').remove();
		setmealChange();
	});
	//banner变化的时候
	function bannerChange(){
		var val = [];
		$('#banners img').each(function(index, el) {
			val.push($(el).attr('data-src'));
		});
		if(!val.length){
			$('#banner').val('');
			return;
		}
		$('#banner').val(val);
	}
	//上传banner
	$('#upBanner').on('change',function(){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(e){
			if (xhr.readyState == 4 && xhr.status == 200) {
				$('#banners').append($('<li><img src="'+xhr.responseText+'" data-src="'+xhr.responseText+'"/><span class="x">&times;</span></li>'));
				bannerChange();
			}
		}
		xhr.open('POST', '/admin/food/addimg', true);
		xhr.setRequestHeader("X-FILENAME", 'file');
		xhr.send($('#upBanner')[0].files[0]);
	});
	//点击 删除banner
	$('#banners').on('click','.x',function(){
		$(this).parent().remove();
		bannerChange();
	});
	//content变化的时候
	function contentChange(){
		var val = [];
		$('#contents img').each(function(index, el) {
			val.push($(el).attr('data-src'));
		});
		if(!val.length){
			$('#content').val('');
			return;
		}
		$('#content').val(val);
		console.log($('#content').val())
	}
	//上传封面
	$('#upContent').on('change',function(){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(e){
			if (xhr.readyState == 4 && xhr.status == 200) {
				$('#contents').append($('<li><img src="'+xhr.responseText+'" data-src="'+xhr.responseText+'"/><span class="x">&times;</span></li>'));
				contentChange();
			}
		}
		xhr.open('POST', '/admin/food/addimg', true);
		xhr.setRequestHeader("X-FILENAME", 'file');
		xhr.send($('#upContent')[0].files[0]);
	});
	//点击 删除content
	$('#contents').on('click','.x',function(){
		$(this).parent().remove();
		contentChange();
	});
});