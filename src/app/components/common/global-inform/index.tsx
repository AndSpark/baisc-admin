import { Mut, VueComponent } from 'vue3-oop'
import './index.css'
import { Injectable, SkipSelf } from 'injection-js'
import WebSocketService from '@/app/core/websocket/websocket.service'

@Injectable()
export default class GlobalInform extends VueComponent {
	constructor(@SkipSelf() private wsService: WebSocketService) {
		super()
		this.registerWs()
	}

	registerWs() {
		this.wsService.connectionState$.subscribe(val => {
			this.visible = true
			this.informText = val.message
			if (val.type === 'error') this.type = 'bg-error'
			if (val.type === 'success') {
				this.type = 'bg-primary'
				setTimeout(() => {
					this.visible = false
				}, 300)
			}
		})
	}

	@Mut() visible = false
	@Mut() informText = ''
	@Mut() type = ''

	render() {
		return (
			<div class='w-full h-full flex flex-col'>
				<div
					class={[
						'text-center    text-white transform duration-300',
						this.type,
						this.visible ? 'h-5' : 'h-0',
					]}
				>
					{this.informText}
				</div>
				<div class='w-full flex-1'>{this.$slots.default?.()}</div>
			</div>
		)
	}
}
