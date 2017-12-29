var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

//post请求
router.post('/writeBlog', (req, res) => {
	var sql = $sql.title.add;
	var params = req.body;
	params.dynamicTags = params.dynamicTags.toString();
	conn.query(sql, [params.name, params.dynamicTags, params.desc, params.createTime], function(err, result) {
		if(err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result);
		}
	})
});

router.post('/login', (req, res) => {
	var sql = `SELECT * FROM user WHERE name='${req.body.name}'`;
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err);
		}
		if(result) {
			req.session.user = result[0];
			jsonWrite(res, result);
		}
	})
})

router.post('/register', (req, res) => {
	var username = req.body.name;
	var sql_name = `SELECT * FROM user WHERE name='${username}'`;
	conn.query(sql_name, function(err, result) {
		if(err) {
			console.log(err);
		}
		if(result!='') {
			console.log(result)
			res.json({
				code:'304',
				msg: '用户名已存在',
			});
		}else{
			var password = req.body.password;
			var sql = $sql.user.add;
			conn.query(sql,[username,password],function(err, result) {
				if(err) {
					console.log(err);
				}
				if(result) {
					jsonWrite(res, result);
				}
			})
		}
	})
})

router.post('/loginOut',(req,res)=>{
	req.session.user = null;
	req.session['count'] == null;
	res.json({
		code: '200',
		msg: '已退出登录'
	});
})

//get请求
router.get('/home', (req, res) => {
	if(req.session.user) {
		if(req.session['count'] == null) {
			req.session['count'] = 1;
		} else {
			req.session['count']++
		}
		var user = req.session.user;
		var name = user.name;
		var result = {
			name:name,
			count:req.session['count'],
		}
		jsonWrite(res, result)
	} else {
		req.session['count'] = null;
		res.send('你还没有登录，先登录下再试试！');
	}
})

// 增加用户接口
router.get('/title', (req, res) => {
	var sql = $sql.title.select;
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result);
		}
	})

});

router.get('/getBlog', (req, res) => {
	var id = req.query.id;
	var sql = "select * from title where id=" + id;
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result);
		}
	})

});

module.exports = router;