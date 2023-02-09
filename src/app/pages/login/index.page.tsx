import AuthService from '@/app/core/authentication/auth.service'
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
import { Component, injectService, Mut, VueComponent } from 'vue3-oop'

@Component()
export default class IndexPage extends VueComponent {
	authService = injectService(AuthService)!

	@Mut() loginForm = {
		username: '',
		password: '',
	}

	render() {
		return (
			<div>
				<NForm>
					<NFormItem label='用户名'>
						<NInput v-model:value={this.loginForm.username}></NInput>
					</NFormItem>
					<NFormItem label='密码'>
						<NInput v-model:value={this.loginForm.password}></NInput>
					</NFormItem>
					<NButton onClick={() => this.authService.login(this.loginForm)}>登陆</NButton>
				</NForm>
			</div>
		)
	}
}
