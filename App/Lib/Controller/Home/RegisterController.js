/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
	"use strict";
	return {
		//注册
		indexAction: function(){
			var self = this;
			if (self.isAjax()) {
				var name = self.post('name'),
					email = self.post('email');
				if (name) {
					var obj = {
						name: name
					}
				} else{
					var obj = {
						email: email
					}
				}
				D('user').where(obj).find().then(function(data){
					if (!isEmpty(data)) {
						return self.end('false');
					} else{
						return self.end('true');
					}
				});
			}
			else if(self.isPost()){
				var userInfo = {
					email: self.post('email'),
					name:self.post('name'),
					pwd: self.post('pwd')
				}
				return D('user').add(userInfo).then(function(insertId){
					self.session('userInfo',userInfo);
					return self.redirect('/');
				}).catch(function(err){
					return;
				});
			} else{
				self.assign('title','用户注册');
				self.display();
			};
		}
	};
});