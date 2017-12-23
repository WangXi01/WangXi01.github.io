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
					<el-form ref="form" :model="form" label-width="80px" v-show="success">
						<el-form-item label="博客名字">
							<el-input v-model="form.name"></el-input>
							<el-alert title="亲，博客名字不能为空" type="warning" show-icon v-show=''></el-alert>
						</el-form-item>
						<el-form-item label="标签">
							<el-tag :key="tag" v-for="tag in form.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
								{{tag}}
							</el-tag>
							<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
							</el-input>
							<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增标签</el-button>
							<!--<el-radio-group v-model="form.resource">
								<el-radio label="js"></el-radio>
								<el-radio label="css"></el-radio>
							</el-radio-group>-->
						</el-form-item>
						<el-form-item label="内容">
							<quill-editor v-model="form.desc" ref="myQuillEditor" class="" @ready="onEditorReady($event)">

							</quill-editor>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">保存博客</el-button>
						</el-form-item>
					</el-form>
					<div v-show="successMsg">
						<el-button type="primary" @click="showWrite">继续写博客</el-button>
						<el-button type="success">
							<router-link :to="{name:'home'}">返回首页</router-link>
						</el-button>
					</div>
					<p class="preview">预览</p>
					<div v-show="success">
						<p class="title">{{form.name}}</p>
						<div class="el-textarea">
							<div  class="ql-editor" data-gramm="false" readonly="readonly" v-html="form.desc"></div>
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
	import { quillEditor } from 'vue-quill-editor' //调用编辑器
	export default {
		name: 'writeBlog',
		data() {
			return {
				form: { //提交博客信息
					name: '',
					dynamicTags: ['js', 'css'], //博客标签
					desc: '',
					createTime: '',
				},
				success: true, //写博客成功
				successMsg: false, //博客提示消息
//				dynamicTags: ['js', 'css'], //博客标签
				inputVisible: false,
				inputValue: ''
			}
		},
		components: {
			HomeHeader,
			HomeAside,
			HomeFooter,
			quillEditor,
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill
			}
		},
		methods: {
			onSubmit() {
				this.form.createTime = new Date().toLocaleString();
				var tip = '';
				for(var i in this.form) {
					if(this.form[i] == '') {
						if(i == 'name') {
							tip = '博客名字';
						} else if(i == 'dynamicTags') {
							tip = '博客标签';
						} else if(i == 'desc') {
							tip = '博客内容';
						}
						this.$message(tip + '不能为空');
						return false;
					}
				}
				
				this.$http.post('/writeBlog', this.form).then(res => {
					if(res.status == '200') {
						this.$message('保存成功');
						this.success = false;
						this.successMsg = true;
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			showWrite() {
				this.success = true;
				this.successMsg = false;
			},
			onEditorReady(editor) {

			},
			handleClose(tag) {
				this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.inputValue;
				if(inputValue) {
					this.form.dynamicTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			}
		}
	}
</script>