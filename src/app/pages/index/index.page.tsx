import AuthService from '@/app/core/authentication/auth.service'
import { NButton, NCard } from 'naive-ui'
import { Component, Hook, injectService, VueComponent } from 'vue3-oop'

@Component()
export default class IndexPage extends VueComponent {
	private authService = injectService(AuthService)!

	render() {
		return (
			<NCard>
				<div>{this.authService.user?.username}</div>
				<NButton onClick={() => this.authService.logout()}>退出</NButton>
			</NCard>
		)
	}
}
