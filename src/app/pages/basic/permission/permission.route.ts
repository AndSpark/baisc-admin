import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'

@Injectable()
export default class PermissionRoute extends AbstractRoute {
	meta = {
		icon: 'icon-user',
		title: '权限管理',
	}
}
