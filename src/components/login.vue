<template>
	<div class="login_container">
		<div class="login_box">
			<!-- 头部区域 -->
			<div class="login_logo">
				<img src="../assets/logo.png" alt="">
			</div>
			<div class="loginForm">
			<!-- 登录表单区域 -->
				<el-form :model="LoginForm" :rules="LoginFormRules" ref="LoginFormRef">
					<el-form-item prop="username">
						<el-input placeholder="用户名" v-model="LoginForm.username" prefix-icon="iconfont icon-user"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input placeholder="密码" type="password" v-model="LoginForm.password" prefix-icon="iconfont icon-lock_fill"></el-input>
					</el-form-item>
			</el-form>
			<!-- 按钮 -->
			<div class="login_btn">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="reset">重置</el-button>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				LoginForm:{
					username:'admin',
					password:'123456'
				},
				LoginFormRules:{
					username: [
								{ required: true, message: '请输入用户名', trigger: 'blur' },
								{ min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
					  ],
					password: [
								{ required: true, message: '请输入密码', trigger: 'blur' },
								{ min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
				}
			}
		},
		methods:{
			login(){
				// console.log(this);
				this.$refs.LoginFormRef.validate(async (valid)=>{
					if(!valid) return;
					const {data:res}=await this.$http.post('login',this.LoginForm);	
					// console.log(res);
					if(res.meta.status!=200){
						return this.$message.error('登录失败')
					}
					this.$message.success('登陆成功');
					window.sessionStorage.setItem('token',res.data.token);
					this.$router.push('/home');
				});
			},
			reset(){
				this.$refs.LoginFormRef.resetFields();
			}
		}
	}
</script>

<style scoped lang="less">
.login_container {
	background-color: #2b4b6b;
	height: 100%;
	.login_box {
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 450px;
		height: 300px;
		background-color: #fff;
		border-radius: 10px;
		.login_logo{
			position: absolute;
			top:-50%;
			left: 50%;
			transform: translate(-50%,50%);			
			width: 130px;
			height: 130px;
			padding:10px;
			border-radius: 50%;
			box-shadow: 0 0 10px #ccc;
			background-color: #fff;
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
				box-shadow: 0 0 10px #eee;
			}
		}
		.loginForm{
			position: absolute;
			bottom: 20px;
			padding:0 10px;
			width: 100%;
			box-sizing: border-box;				
		}
		.login_btn{
			display: flex;
			justify-content:flex-end;
		}
	}
}
</style>
