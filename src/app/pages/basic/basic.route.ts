import AbstractRoute from '@/app/core/router/abstract-route'

export default class BasicRoute extends AbstractRoute {
	path = 'basic'

	meta = {
		title: '基础管理',
		icon: 'icon-user',
	}
}
