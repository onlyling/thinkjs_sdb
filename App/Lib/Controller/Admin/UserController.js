/**
 * controller
 * @return 
 */
module.exports = Controller("Admin/BaseController", function(){
	"use strict";
	return {
		indexAction: function(){
			var self = this;
			return D('user').page(this.get('page'),15).countSelect().then(function(data){
				self.assign({
					title: '会员管理',
					pagerData: data,
					users: data.data
				});
				self.display();
			}).catch(function(err){
				self.end('出错了');
			});
		},
		//---通过id获取用户数据
		getuserAction: function(){
			var self = this;
			if(self.isAjax()){
				D('user').where({id:self.post('id')}).find().then(function(data){
					if (isEmpty(data)) {
						return self.error(1001,'查询不到数据');
					}else{
						return self.success(data);
					}
				}).catch(function(err){
					return self.error(10002,'catch出来的');
				});
			}
		},
		//---查询是否储存在
		checkAction: function(){
			var self = this;
			if (self.isAjax()) {
				var name = self.post('name'),
					email = self.post('pwd');
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
					if (isEmpty(data)) {
						return self.end('true');
					} else{
						return self.end('false');
					}
				}).catch(function(){
					return self.error(1002,'catch出来的');
				});
			}
		},
		//---添加会员
		addAction: function(){
			var self = this;
			if (self.isAjax()) {
				var userInfo = {
					name: self.post('name'),
					pwd: self.post('pwd'),
					email: self.post('email')
				}
				D('user').add(userInfo).then(function(insertId){
					if (isEmpty(insertId)) {
						return self.error(1001,'添加失败');
					} else{
						return self.success(insertId);
					}
				});
			}
		},
		//---编辑会员
		editAction: function(){
			var self = this;
			if (self.isAjax()) {
				var id = {
					id: self.post('id')
				}
				var userInfo = {
					name: self.post('name'),
					pwd: self.post('pwd'),
					email: self.post('email')
				}
				D('user').where(id).update(userInfo).then(function(data){
					if (isEmpty(data)) {
						return self.error(1001,'更新失败');
					} else{
						return self.success(data);
					}
				});
			}
		},
		//---删除会员
		delAction: function(){
			var self = this;
			if (self.isAjax()) {
				var id = {
					id: self.post('id')
				}
				D('user').where(id).delete().then(function(rows){
					if (isEmpty(rows)) {
						return self.error(1001,'好像出错了');
					} else{
						return self.success(rows);
					}
				});
			}
		}
	};
});