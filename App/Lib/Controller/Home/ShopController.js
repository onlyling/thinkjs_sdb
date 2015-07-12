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
				return D('shops').order('id DESC').page(this.get('page'),15).countSelect().then(function(data){
					self.assign({
						title: '精选餐店',
						pagerData: data,
						shops: data.data
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
				D('shops').where({
					id: id
				}).find().then(function(data){
					self.assign({
						title:data.name,
						shop:data
					});
					D('food').where({
						shopid: id
					}).select().then(function(_data){
						self.assign({
							foods: _data
						});
						self.display();
					});
				});
			}
		}
	};
});