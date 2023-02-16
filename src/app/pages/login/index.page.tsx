import LoginService from '@/app/modules/auth/login/login.service'
import { NButton, NFormItem, NInput } from 'naive-ui'
import { Component, VueComponent } from 'vue3-oop'

@Component()
export default class IndexPage extends VueComponent {
	constructor(private loginService: LoginService) {
		super()
	}

	render() {
		return (
			<div>
				{this.loginService.NForm(
					<>
						<NFormItem label='用户名' path='username'>
							<NInput v-model:value={this.loginService.form.username}></NInput>
						</NFormItem>
						<NFormItem label='密码' path='password'>
							<NInput v-model:value={this.loginService.form.password}></NInput>
						</NFormItem>
						<NButton onClick={() => this.loginService.login()}>登陆</NButton>
					</>
				)}
			</div>
		)
	}
}
