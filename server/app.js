// node 后端服务器入口
const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('express-session');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cookieSession({
	secret:'session',
	resave: false, //添加 resave 选项  
	saveUninitialized: true, //添加 saveUninitialized 选项  
	cookie:{maxAge:20*60*1000}  //20min
}));

//注册api路由
app.use('/', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');