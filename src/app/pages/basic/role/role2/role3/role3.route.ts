import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'

@Injectable()
export default class RoleRoute3 extends AbstractRoute {
	path = 'role3'
	component = () => import('./role3.page')

	meta = {
		icon: 'icon-user',
		title: '角色管理',
	}
}
