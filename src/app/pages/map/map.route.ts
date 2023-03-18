import AbstractRoute from '@/app/core/router/abstract-route'
import { RouteMeta } from 'vue-router'

export default class MapRoute extends AbstractRoute {
	title = '高德地图'
	svgIcon: RouteMeta['svgIcon'] = 'map'
}
