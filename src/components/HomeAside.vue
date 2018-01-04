<template>
	<div class='hidden-sm-and-down' style="min-width: 200px;">
		<img src="./../assets/logo.png" height="50" style="margin-top: -10px;">
		<div>{{name}}</div>
		<div>{{sign}}</div>
	</div>
</template>

<script>
	export default{
		name: 'asider',
		data(){
			return{
				name:'',
				sign:'',
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.init();
			});
		},
		methods: {
			init(){
				//验证登录状态
				this.$http.get(this.$host + 'home',{params: {name: this.getCookie("username")}}).then(res=>{
					this.name = res.data.name;
					this.sign = res.data.sign;
				}).catch(err=>{
					console.log(err)
				})
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
		}
	}
</script>

