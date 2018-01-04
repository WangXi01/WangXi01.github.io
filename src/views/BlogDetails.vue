<template>
	<div id="writeBlog">
		<el-container>
			<el-aside style="width: auto">
				<el-main>
					<home-aside></home-aside>
				</el-main>
			</el-aside>
			<el-container>
				<el-header>
					<home-header></home-header>
				</el-header>
				<el-main>
					<div class="content">
						<el-alert title='您打开的页面不存在' type="warning" show-icon v-show='err'></el-alert>
						<div class="article" v-show='!err'>
							<div class="title">
								<div>{{name}}</div>
							</div>
							<div class="subTitle">时间：
								<span>{{create_time}}</span> 标签:
								<a href="#">{{tag}}</a>
							</div>
							<div class="textcontent" v-html="content">
								
							</div>
						</div>
					</div>
				</el-main>
				<el-footer>
					<home-footer></home-footer>
				</el-footer>
			</el-container>
		</el-container>
	</div>

</template>

<script>
	import HomeHeader from '@/components/HomeHeader'
	import HomeAside from '@/components/HomeAside'
	import HomeFooter from '@/components/HomeFooter'
	export default{
		name: 'blogdetails',
		data() {
	      	return { //博客信息
		        name: '',
	          	tag: '',
	          	content: '',
	          	create_time: '',
	          	err:false,
	      	}
    	},
		mounted: function() {
			this.$nextTick(function() {
				var id = this.$route.params.id;
				this.getBlog(id);
			});
		},
		methods:{
			getBlog(id){
				this.$http.get(this.$host + 'getBlog', {params: {id: id}}
				).then(res => {  
					if(res.data[0]==undefined){
						this.err = true;
						return false;
					}
                    this.name = res.data[0].name;
                    this.tag = res.data[0].tag;
                    this.content = res.data[0].content;
                    this.create_time = res.data[0].create_time;
               	}).catch(err=>{
               		this.$message.error('网络异常!');
               		this.err = true;
               	})
			}
		},
		components: {
			HomeHeader,
			HomeAside,
			HomeFooter,
		},
	}
	
</script>

