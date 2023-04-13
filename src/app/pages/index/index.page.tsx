import AuthService from '@/app/core/authentication/auth.service'
import { toUser } from '@/app/utils/transform/helper'
import { NButton, NCard } from 'naive-ui'
import { Component, injectService, VueComponent } from 'vue3-oop'

@Component()
export default class IndexPage extends VueComponent {
	private authService = injectService(AuthService)!

	render() {
		return (
			<NCard>
				<div>
					{this.authService.user?.username
						? toUser(this.authService.user?.username)
						: this.authService.user?.username}
				</div>
				<NButton onClick={() => this.authService.logout()}>退出</NButton>
			</NCard>
		)
	}
}
