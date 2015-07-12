/**
 * controller
 * @return 
 */
module.exports = Controller("Admin/BaseController", function(){
	"use strict";
	return {
		//首页
		indexAction: function(){
			self.redirect('/admin/login/login');
		},
		loginAction: function(){
			var self = this;
			if (self.isPost()) {
				var adminInfo = {
					name: self.post('name'),
					pwd: self.post('pwd')
				}
				return D('admin').where(adminInfo).find().then(function(data){
					if (isEmpty(data)) {
						self.redirect('/admin/login/login');
					} else{
						return self.session('adminInfo',data);
					}
				}).then(function(){
					return self.redirect('/admin/index');
				});
			} else{
				self.assign('title','登录');
				self.display();
			}
		},
		logoutAction: function(){
			var self = this;
			self.session('adminInfo','');
			self.redirect('/admin/login/login');
		}
	};
});