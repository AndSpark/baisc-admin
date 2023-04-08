import AbstractRoute from '@/app/core/router/abstract-route'
import { RouterLayout } from '@/global'

export default class NotFoundRoute extends AbstractRoute {
	title = '404'
	hide: boolean | undefined = true
	layout: RouterLayout | undefined = 'blank'
}
