import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'

@Injectable()
export default class RoleRoute2 extends AbstractRoute {
	path = 'role2'
	component = () => import('./role2.page')

	meta = {
		icon: 'icon-user',
		title: '角色管理',
	}
}
