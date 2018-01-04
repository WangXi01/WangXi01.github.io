<template>
	<div class="header">
		<el-row :gutter="20" class="clearfix">
			<el-col :xs="18" :sm="18" :md="18">
				<div class="grid-content bg-purple">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
						<el-menu-item index="1">
							<router-link :to="{name:'home'}">首頁</router-link>	
						</el-menu-item>
						<el-submenu index="2">
							<template slot="title">我的博客</template>
							<el-menu-item index="2-1">js</el-menu-item>
							<el-menu-item index="2-2">选项2</el-menu-item>
							<el-menu-item index="2-3">选项3</el-menu-item>
						</el-submenu>
						<el-menu-item index="3">
							<router-link to="/writeBlog">写博客</router-link>
						</el-menu-item>
					</el-menu>
				</div>
			</el-col>
			<el-col :xs="8" :sm="6" :md="6">
				<div class="grid-content bg-purple">
					<div v-show = '!name'>
						<el-button type="primary">
							<router-link to='/login' style='color: #fff;'>登录</router-link>
						</el-button>
						<el-button type="success">注册</el-button>
					</div>
					<div v-show = 'name'>
						<el-tag class='login_dre'>欢迎您！{{name}}</el-tag>
						<el-button type="success" @click='clearCookie'>退出</el-button>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'header',
		data() {
			return {
				activeIndex: '1',
				name:'小明',
			}
		},
		created: function () {
//      	this.checkCookie();
	    },
		mounted: function() {
			this.$nextTick(function() {
				this.init();
			});
		},
		methods: {
			init(){
				var router_path = this.$route.path;
				if(router_path=='/home'){
					this.activeIndex = '1';
				}else if(router_path=='/writeBlog'){
					this.activeIndex = '3';
				}
				//验证登录状态
				this.$http.get(this.$host + 'home',{params: {name: this.getCookie("username")}}).then(res=>{
					if(res.data.name){
						this.name = res.data.name;
						this.$notify({
				          title: '欢迎！',
				          message: '你好欢迎来到我的博客。',
				          type: 'success',
				          offset: 70,
				        });
					}else{
						this.$notify.error({
				          title: '错误',
				          message: res.data,
				          offset: 70,
				        });
					}
					
				}).catch(err=>{
					console.log(err)
				})
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
	        //获取cookie
	        getCookie: function (cname) {
	            var name = cname + "=";
	            var ca = document.cookie.split(';');
	            for (var i = 0; i < ca.length; i++) {
	                var c = ca[i];
	                while (c.charAt(0) == ' ') c = c.substring(1);
	                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	            }
	            return "";
	        },
	        //清除cookie
	        clearCookie: function () {
	            this.setCookie("username", "", -1);
				this.checkCookie()
	        },
	        checkCookie: function () {
	            var user = this.getCookie("username");
	            if (user == "") {
	            	this.$http.post('/loginOut').then(res=>{
	            		if(res.data.code == 200){
	            			this.$message(res.data.msg)
	            			this.$router.push('login')
	            		}
	            	})
	            }
	        }
		},
		
	}
</script>

<style>
	.login_dre{
	    padding: 4px 10px;
	    display: inline-block;
	    height: 40px;
	    line-height: 30px;
	}
</style>