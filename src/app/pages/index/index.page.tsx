import AuthService from '@/app/core/authentication/auth.service'
import WebSocketService from '@/app/core/websocket'
import { NButton, NCard } from 'naive-ui'
import { Component, Hook, injectService, VueComponent } from 'vue3-oop'

@Component()
export default class IndexPage extends VueComponent {
	constructor(private websocketService: WebSocketService) {
		super()
	}
	authService = injectService(AuthService)!

	@Hook('BeforeMount')
	initWs() {
		this.websocketService.connect()
		this.websocketService.subscribe()
	}

	render() {
		return (
			<NCard>
				<div>{this.authService.user?.username}</div>
				<NButton onClick={() => this.authService.logout()}>退出</NButton>
			</NCard>
		)
	}
}
