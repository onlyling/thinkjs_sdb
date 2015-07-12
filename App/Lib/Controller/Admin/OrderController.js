/**
 * controller
 * @return 
 */
module.exports = Controller("Admin/BaseController", function(){
	"use strict";
	return {
		//首页
		indexAction: function(){
			var self = this;
			return D('order').page(this.get('page'),15).countSelect().then(function(data){
				self.assign({
					title: '订单管理',
					pagerData: data,
					order: data.data
				});
				self.display();
			}).catch(function(err){
				self.end('出错了');
			});
		}
	};
});