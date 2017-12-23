<template>
	<div class="header">
		<el-row :gutter="20" class="clearfix">
			<el-col :span="16">
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
			<el-col :span="8">
				<div class="grid-content bg-purple">
					<el-button type="primary">登录</el-button>
					<el-button type="success">注册</el-button>
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
			
		}
	}
</script>