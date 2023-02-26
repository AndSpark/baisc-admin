import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'

@Injectable()
export default class UserRoute extends AbstractRoute {
	path = 'user'
	component = () => import('./user.page')

	meta = {
		icon: 'icon-user',
		title: '用户管理',
	}
}
