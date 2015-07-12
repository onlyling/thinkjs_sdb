/**
 * controller
 * @return 
 */
 var fs = require('fs');
module.exports = Controller("Admin/BaseController", function(){
	"use strict";
	return {
		//首页
		indexAction: function(){
			var self = this;
			return D('food').order('id DESC').page(this.get('page'),15).countSelect().then(function(data){
				self.assign({
					title: '美食管理',
					pagerData: data,
					foods: data.data
				});
				self.display();
			}).catch(function(err){
				self.end('出错了');
			});
		},
		//检测
		checkAction: function(){
			var self = this;
			if (self.isAjax()) {
				var obj = {
					name: self.post('name')
				}
				D('food').where(obj).find().then(function(data){
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
		//添加
		addAction: function(){
			var self = this;
			if (self.isAjax()) {
				var food = self.post();
				var where = {
					name: food.name
				}
				D('food').thenAdd(food, where, true).then(function(insertId){
					if(insertId){
						return self.success(insertId);
					} else{
						return self.error(1001,'出错了');
					}
				});
			} else{
				D('shops').order('id').select().then(function(data){
					self.assign({
						title: '添加美食',
						shops: data
					});
					self.display();
				});
			}
		},
		//编辑
		editAction: function(){
			var self = this;
			var id = 0;
			if (self.isGet()) {
				id = self.get('id');
				D('food').where({
					id: id
				}).find().then(function(data){
					self.assign({
						title: '编辑美食',
						food: data
					});
					D('shops').order('id').select().then(function(data){
						self.assign({
							shops: data
						});
						self.display();
					});
				});
			}else if(self.isAjax()){
				var food = self.post();
				id = food.id;
				D('food').where({
					id: id
				}).update(food).then(function(rows){
					if(rows){
						return self.success(rows);
					} else{
						return self.error(1001,'出错了');
					}
				});
			}
		},
		delAction: function(){
			var self = this;
			if (self.isAjax()) {
				var id = self.post();
				D('food').where(id).delete().then(function(rows){
					if (isEmpty(rows)) {
						return self.error(1001,'出错了');
					} else{
						return self.success(rows);
					}
				});
			}
		},
		addimgAction: function(){
			var self = this;
			if (self.isPost()) {
				var img = self.utilUploadImg(self.file('file').path);
				return self.end(img);
			};
		},
		//上传图片
		utilUploadImg: function(upImgPath){
			var extension = '';
			var finalFileName = '';
			var src = 'upload/foods/';
			//处理后缀和文件名
			upImgPath.indexOf('png') !== -1 ? extension = '.png' : extension = '.jpg';
			finalFileName = new Date().getTime()+extension;
			//读取文件
			fs.readFile(upImgPath, function(err, data){
				if (err) {
					console.log('读取文件的时候出错了');
					return;
				} else{
					fs.writeFile(src + finalFileName, data, function(err){
						if (err) {
							console.log('写入文件的时候出错了');
							return;
						} else{
							console.log(finalFileName+'已保存');
						}
					});
				}
			});
			return ('/'+src + finalFileName);
		}
	};
});