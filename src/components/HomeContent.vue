<template>
	<div class="content">
		<div class="article" v-for="(title,index) in title" :class="{limit:title.show}">
			<div class="title">
				<router-link :to="'/titles/'+title.id">{{title.name}}</router-link>
			</div>
			<div class="subTitle">
				<el-tag type="success">时间：{{title.create_time}}</el-tag> 
				<el-tag type="info">标签:{{title.tag}}</el-tag>
			</div>
			<div class="textcontent" v-html="title.content">

			</div>
			<div class="openLimit" v-show="title.show" @mouseenter="enter" @mouseleave="leave" @click="open(index)">
				<i class="el-icon-arrow-down hovering" v-show="!reversal"></i>
				<i class="el-icon-arrow-up" v-show="reversal"></i>
				<span v-show="reversal">显示代码</span>
			</div>
		</div>
		<div class="block text-right">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
			:current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="10" 
			layout="total, sizes, prev, pager, next, jumper" :total="title_len">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import { Loading } from 'element-ui';
	export default {
		data() {
			return {
				title: [],  //博客信息
				reversal: false,  //箭头变化
				currentPage: 1,  //分页
				title_len:1,  //博客总数
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.getTitleList();
			});
		},
		methods: {
			getTitleList() {
				this.$http.get('/title').then(res => {
					this.title = res.data;
					this.title_len = this.title.length;
					this.title.forEach(function(index) {
						var strLen = index.content.length;
//						console.log(strLen)
						if(strLen > 500) {
							index.show = true;
							index.loading = false;
						}
					})
				})
			},
			handleSizeChange(val) {
//				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
//				console.log(`当前页: ${val}`);
			},
			enter(){
				this.reversal = true;
			},
			leave(){
				this.reversal = false;
			},
			open(index){
				var article = document.querySelectorAll(".article")[index]
				let loadingInstance = Loading.service({target:article});
				setTimeout(()=>{
					loadingInstance.close();
				},600)
				this.title[index].show = false;
			},

		}
	}
</script>

