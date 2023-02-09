import AuthService from '@/app/core/authentication/auth.service'
import { NButton } from 'naive-ui'
import { injectService, VueComponent } from 'vue3-oop'

export default class IndexPage extends VueComponent {
	authService = injectService(AuthService)!

	render() {
		return (
			<div>
				<div>{this.authService.user?.username}</div>
				<NButton onClick={() => this.authService.logout()}>退出</NButton>
			</div>
		)
	}
}
