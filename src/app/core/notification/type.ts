import type { NotificationOptions } from 'naive-ui'

export interface NotificationOption extends NotificationOptions {
	title: string
	content: string
	withVoice?: boolean
}
