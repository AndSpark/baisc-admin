import HoverContainer from '@/app/components/common/hoverContainer'
import SvgIcon from '@/app/components/common/svgIcon'
import { EnumTopic } from '@/app/core/websocket/enum'
import WebSocketService from '@/app/core/websocket/websocket.service'
import { NPopover, NTabPane, NTabs } from 'naive-ui'
import { Component, Hook, injectService, Mut, VueComponent } from 'vue3-oop'

@Component()
export default class Notification extends VueComponent {
	private websocketService = injectService(WebSocketService)!

	@Mut() messages: string[] = []
	@Mut() hasNew = false

	@Hook('BeforeMount')
	initWs() {
		this.websocketService.subscribe(EnumTopic.USER_LOCATION, val => {
			this.messages.push(val.data[0])
			this.hasNew = true
		})
	}

	render() {
		return (
			<NPopover
				trigger='click'
				placement='bottom'
				v-slots={{
					trigger: () => (
						<div class='h-full'>
							<HoverContainer tooltipContent='消息通知' contentClass='h-full w-10 relative'>
								<SvgIcon class={'w-5'} icon='notification'></SvgIcon>
							</HoverContainer>
						</div>
					),
					default: () => (
						<div class='h-lg overflow-auto'>
							<NTabs class='w-80' type='line' animated justifyContent='space-evenly'>
								<NTabPane name='1'>
									{{
										tab: () => <span class='w-40 text-center'>通知</span>,
										default: () => <div>{this.messages}</div>,
									}}
								</NTabPane>
								<NTabPane name={'2'}>
									{{
										tab: () => <span class='w-40 text-center'>消息</span>,
										default: () => <div>12344</div>,
									}}
								</NTabPane>
							</NTabs>
						</div>
					),
				}}
			></NPopover>
		)
	}
}
