import { resolveInstances } from '@/app/utils/injection'

const moduleRoutes = import.meta.glob('../../pages/**/*.route.ts', {
	eager: true,
	import: 'default',
})
const pages = import.meta.glob('../../pages/**/*.page.tsx', {
	eager: true,
	import: 'default',
})

const routesMap: any = {}

Object.keys(moduleRoutes).forEach(k => {
	const route = moduleRoutes[k] as any
	const path = k.match(/pages(\/.*)\//)![1]
	if (path === '/index') {
		routesMap[route.name] = { path: '/' }
	} else {
		routesMap[route.name] = { path }
	}
	Object.keys(pages).forEach(k2 => {
		const reg = new RegExp(`${path}\/(\\w+\.page\.tsx)`)
		if (k2.match(reg)?.[1]) {
			//@ts-ignore
			routesMap[route.name] = { ...routesMap[route.name], component: pages[k2] }
		}
	})
})

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
	routes2.sort((a, b) => a.index - b.index)
	routes2.forEach(v => {
		v.initRoute()
		Object.assign(v, routesMap[v.name])
	})
	return routes2
}

export function createRoutes() {
	const r = formatRoutes(moduleRoutes)
	return resolveRoutes(r)
}
