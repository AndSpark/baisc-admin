import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'

@Injectable()
export default class UserRoute extends AbstractRoute {
	meta = {
		icon: 'icon-user',
		title: '用户管理',
	}
}
