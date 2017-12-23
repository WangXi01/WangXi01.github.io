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
					<div>
						<el-button type="primary">
							<router-link to='/login' style='color: #fff;'>登录</router-link>
						</el-button>
						<el-button type="success">注册</el-button>
					</div>
					<div>
						
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				activeIndex: '1',
			}
		},
		created: function () {
        	this.checkCookie();
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
	
	        },
	        checkCookie: function () {
	            var user = this.getCookie("username");
	            if (user != "") {
	                alert("Welcome again " + user);
	            } else {
	            	this.$router.push('login')
//	                user = prompt("Please enter your name:", "");
//	                if (user != "" && user != null) {
//	                    this.setCookie("username", user, 365);
//	                }
	            }
	        }
		},
		
	}
</script>