import { RouteRecord, RouteRecordNormalized } from 'vue-router'

export type RouterLayout = 'basic' | 'blank'

export default abstract class AbstractRoute implements Partial<RouteRecordNormalized> {
	name = Object.getPrototypeOf(this).constructor.name

	layout: RouterLayout = 'basic'

	meta = {}

	abstract path?: string | undefined
	component?: any

	initRoute() {
		Object.assign(this.meta, { layout: this.layout })
	}
}
