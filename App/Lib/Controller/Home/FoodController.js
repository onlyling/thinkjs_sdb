/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
	"use strict";
	return {
		indexAction: function(){
			var self = this;
			if (self.isGet()) {
				var id = self.get('id');
				return D('food').order('id DESC').page(this.get('page'),15).countSelect().then(function(data){
					self.assign({
						title: '精选美食',
						pagerData: data,
						foods: data.data
					});
					self.display();
				}).catch(function(err){
					self.end('出错了');
				});
			}
		},
		//详情页
		itemAction:function(){
			var self = this;
			if (self.isGet()) {
				var id = self.get('id');
				D('food').where({
					id: id
				}).find().then(function(data){
					self.assign({
						title: data.name,
						food: data
					});
					D('shops').where({
						id: data.shopid
					}).find().then(function(_data){
						console.log(_data);
						self.assign({
							address: _data.address
						});
						self.display();
					});
				});
			}
		}
	};
});