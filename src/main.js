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

Vue.config.productionTip = false
Vue.use(VueQuillEditor, /* { default global options } */ )
Vue.prototype.$http = axios
Vue.use(ElementUI)

var newVue = new Vue()

router.beforeEach((to, from, next) => {
	var toRouter = to.name;
	var fromRouter = from.name;
	console.log(toRouter,fromRouter)
   	newVue.$http.get('/home').then(res=>{
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