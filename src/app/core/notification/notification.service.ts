import { speech } from '@/app/utils/common/speech'
import { WsSubscribe } from '@/app/utils/decorators/vue3-oop/websocket'
import { nNotification } from '@/app/utils/naive'
import { VueService } from 'vue3-oop'
import { EnumTopic } from '../websocket/enum'
import type { NotificationOption } from './type'

export default class NotificationService extends VueService {
	static Topic = EnumTopic.COMMON_BROADCAST

	@WsSubscribe(NotificationService.Topic)
	notify(data: NotificationOption) {
		if (data.withVoice) {
			const text = data.title + data.content
			speech(text)
		}
		return nNotification()?.create(data)
	}
}
