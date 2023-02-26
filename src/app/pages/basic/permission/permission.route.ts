import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'

@Injectable()
export default class PermissionRoute extends AbstractRoute {
	path = 'permission'
	component = () => import('./permission.page')

	meta = {
		icon: 'icon-user',
		title: '权限管理',
	}
}
