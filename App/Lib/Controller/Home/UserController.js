/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function() {
	"use strict";
	return {
		//首页
		indexAction: function() {
			//render View/Home/index_index.html file
			var self = this;
			self.assign('title', '用户中心');
			self.display();
		},
		//订单
		orderAction: function() {
			var self = this;
			self.session('userInfo').then(function(userInfo) {
				var order = D('order').where({
					userid: userInfo.id
				}).select().then(function(data) {
					self.assign({
						title: '我的订单',
						order: data
					});
					self.display();
				});
			});
		},
		//账号设置
		setAction: function() {
			var self = this;
			if (self.isAjax()) {
				var userInfo = {
					id: self.post('id')
				};
				if (self.post('pwd')) {
					userInfo.pwd = self.post('pwd');
				}
				if (self.post('email')) {
					userInfo.email = self.post('email');
				}
				D('user').where({
					id: userInfo.id
				}).find().then(function(data){
					if(data.pwd != self.post('old')){
						return self.error(10001,'密码错误');
					}else{
						D('user').where({
							id: userInfo.id
						}).update(userInfo).then(function(_data){
							return self.success('成功更新');
						});
					}
				});
			} else {
				self.display();
			}
		}
	};
});