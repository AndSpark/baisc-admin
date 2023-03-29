import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'

@Injectable()
export default class NotificationRoute extends AbstractRoute {
	meta = {
		icon: 'icon-user',
		title: '通知管理',
	}
}
