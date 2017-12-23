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

// 增加用户接口
router.post('/writeBlog', (req, res) => {
	var sql = $sql.user.add;
	var params = req.body;
	params.dynamicTags = params.dynamicTags.toString();
	conn.query(sql, [params.name, params.dynamicTags,params.desc,params.createTime], function(err, result) {
		if(err) {
			console.log(err);
		}
		if(result) {
			jsonWrite(res, result);
		}
	})
});

// 增加用户接口
router.get('/title', (req, res) => {
	var sql = $sql.user.select;
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
	var sql = "select * from title where id="+id;
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