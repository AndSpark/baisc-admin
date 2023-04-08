import AbstractRoute from '@/app/core/router/abstract-route'
import { RouterLayout } from '@/global'

export default class AppRoute extends AbstractRoute {
	title = '应用中心'
	svgIcon: 'app' = 'app'
	sort = 1
}
