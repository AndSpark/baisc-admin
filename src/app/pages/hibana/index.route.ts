import AbstractRoute from '@/app/core/router/abstract-route'
import { RouterLayout } from '@/global'
import { RouteMeta } from 'vue-router'

export default class QianKunRoute extends AbstractRoute {
	title = 'hibana'
	layout: RouterLayout | undefined = 'blank'
	needToken: boolean = false
	svgIcon: RouteMeta['svgIcon'] = 'map'
	sort = 2
}
