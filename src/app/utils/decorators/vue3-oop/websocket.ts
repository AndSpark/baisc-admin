import { EnumTopic } from '@/app/core/websocket/enum'
import { TopicResponse } from '@/app/core/websocket/type'
import WebSocketService from '@/app/core/websocket/websocket.service'
import { onUnmounted } from 'vue'
import { createDecorator, getProtoMetadata, Hanlder, injectService } from 'vue3-oop'

export const WsSubscribe: WsSubscribeDecorator = createDecorator('WsSubscribe')
export interface WsSubscribeDecorator {
	(enumTopic: EnumTopic): PropertyDecorator
	MetadataKey: symbol | string
}
function handler(targetThis: Record<any, any>) {
	const list = getProtoMetadata<EnumTopic>(targetThis, WsSubscribe.MetadataKey)
	if (!list || !list.length) return
	const websocketService = injectService(WebSocketService)!
	for (const item of list) {
		const { options, key } = item

		const fn = (e: TopicResponse<EnumTopic>) => targetThis[key as string].call(targetThis, e)
		websocketService.subscribe(options, fn)

		onUnmounted(() => {
			websocketService.unsubscribe(options, fn)
		})
	}
}

export const WsSubscribeHandler: Hanlder = {
	key: 'WsSubscribe',
	handler,
}
