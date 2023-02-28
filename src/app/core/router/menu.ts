import { MenuOption } from 'naive-ui'
import { RouteRecordRaw } from 'vue-router'

export type RouteMenu = MenuOption & {
	key: string
	label: string
	routeName: string
	routePath: string
	icon?: () => import('vue').VNodeChild
	children?: RouteMenu[]
}

export function transformRoutesToMenu(routes: readonly RouteRecordRaw[]) {
	const Menu: RouteMenu[] = []
	routes.forEach(route => {
		if (route.meta?.hide) return
		const { name, path, meta } = route
		let routeChildren: RouteMenu[] = []
		if (route.children) {
			routeChildren = transformRoutesToMenu(route.children)
		}
		const MenuItem: RouteMenu = {
			key: name as string,
			label: meta!.title!,
			routeName: name as string,
			routePath: route.path,
		}
		if (routeChildren.length) MenuItem.children = routeChildren
		Menu.push(MenuItem)
	})
	return Menu
}
