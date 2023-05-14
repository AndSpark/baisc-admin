import AbstractRoute from '@/app/core/router/abstract-route'
import { RouterLayout } from '@/global'
import { RouteMeta } from 'vue-router'

export default class ProcessRoute extends AbstractRoute {
	title = '流程操作'
	svgIcon: RouteMeta['svgIcon'] = 'map'
	// hide: boolean | undefined = true
	// needToken: boolean = false
	// layout: RouterLayout | undefined = 'blank'
}
