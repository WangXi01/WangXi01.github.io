<template>
	<div id="login">
		<el-form ref="form" :model="loginForm" label-width="80px" class='login_btn'>
			<h3 class="login_title">登录博客</h3>
			<el-form-item label="用户名">
				<el-input v-model="loginForm.name"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="loginForm.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit"><span>立即登录</span></el-button>
				<div class="pull-right">
					<span>没有账号？</span>
					<a href="#">去注册</a>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { Loading } from 'element-ui';
	export default {
		data() {
			return {
				loginForm: {
					name: '',
					password: '',
				},
			}
		},
		methods: {
			onSubmit() {
				let loadingInstance = Loading.service();
				var tip = '';
				for(var i in this.loginForm) {
					if(this.loginForm[i] == '') {
						if(i == 'name') {
							tip = '用户名';
						} else if(i == 'password') {
							tip = '用户密码';
						}
						this.$message.error(tip + '不能为空');
						return false;
					}
				}
				this.$http.post('/login', this.loginForm).then(res => {
					if(res.data == '') {
						this.$message.error('账号不存在!');
					} else {
						if(res.data[0].password == this.loginForm.password) {
							this.setCookie('username',this.loginForm.password,1);
							this.$message('登录成功');
							this.$router.push('home')
						} else {
							this.$message.error('账号与密码不匹配!');
						}
					}
					loadingInstance.close();
				}).catch(err => {
					this.$message.error('网络异常!');
					loadingInstance.close();
					console.log(err);
				});
			},
			//设置cookie
	        setCookie: function (cname, cvalue, exdays) {
	            var d = new Date();
	            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	            var expires = "expires=" + d.toUTCString();
	            console.info(cname + "=" + cvalue + "; " + expires);
	            document.cookie = cname + "=" + cvalue + "; " + expires;
	            console.info(document.cookie);
	        },
		}
	}
</script>

<style>
	#login .login_title {
		margin: 10px auto 25px;
		text-align: center;
		color: #505458;
	}
	
	#login .el-form {
		position: fixed;
		width: 20%;
		left: 50%;
		top: 50%;
		margin-left: -175px;
		margin-top: -175px;
		border-radius: 5px;
		padding: 15px 35px 15px 0;
		background: #ededed;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 10px #ccc;
	}
</style>