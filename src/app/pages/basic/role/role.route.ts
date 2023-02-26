import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'

@Injectable()
export default class RoleRoute extends AbstractRoute {
	path = 'role'
	component = () => import('./role.page')

	meta = {
		icon: 'icon-user',
		title: '角色管理',
	}
}
