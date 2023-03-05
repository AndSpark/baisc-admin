import { RouterLayout } from '@/global'
import { RouteMeta, RouteRecordNormalized } from 'vue-router'

export default abstract class AbstractRoute implements Partial<RouteRecordNormalized> {
	name = Object.getPrototypeOf(this).constructor.name
	meta: RouteMeta = {}

	layout: RouterLayout = 'basic'
	index: number = 0
	title?: string
	icon?: string
	hide?: boolean

	initRoute() {
		Object.assign(this.meta, {
			layout: this.layout,
			icon: this.icon || this.meta.icon,
			title: this.title || this.meta.title,
			hide: this.hide || this.meta.hide,
			index: this.index || this.meta.index,
		})
	}

	get hasPermission() {
		return true
	}
}
