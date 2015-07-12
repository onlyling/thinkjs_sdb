/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
	"use strict";
	return {
		//安全退出
		logoutAction: function(){
			this.session('userInfo','');
			this.redirect('/login');
		},
		//登录
		indexAction: function(){
			var self  = this;
			if (self.isPost()) {
				var obj = {
					name: self.post('name'),
					pwd: self.post('pwd')
				}
				return D('user').where(obj).find().then(function(data){
					if (isEmpty(data)) {
						return self.redirect('/login');
					} else{
						return self.session('userInfo',data);
					}
				}).then(function(){
					return self.redirect('/');
				});
			} else{
				self.assign('title','登录');
				self.display();
			};
		}
	};
});