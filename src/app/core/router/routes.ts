import { resolveInstances } from '@/app/utils/injection'
import type { RouteRecordRaw } from 'vue-router'

let routes: RouteRecordRaw[] = []

const moduleRoutes = import.meta.glob('../../pages/**/*.route.ts', {
	eager: true,
	import: 'default',
})
Object.keys(moduleRoutes)
	.map(k => moduleRoutes[k as string] as RouteRecordRaw | RouteRecordRaw[])
	.filter(Boolean)
	.forEach(k => (routes = routes.concat(k)))

function formatRoutes(routes: Record<string, any>, originKey = 'pages') {
	const routes2: any = {}
	Object.keys(routes).forEach(k => {
		const reg = new RegExp(`${originKey}/(.*)`)
		let key = k.match(reg)![1]
		const basicKey = key.match(/^\w+/)![0]
		const val = { [k]: routes[k] }
		const isEnd = k.match(/\//g)?.length === 1
		if (originKey !== 'pages') {
			if (isEnd) {
				routes2._self = routes[k]
			} else {
				if (routes2[basicKey]) {
					routes2[basicKey][key] = Object.values(routes[k])[0] || routes[k]
				} else {
					routes2[basicKey] = { [key]: Object.values(routes[k])[0] || routes[k] }
				}
			}
		} else {
			if (routes2[basicKey]) {
				routes2[basicKey][key] = val
			} else {
				routes2[basicKey] = { [key]: routes[k] }
			}
		}
	})
	Object.keys(routes2).forEach(k => {
		if (k === '_self') return
		if (Object.keys(routes2[k]).length === 1) {
			routes2[k] = Object.values(routes2[k])[0]
		} else {
			routes2[k] = formatRoutes(routes2[k], k)
		}
	})
	return routes2
}
function resolveRoutes(routes: any) {
	const r: any[] = []
	const c: any[] = []
	Object.keys(routes).forEach((k, i) => {
		if (k === '_self') return
		if (routes[k]._self) {
			c.push([r.length, routes[k]])
			r.push(routes[k]._self)
		} else {
			r.push(routes[k])
		}
	})
	const routes2 = resolveInstances(r)
	c.forEach(v => {
		routes2[v[0]].children = resolveRoutes(v[1])
	})
	routes2.forEach(v => v.initRoute())
	return routes2
}

export function createRoutes() {
	const r = formatRoutes(moduleRoutes)
	return resolveRoutes(r)
}

export { routes }
