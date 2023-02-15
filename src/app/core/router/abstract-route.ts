import { RouteRecord } from 'vue-router'

export default abstract class AbstractRoute implements Partial<RouteRecord> {
	name = Object.getPrototypeOf(this).constructor.name

	abstract path?: string | undefined
	abstract component?: any
}
