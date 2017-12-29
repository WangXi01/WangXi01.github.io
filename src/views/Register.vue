<template>
	<div id="register">
		<el-form ref="form" :model="registerForm" label-width="80px" class='login_btn'>
			<h3 class="login_title">注册账号</h3>
			<el-form-item label="用户名">
				<el-input v-model="registerForm.name"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="registerForm.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit"><span>立即注册</span></el-button>
				<div class="pull-right">
					<span>已有账号？</span>
					<router-link to='login'>去登录</router-link>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { Loading } from 'element-ui';
	export default {
		name:'register',
		data(){
			return{
				registerForm:{
					name:'',
					password:'',
				}
			}
		},
		methods:{
			onSubmit(){
				let loadingInstance = Loading.service();
				var tip = '';
				for(var i in this.registerForm) {
					if(this.registerForm[i] == '') {
						if(i == 'name') {
							tip = '用户名';
						} else if(i == 'password') {
							tip = '用户密码';
						}
						this.$message.error(tip + '不能为空');
						this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
							loadingInstance.close();
						});
						return false;
					}
				}
				this.$http.post('/register', this.registerForm).then(res => {
					if(res.status == 200){
						if(res.data.code == 304){
							this.$message(res.data.msg)
						}else{
							this.$message('注册成功！，去登录吧少年');
							this.$router.push('login')
						}
					}
				}).catch(err => {
					this.$message.error('网络异常!');
					console.log(err);
				});
				this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
					loadingInstance.close();
				});
			}
		}
	}
</script>

<style>
	#register .login_title {
		margin: 10px auto 25px;
		text-align: center;
		color: #505458;
	}
	
	#register .el-form {
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