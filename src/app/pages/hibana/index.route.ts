import AbstractRoute from '@/app/core/router/abstract-route'
import { RouteMeta } from 'vue-router'

export default class QianKunRoute extends AbstractRoute {
	title = 'hibana'
	svgIcon: RouteMeta['svgIcon'] = 'map'
	sort = 2
}
