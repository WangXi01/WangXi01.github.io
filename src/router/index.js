import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import WriteBlog from '@/views/WriteBlog'
import BlogDetails from '@/views/BlogDetails'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			name: 'home',
			component: Home
		},
		{
			path: '/writeBlog',
			name: 'writeBlog',
			component: WriteBlog
		},
		{
			path:'/titles/:id',
			name: 'BlogDetails',
			component: BlogDetails
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
	]
})