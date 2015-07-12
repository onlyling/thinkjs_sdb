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
			self.assign('title','首页');
			self.display();
		}
	};
});