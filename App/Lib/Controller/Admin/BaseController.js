/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]} 
 * @return {[type]}         [description]
 */
module.exports = Controller(function(){
	'use strict';
	return {
		init: function(http){
			var self = this;
			var isLogin = false;
			self.super('init', http);
			//其他的通用逻辑
			//储存常用变量
			self.assign({
				siteName: '食点伴',
				slogan: '管理中心',
				keywords: '外卖,食点伴,重庆大学城外卖',
				description: '食点伴，校园最好的点餐网站！',
				title:'大学生外卖',
				isLogin: isLogin
			});
			if (self.http.action === 'login') {
				return;
			}
			return self.session('adminInfo').then(function(adminInfo){
				//用户信息为空
				if (isEmpty(adminInfo)) {
					return self.redirect('/admin/login/login');
				} else{
					self.adminInfo = adminInfo;
					isLogin = true;
					self.assign({
						adminInfo: adminInfo,
						isLogin: isLogin
					});
				}
			});
		}
	}
})