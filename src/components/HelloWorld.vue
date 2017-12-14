<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<form>
			<el-input v-model="name" placeholder="名称" style="width:200px"></el-input>
			<el-input v-model="price" placeholder="价格" style="width:200px"></el-input>
			<el-button type="primary" @click="addUser">提交1</el-button>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				name: '',
				price: '',
				el: ''
			}
		},
		methods: {
			addUser() {
				var name = this.name;
				var price = this.price;
				var date = new Date().toLocaleDateString();
				this.$http.post('/api/user/addUser', {
					name: name,
					price: price,
					date:date,
				}, {}).then((response) => {
					console.log(response);
				})
			},
			aaa() {
				this.el = "成功引入element";
			}
		}
	}
</script>