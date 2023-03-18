import { RouterLayout } from '@/global'
import { RouteMeta, RouteRecordNormalized } from 'vue-router'

export default abstract class AbstractRoute implements Partial<RouteRecordNormalized> {
	name = Object.getPrototypeOf(this).constructor.name
	meta: RouteMeta = {}

	layout: RouteMeta['layout'] = 'basic'
	/* 菜单排序 */
	sort: number = 0
	title: RouteMeta['title']
	icon: RouteMeta['icon']
	svgIcon?: RouteMeta['svgIcon']
	hide: RouteMeta['hide']

	initRoute() {
		Object.assign(this.meta, {
			layout: this.layout,
			icon: this.icon || this.meta.icon,
			title: this.title || this.meta.title,
			hide: this.hide || this.meta.hide,
			sort: this.sort || this.meta.sort,
			svgIcon: this.svgIcon || this.meta.svgIcon,
		})
	}

	get hasPermission() {
		return true
	}
}
