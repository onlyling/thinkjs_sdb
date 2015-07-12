/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
	"use strict";
	return {
		//首页
		indexAction: function(){
			//render View/Home/index_index.html file
			var self = this;
			if(self.isGet()){
				var key = self.get('name');
				D('food').where({
					name: ['like','%'+key+'%'],
					intro: ['like','%'+key+'%'],
					_logic: 'OR'
				}).select().then(function(data){
					self.assign({
						title: key,
						foods: data
					});
					self.display();
				});
			};
		}
	};
});