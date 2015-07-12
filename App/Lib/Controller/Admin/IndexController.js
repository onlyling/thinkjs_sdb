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
			self.assign('title','管理中心');
			self.display();
		}
	};
});