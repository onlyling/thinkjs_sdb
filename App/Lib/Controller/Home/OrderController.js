/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
	"use strict";
	return {
		//首页
		indexAction: function(){
			var self = this;
			if(self.isPost()){
				var id = self.post('id');
				D('food').where({
					id: id
				}).find().then(function(data){
					data.num = self.post('num');
					data.shopid = self.post('shopid');
					data.address = self.post('address');
					self.assign({
						title: '订单管理',
						order: data
					});
					self.display();
				});
			}else{
				self.redirect('/');
			}
		},
		detailsAction: function(){
			var self = this;
			if (self.isPost()) {
				var foodNum;
				var order = {
					userid:  0,
					shopid: self.post('shopid'),
					foodid: self.post('id'),
					num: self.post('num'),
					address: self.post('address'),
					imei: 0
				}
				self.session('userInfo').then(function(userInfo){
					order.userid = userInfo.id;
					order.imei = new Date().getTime() + order.userid + order.shopid + order.foodid + order.num;
					D('order').add(order).then(function(inserId){
						if (inserId) {
							D('food').where({
								id: order.foodid
							}).updateInc('sold',1).then(function(){
								self.redirect('/user/order');
							});
						}
					});;
				});
			}
		}
	};
});