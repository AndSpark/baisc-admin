import AbstractRoute from '@/app/core/router/abstract-route'
import { RouteMeta } from 'vue-router'

export default class MapRoute extends AbstractRoute {
	title = '任务中心'
	svgIcon: RouteMeta['svgIcon'] = 'map'
	sort = 2
}
