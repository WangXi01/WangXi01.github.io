// node 后端服务器入口
const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('express-session');
var cors = require('cors');
const app = express();

//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser('session'));
app.use(cookieSession({
	secret:'session',
	resave: true, //添加 resave 选项  
	saveUninitialized: true, //添加 saveUninitialized 选项  
	cookie:{maxAge:20*60*1000}  //20min
}));

//var corsOptions = {
//origin: 'http://39.108.168.151', //只有我的网站可以访问
//	optionsSuccessStatus: 200 
//}

//注册api路由
app.use('/', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});



app.use('/', userApi);

// 监听端口
app.listen(3000);
console.log('server1 listening on port 3000')