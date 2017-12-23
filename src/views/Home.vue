<template>
	<div id="home">
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
					<home-content></home-content>
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
	import HomeContent from '@/components/HomeContent'
	import HomeFooter from '@/components/HomeFooter'
	export default{
		name:'home',
		components:{
			HomeHeader,
			HomeAside,
			HomeContent,
			HomeFooter,  
		}
	}
</script>

