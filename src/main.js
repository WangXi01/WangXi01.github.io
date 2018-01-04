// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import '@/assets/header.css'
import '@/assets/media.css'
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

axios.defaults.baseURL = process.env.NODE_ENV === "production"?"http://39.108.168.151:3000/":""
Vue.config.productionTip = false
Vue.use(VueQuillEditor, /* { default global options } */ )
Vue.prototype.$http = axios
Vue.use(ElementUI)

//Vue.prototype.$host = 'http://39.108.168.151:3000/';  //挂载一个ip,线上用
Vue.prototype.$host = '/';

var newVue = new Vue()

router.beforeEach((to, from, next) => {
	var toRouter = to.name;
	var fromRouter = from.name;
	console.log(toRouter,fromRouter)
	var getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
   	newVue.$http.get(newVue.$host + 'home',{params: {name: getCookie("username")}}).then(res=>{
		if(res.data.name){
			if(toRouter=='login'&&fromRouter){
				next(fromRouter)
			}else{
				next()
			}
		}else{
			if(toRouter=='register'){
				next('register')
			}else{
				next('login')
			}
			
		}
	}).catch(err=>{
		console.log(err)
	})
	next()
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	// template: '<App/>',
	components: {
		App
	},
	render: h => h(App),
})