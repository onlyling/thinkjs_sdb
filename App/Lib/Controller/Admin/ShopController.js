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
			return D('shops').page(this.get('page'),15).countSelect().then(function(data){
				self.assign({
					title: '餐店管理',
					pagerData: data,
					shops: data.data
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
				D('shops').where(obj).find().then(function(data){
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
				var shop = self.post();
				var where = {
					name: shop.name
				}
				D('shops').thenAdd(shop, where, true).then(function(insertId){
					if(insertId){
						return self.success(insertId);
					} else{
						return self.error(1001,'出错了');
					}
				});
			} else{
				self.assign('title','添加餐馆');
				self.display();
			}
		},
		//编辑
		editAction: function(){
			var self = this;
			var id = 0;
			if (self.isGet()) {
				id = self.get('id');
				D('shops').where({
					id: id
				}).find().then(function(data){
					self.assign({
						title: '编辑餐店',
						shop: data
					});
					self.display();
				});
			}else if(self.isAjax()){
				var shop = self.post();
				id = shop.id;
				D('shops').where({
					id: id
				}).update(shop).then(function(rows){
					if (rows) {
						return self.redirect('/admin/shop');
					}
				});
			}
		},
		delAction: function(){
			var self = this;
			if (self.isAjax()) {
				var id = self.post();
				D('shops').where(id).delete().then(function(rows){
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
			var src = 'upload/logo/';
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